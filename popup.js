// This callback function is called when the content script has been
// injected and returned its results
var rawLink;
function onPageDetailsReceived(pageDetails)  {
	var str = pageDetails.url;
	var res = str.replace("github.com", "raw.githubusercontent.com");
	res = res.replace("blob/", "");
	pageDetails.url = res;
	rawLink = res;
	document.getElementById('url').value = pageDetails.url;
}
// Global reference to the status display SPAN
var statusDisplay = null;

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    statusDisplay = document.getElementById('status-display');
    var linkJS = document.getElementById('linkJS');
	linkJS.addEventListener('click', function() {
		var whiteSpaceCheck = ($("#whiteSpace").is(':checked')) ? "wt" : "wn";
		var multipleVarCheck = ($("#multipleVar").is(':checked')) ? "mt" : "mn";
		var bitwiseOperators  = ($("#bitWiseOperators").is(':checked')) ? "bt" : "bn";
		var maxLineLength = $("#maxLineLength").val();
		var maxWarnings = $("#maxWarnings").val();
        var windowVal = "http://samprity.github.io/JSLint1/?Key="+rawLink+","+multipleVarCheck+","+bitWiseOperators+","+whiteSpaceCheck+","+maxLineLength+","+maxWarnings;
		var win = window.open(windowVal, '_blank');
	    win.focus();
}, false);

    chrome.runtime.getBackgroundPage(function(eventPage) {
        eventPage.getPageDetails(onPageDetailsReceived);
    });
	$("#rawLink").click(function(){
    $.ajax({url: rawLink, success: function(result){
        $("#div1").html(result);
    }});
});
});
