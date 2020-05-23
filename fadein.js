var img = document.querySelector("picture");

// Fades in an element by animating opacity from 0 to 1
function fadein() {
    $(".fadein").css("opacity", "0");
    $(".fadein").animate({opacity: 1}, 1400);
}

// Runs when the document is ready
$(document).ready(function(){
    // If the image is fully loaded, run fadein function
    if (img.complete) {
        fadein();
    }
    // Else, listen for the 'load' event and run fadein function then
    else {
        img.addEventListener("load", fadein());
    }
});

// Runs when the window is resized (e.g. orientation change on a mobile device)
$(window).resize(function(){
    if (img.complete) {
        fadein();
    }
    else {
        img.addEventListener("load", fadein());
    }
});