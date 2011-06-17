/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery,
    BQL = require('./bql').BQL;

$(document).ready(function() {
    var onJql = $("#jqlform");
    if (onJql.length) {
        $(".item-summary").remove();
        var container = $("<div id='container' class='beerbg' style='position:relative;top:-110px;z-index:9998'></div>").css({
                background: "url('http://seancurtis.com/beerbg.png')",
                width: 945,
                height: 691
            }),
            beerButton = $('<button class="beerbutton" style="position: absolute; height: 50px; top: -81px; left: 438px; width: 59px; border: 0pt none; cursor: pointer; opacity: 0; z-index: 9999;" title="Pull Beer!"> Pull Beer! </button>'),
            canvas = $("<div id='canvas' style='position:absolute;top:90px'></div>)");
            
        container.append(canvas);
        container.insertAfter(onJql);
        onJql.hide();
        
        beerButton.click(function() {
            $("#jqltext").val(getJQLSource());
            var throb = $('<img src="'+contextPath+'/images/throbber/wait.gif" width="16" height="16"/>').appendTo("body").offset({top: 115, left: 462});
            $.post("IssueNavigator!executeAdvanced.jspa", $("#jqlform").serialize(), function(resp, status) {
                if (status == "success") {
                    $(".results-wrap").replaceWith($(resp).find(".results-wrap"));
                } else {
                    console.log("FAIL!!: " + resp);
                }
            });
        }).insertAfter(onJql);
        
        $(onJql).dblclick(function() {
            $(onJql).css("display", "none")
        });
        if (!$("#iss-wrap").hasClass("lhc-collapsed")) {
            // close the left panel
            $(".toggle-lhc").click();
        }
        var getJQLSource = BQL();
    }
});
