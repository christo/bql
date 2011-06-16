/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery;
var img = require('speakeasy/resources').getImageUrl(module, 'projectavatar.png');

$(document).ready(function() {
    alert("removing jqlform");
    $('#jqlform').css("display", "none");
    var leftHandColumn = $("#iss-wrap");
    if (leftHandColumn.hasClass("expanded")){
        $(".toggle-lhc").click();
    }
    console.log("removed jql form");
});
