var img = document.querySelector("picture");

// Media queries to determine whether the viewport is smaller or larger than default
var small = window.matchMedia("(max-width: 991.98px)");
var large = window.matchMedia("(min-width: 1920px");

// Sets image source to the image appropriate for the viewport size
function imgSelect(small, large) {
    if (small.matches) {
        img.src = "images/sunset-174276_1280.jpg";
    }
    else if (large.matches) {
        img.src = "images/sunset-174276_6000x2550.jpg";
    }
    else {
        img.src = "images/sunset-174276_1920x720.jpg";
    }
}

// Fades in an element by animating opacity from 0 to 1
function fadein() {
    $(".fadein").css("opacity", "0");
    $(".fadein").animate({opacity: 1}, 1400);
}

// Sets correct image source on runtime
imgSelect(small, large);

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
    // Resets correct image source
    imgSelect(small, large);

    if (img.complete) {
        fadein();
    }
    else {
        img.addEventListener("load", fadein());
    }
});