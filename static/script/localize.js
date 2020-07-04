// Handles language localization

var language = "";

$(document).ready(function() {
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

    // Handles language selection
    $("#lang-select").submit(function(event) {
        event.preventDefault();
        let lang = $("select")[0].options[$("select")[0].selectedIndex].value;
        select_language(lang);
    });
});

// Function definitions
// Displays elements matching the selected language
function localize(language) {
    // Adapted from https://stackoverflow.com/a/16497937
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
            $(this).attr({"selected": true, "aria-selected": true});

        }
        else {
            $(this).attr({"selected": false, "aria-selected": false});
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
    });

    // Localize form placeholders
    if (window.location.pathname === "/contact") {
        const placeholder_en = {
            "name": "Your name",
            "email": "email@example.com",
            "emailConfirm": "email@example.com",
            "message": "Let us know your inquiry..."
        };
        const placeholder_de = {
            "name": "Ihr Name",
            "email": "email@beispiel.de",
            "emailConfirm": "email@beispiel.de",
            "message": "Ihre Anfrage hier..."
        }

        $("input, textarea").each(function() {
            if (language === "de") {
                for (const [key, value] of Object.entries(placeholder_de)){
                    if ($(this).attr("id") == key) {
                        $(this).attr("placeholder", value);
                    }
                }
            }
            else {
                for (const [key, value] of Object.entries(placeholder_en)){
                    if ($(this).attr("id") == key) {
                        $(this).attr("placeholder", value);
                    }
                }
            }
        });
    }
}

// Remembers selected language and runs localize function - executed on user select
function select_language(lang) {
    // Store selected language in a local storage item
    localStorage.setItem("language", lang);
    // Update global variable for use in other scripts
    language = lang;
    // Run localize to display correct content
    localize(lang);
}
