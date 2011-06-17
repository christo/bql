function BQL() {
    var toolBarDefault = {stroke: "#000", "stroke-width": 2, fill: "#fff" };
    var itemDefaults = {fill: 'grey', opacity: 0.8, stroke: 'black', "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"};
    var itemHoverDefaults = {fill: "blue", opacity: 1.0};
    var itemSelectedDefaults = {fill: "blue", opacity: 1.0, "stroke-width": 3};
    var textDefaults = {fill: "#000", font: '15 Arial'};
    var textDelta = {x: 50, y: 15};
    var items = ["Project", "Issue Type", "Reporter", "Assignee", "Summary", "Description", "Status"];
    var links = [];
    var selected;

    var create = function(x, y, s, selectable, copyAfterDrag) {
        var text = graph.text(x + textDelta.x, y + textDelta.y, s);
        text.attr(textDefaults);
        var item = graph.rect(x, y, 150, 30);
        item.attr(itemDefaults);
        item.text = text; // allow to retrieve the internal text element

        item.hover(function() {
            item.attr(itemHoverDefaults);
        }).mouseout(function() {
            if (item != selected) {
                item.attr(itemDefaults);
            }
        });
        if (selectable) {
            item.click(function() {
                if (selected == null) {
                    selected = item;
                    item.attr(itemSelectedDefaults);
                } else if (selected == item) { // if selected = self, unselect
                    selected = null;
                    item.attr(itemHoverDefaults);
                } else {
                    selected.attr(itemDefaults);
                    createLink(selected, item);
                    selected = null;
                    //item.attr(itemSelectedDefaults);
                }
            });
        }

        enableDrag(item, copyAfterDrag);
        return item;
    };
    var move = function(x, y, item) {
        item.attr({'x' : x, 'y' : y});
        item.text.attr({'x' : x + textDelta.x, 'y' : y + textDelta.y});

    };
    var gettext = function(item) {
        return item.text.attr('text');
    };
    var settext = function(item, text) {
        item.text.attr({'text' : text});
    };
    var formatTerminal = function(item) {
        return settext(item, item.terminal.field + ' ' + item.terminal.operator + ' ' + item.terminal.value);
    };
    var createAlterable = function(x, y, s) {
        var item = create(x, y, s, true, false);
        item.terminal = {field: s, operator: '=', value: '?'};
        formatTerminal(item);
        item.dblclick(function() {
            changeTerminal(this);
        })
    };
    var changeTerminal = function(item) {
        item.terminal.value = prompt('Enter new value for ' + item.terminal.field);
        formatTerminal(item);
    };
    var enableDrag = function(item, copyAfterDrag) {
        var dragPos = {};
        var start = function () {
            item.x = item.attr("x");
            item.y = item.attr("y");
        };
        var drag = function (dx, dy) {
            dragPos.x = item.x + dx;
            dragPos.y = item.y + dy;
            move(dragPos.x, dragPos.y, item);
            updateLinks(item);
        };
        var up = function () {
            if (copyAfterDrag) {
                // restore original element to its initial pos
                move(item.x, item.y, item);
                // create a new item at the target pos
                item.attr({opacity: .5, x : item.x, y : item.y});
                createAlterable(dragPos.x, dragPos.y, gettext(item));
            }
            updateLinks(item);
        };
        item.drag(drag, start, up);
    };
    var createLink = function (item1, item2) {
        if (linkExists(item1, item2)) return;
        var centerItem1 = item1.attr('x') + item1.attr('width') / 2;
        var centerItem2 = item2.attr('x') + item2.attr('width') / 2;

        var link;
        if (item1.attr('y') < item2.attr('y')) {
            link = graph.path('M ' + centerItem1 + ' ' + (item1.attr('y') + item1.attr('height')) + 'L' + centerItem2 + ' ' + item2.attr('y'));
        } else {
            link = graph.path('M ' + centerItem1 + ' ' + item1.attr('y') + 'L' + centerItem2 + ' ' + (item2.attr('y') + item2.attr('height')));
        }
        link.inc = item1;
        link.out = item2;
        links.push(link);


        link.click(function() {
            this.attr (toolBarDefault); // TODO: remvoe
        });

    };
    var hideLinks = function(item) {
        var kept = [];
        var hidden = [];
        for(var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.inc == item || link.out == item) {
                link.hide();
                hidden.push(link);
            } else {
                kept.push(link);
            }
        }
        links = kept;
        return hidden;

    };
    var updateLinks = function (item) {
        // recreate links (since the underlying path can not be modified)
        var l = hideLinks(item);
        for (var i = 0; i < l.length; i++) {
            createLink(l[i].inc, l[i].out);
            l[i].remove();
        }
    };
    var linkExists = function(item1, item2) {
        for(var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.inc == item1 && link.out == item2) {
                return true;
            } else if (link.inc == item2 && link.out == item1) { // disallow reversed links
                return true;
            }
        }
        return false;

    };
    var toolBarItem = function(n, text) {
        var item = create(10, 50 * n + 10, text, false, true);
    };

    var graph = Raphael('graph', '1500px', '500px');
    var toolbar = graph.rect(0, 0, 175, 350, 5);
    toolbar.attr(toolBarDefault);

    for(var i = 0; i < items.length; i++) {
        toolBarItem(i, items[i]);
    }
}

exports.BQL = BQL;