/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery;

$(document).ready(function() {
    var onJql = window.location.href.indexOf("/secure/IssueNavigator!executeAdvanced.jspa") >= 0;
    if (onJql) {
        var bql = $("<h3>BeerQL Goes here!!</h3><p>mmmmm... beer</p>").click(function() {
            $('#jqltext').val('assignee = scurtis or priority > major');
        });
        var submitButton = $("<button>Submit</button>").click(function() {
            $('#jqlform').submit();
        });
        $('#jqlform').css("display", "none").after(submitButton).after(bql);
        if (!$("#iss-wrap").hasClass("lhc-collapsed")) {
            // close the left panel
            $(".toggle-lhc").click();
        }

    }
});
