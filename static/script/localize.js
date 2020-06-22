var language = "";

// Get language from localStorage and store it in 'language'
if((language = localStorage.getItem("language")) === null) {
    // If language hasn't been stored yet, check browser language
    // If browser langage is German, set 'language' to 'de'
    if (window.navigator.language === "de") {
        language = "de";
    }
    // Else set 'language' to 'en'
    else {
        language = "en";
    }
}

// Display the appropriate elements
localize(language);

// Displays elements matching the selected language
function localize(language) {
    // Loop through all elements with the 'lang' attributes, except 'html'
    $("[lang]:not(html)").each(function() {
        // Show  elements with a matching 'lang' attribute
        if ($(this).attr("lang") === language) {
            $(this).show();
        }
        // Hide elements without a matching 'lang' attribute
        else {
            $(this).hide();
        }
    });
    // Toggle the 'selected' property for the selected language
    $("option").each(function() {
        if ($(this).attr("value") === language) {
            $(this).prop("selected", true);
        }
        else {
            $(this).prop("selected", false);
        }
    });
    // Set appropriate title (this cannot be set through display value)
    $("title").text(function() {
        if (language === "en"){
            return "FullyBeing Rosen Method";
        }
        else {
            return "FullyBeing Rosen Methode";
        }
    })
}

// Remembers selected language and runs localize function
function select_language(language) {
    localStorage.setItem("language", language);
    localize(language);
}
