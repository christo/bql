/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery;
document.write("<script language='text/javascript' src='http://github.com/DmitryBaranovskiy/raphael/raw/master/raphael-min.js'></script>");
$(document).ready(function() {
    var onJql = window.location.href.indexOf("/secure/IssueNavigator!executeAdvanced.jspa") >= 0;
    if (onJql) {
        $('<img class="beerbg" src="http://seancurtis.com/beerbg.png" style="margin-top: -100px; position: relative; z-index: 9998;">').insertAfter('#jqlform');

        $('<buttonclass="beerbutton" style="position: absolute; height: 82px; top: -41px; left: 422px; width: 90px; border: 0pt none; cursor: pointer; opacity: 0; z-index: 9999;" title="Pull Beer!"> Pull Beer! </button>').click(function() {
            $.post("IssueNavigator!executeAdvanced.jspa", $("#jqlform").serialize(), function(resp, status) {
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

    }
});
