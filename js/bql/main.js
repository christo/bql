/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery;
var img = require('speakeasy/resources').getImageUrl(module, 'projectavatar.png');

$(document).ready(function() {
    $('#jqlform').css("display", "none");
    var leftHandColumn = $("#iss-wrap");
    if (!leftHandColumn.hasClass("lhc-collapsed")){
        $(".toggle-lhc").click();
    }
    console.log("removed jql form");
});
