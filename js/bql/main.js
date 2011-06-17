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
        $('<img class="beerbg" src="http://seancurtis.com/beerbg.png" style="margin-top: -100px; position: relative; z-index: 9998;">').insertAfter('#jqlform');

        $('<button class="beerbutton" style="position: absolute; height: 82px; top: -41px; left: 422px; width: 90px; border: 0pt none; cursor: pointer; opacity: 0; z-index: 9999;" title="Pull Beer!"> Pull Beer! </button>').click(function() {
            $("#jqltext").val(getJQLSource());
            var throb = $('<img src="'+contextPath+'/images/throbber/wait.gif" width="16" height="16"/>').appendTo("body").offset({top: 115, left: 482});
            $.post("IssueNavigator!executeAdvanced.jspa", $("#jqlform").serialize(), function(resp, status) {
                throb.remove();
                if (status == "success") {
                    $(".results-wrap").replaceWith($(resp).find(".results-wrap"));
                } else {
                    console.log("FAIL!!: " + resp);
                }
            });
        }).insertAfter('#jqlform');
        
        $('#jqlform').dblclick(function() {
            $('#jqlform').css("display", "none")
        });
        if (!$("#iss-wrap").hasClass("lhc-collapsed")) {
            // close the left panel
            $(".toggle-lhc").click();
        }
        var getJQLSource = BQL();
    }
});
