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
    console.log("removed jql form");
});
