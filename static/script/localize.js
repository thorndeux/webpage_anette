// Handles language localization

var language = "";

$(document).ready(function() {
    // Localize page on load
    initialize()

    // Handles language selection
    $("#langSelect").submit(function(event) {
        // Prevent form submission
        event.preventDefault();
        // Get selected value and pass it to 'select_language()'
        select_language($("select")[0].options[$("select")[0].selectedIndex].value);
    });
});

// Function definitions
// Get preferred language and localize page accordingly
function initialize() {
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
}


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
    
    // Array of routes, English title start, German title start, German description, English description
    const titles = [["/",
                     "Home", "Home",
                     "Ich biete Behandlungen in der ganzheitlichen Körpertherapie nach Marion Rosen an. Durch sanfte, achtsame Berührung kann es zu einer tiefen Entspannung kommen. Gefühle, die im Körpergedächtnis gespeichert waren, können sich lösen und es kann sich neue Vitalität, Lebendigkeit und Zuversicht einstellen.",
                     "Rosen-Method bodywork is a holistic type of bodywork that is simple yet powerful. With gentle, non-intrusive touch and attuned presence I help my clients to release chronic tension, contact deep relaxation, and find new vitality and ease."],
                    ["/rosen",
                     "Rosen-Method", "Rosen-Methode",
                     "Den Körper berühren, die Seele erreichen. Die Rosen-Methode ist eine ganzheitliche Körpertherapie. Durch achtsame, sanfte Berührung kann es zu einer tiefen Entspannung, Vitalität und mehr Akzeptanz und Selbst-Liebe kommen.",
                     "Touching the body, reaching the soul. Rosen-Method is a unique form of bodywork that is simple yet powerful. Through gentle and non-intrusive touch clients can release chronic tension, contact deep relaxation, and find new vitality."],
                    ["/session",
                     "Session", "Behandlung",
                     "Ich biete einstündige Behandlungen in der Körperarbeit nach Marion Rosen an. Durch sanfte Berührung chronisch angespannter Muskeln kann es zu einem freieren Atem und einer tiefen Entspannung kommen. Emotionen dürfen gefühlt und ins Jetzt integriert werden.",
                     "I offer hour-long Rosen-Method bodywork sessions. Gentle, non-manipulative touch can lead to the release of chronic tension and to emotional healing. Hidden potential is awakened, allowing for more aliveness, vitality, and possibilities."],
                    ["/about",
                     "About Me: Anette Koegler", "Über Mich: Anette Kögler",
                     "Die Arbeit mit der Rosen-Methode macht mir viel Freude. Sie passt mit ihrer sanften und respektvollen Berührung wunderbar zu meiner Arbeit als Entspannungstherapeutin und Mindfulness Coach.",
                     "I enjoy helping my clients with Rosen-Method bodywork sessions. With its gentle and mindful touch it complements my work as a Relaxation Teacher and Mindfulness Coach."],
                    ["/contact",
                     "Contact", "Kontakt",
                     "Buchen Sie Ihre erste Behandlung: Ich freue mich darauf, Sie mit Mitgefühl und Achtsamkeit auf Ihrer Reise zu sich selbst zu begleiten!",
                     "Booking your first session is easy: I am looking forward to supporting you with compassion and mindfulness on your journey home to yourself!"],
                    ["/credits",
                     "Credits", "Credits",
                     "Bildnachweis und Informationen zu Webdesign und Programmierung.",
                     "Image, web design, and programming credits."],
                    ["/impressum",
                     "Impressum", "Impressum",
                     "Rechtliche Informationen zu Verantwortlichen.",
                     ""],
                    ["/privacy",
                     "Privacy", "Datenschutz",
                     "Informationen zu Datenschutz und Cookies.",
                     "Our privacy and cookie policies."]]
    
    // Set appropriate title (this cannot be set through display value)
    $("title").text(function() {
        const route = window.location.pathname
        for (const element of titles) {
            if (element[0] === route) {
                if (language === "en"){
                    return element[1] + " | FullyBeing Rosen-Method Bodywork";
                }
                else {
                    return element[2] + " | FullyBeing Rosen-Methode Körperarbeit";
                }
            }
        }
        return "FullyBeing Rosen-Method Bodywork"
    });

    // Set appropriate description (this cannot be set through display value)
    $("meta[name='description']").attr("content", function() {
        const route = window.location.pathname
        for (const element of titles) {
            if (element[0] === route) {
                if (language === "en"){
                    return element[4];
                }
                else {
                    return element[3];
                }
            }
        }
        return ""
    });

    // Localize form placeholders
    if (window.location.pathname === "/contact") {
        const placeholder_en = {
            "name": "Your name",
            "email": "email@example.com",
            "emailConfirm": "email@example.com",
            "message": "Let us know your inquiry...",
            "captcha_result": "Result..."
        };
        const placeholder_de = {
            "name": "Ihr Name",
            "email": "email@beispiel.de",
            "emailConfirm": "email@beispiel.de",
            "message": "Ihre Anfrage hier...",
            "captcha_result": "Ergebnis..."
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
