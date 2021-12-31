// Manages client side form validation, data submission, and processes
// the server response.

$(document).ready(function(){
    // Set form to novalidate to prevent HTML5 validation
    $("#contact-form").attr("novalidate", true);

    // Make sure data is only submitted to the server if input is valid
    $("#contact-form").submit(function(event) {
        // Make sure hCaptcha is completed
        if ($('[name=h-captcha-response]').val() === "") {
            event.preventDefault(); // Prevent form submission
            event.stopPropagation();
            event.stopImmediatePropagation(); // Stop other handlers from activating
            
            // Add validation info
            document.getElementById('captcha-dummy').setCustomValidity("Not valid!")
        }
        else {
            document.getElementById('captcha-dummy').setCustomValidity("")
        }

        // HTML5 validity check
        if ($(this)[0].checkValidity() === false) { // If any field is invalid
            event.preventDefault(); // Prevent form submission
            event.stopPropagation();
            event.stopImmediatePropagation(); // Stop other handlers from activating
    
            // Add validation info
            $(this).toggleClass("was-validated", true);
        }
        // Check whether email addresses match
        if ($("#email").val() != $("#emailConfirm").val()) { // If addresses don't match
            event.preventDefault(); // Prevent form submission
            event.stopPropagation();
            event.stopImmediatePropagation(); // Stop other handlers from activating
            $("#emailConfirm").val(""); // reset email confirmation field
    
            // Add validation info
            $(this).toggleClass("was-validated", true);
        }
    });
    
    // Submit data and process response
    $("#contact-form").submit(function(event) {
        event.preventDefault(); // Prevent form submission, as we are going to submit via AJAX
        event.stopPropagation();
        // Submit ajax post request with form data
        let posting = $.post("/contact", $(this).serialize());
        // Handle successful response
        let feedback = ["", ""];
        let category = "";
        posting.done(function (data){
            if ( !$.trim( data.feedback )) {
                feedback = ["An empty response was returned.", "Leere Serverantwort."];
                category = "danger";
            }
            else {
                feedback = data.feedback;
                category = data.category;
            }
        });
        // Handle lack of server response
        posting.fail(function(xhr) {
            console.log("error. see details below.");
            console.log(xhr.status + ": " + xhr.responseText);
            feedback = ["Something went wrong. Your message could not be sent. \
                        Please try sending an email to info@fullybeing-bodywork.com.",
                        "Ihre Nachricht konnte nicht gesendet werden. Bitte senden \
                        Sie eine Email an info@fullybeing-bodywork.com."];
            category = "danger";
        });
        // Construct toast
        posting.always(function() {
            $(".toast").removeClass("border-success border-danger"); // Make sure no border classes are set
    
            let toastheader =["", ""];
            if (category == "success") {
                $(".toast").addClass("border-success");
                toastheader = ["Success!", "Senden erfolgreich!"];
            }
            else {
                $(".toast").addClass("border-danger");
                toastheader = ["Warning!", "Achtung!"];
            }
    
            if (language === "de") {
                $(".toast-body").text(feedback[1]);
                $(".toast-header strong").text(toastheader[1]);
            }
            else {
                $(".toast-body").text(feedback[0]);
                $(".toast-header strong").text(toastheader[0]);
            }
            $(".toast").toast("show");
        });
        // Remove validation info and reset the form
        $(this).toggleClass("was-validated", false).trigger("reset");
        // Reset the captcha
        hcaptcha.reset(localStorage.getItem("captcha_id"));
    });
});
