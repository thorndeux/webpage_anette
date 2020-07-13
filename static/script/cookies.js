// Handles cookie notice

// Runs when cookie notice is accepted
$("#acceptCookies").submit(function(event) {
    // Prevent form submission
    event.preventDefault();
    // Remember that cookies have been accepted
    localStorage.setItem("cookies", "ok");
    // Dismiss cookie cookie
    $("#cookieNotice").alert("close");
});

// Runs on page load
// Hide
$("#cookieNotice").hide();
if (localStorage.getItem("cookies") != "ok") {
    setTimeout(function() {$("#cookieNotice").show(400);}, 1000);
}
