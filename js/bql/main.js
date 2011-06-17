/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery,
    BQL = require('./bql').bql;

$(document).ready(function() {
    BQL();
    var onJql = window.location.href.indexOf("/secure/IssueNavigator!executeAdvanced.jspa") >= 0;
    if (onJql) {
        var bql = $("<h3>BeerQL Goes here!!</h3><p>mmmmm... beer</p>").click(function() {
            $('#jqltext').val('assignee = scurtis or priority > major');
        });
        var submitButton = $("<button> Pull Beer! </button>").click(function() {
            // TODO try load method
            $.post("IssueNavigator!executeAdvanced.jspa", $("#jqlform").serialize(), function(resp, status) {
                if (status == "success") {
                    alert(resp.find(".resultsWrap"));
                    $(".resultsWrap").replaceWith($(resp).find(".resultsWrap"));
                } else {
                    console.log("FAIL!!: " + resp);
                }
            });
        });
        $('#jqlform').after(submitButton).after(bql);
        $('#jqlform').dblclick(function() {
            $('#jqlform').css("display", "none")
        });
        if (!$("#iss-wrap").hasClass("lhc-collapsed")) {
            // close the left panel
            $(".toggle-lhc").click();
        }

    }
});
