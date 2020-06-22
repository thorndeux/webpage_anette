// Manages client side form validation, data submission, and processes
// the server response.

$(document).ready(function(){
    // Make sure data is only submitted to the server if input is valid
    $("form").submit(function(event) {
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
    $("form").submit(function(event) {
        event.preventDefault(); // Prevent form submission, as we are going to submit via AJAX
        event.stopPropagation();
        // Submit ajax post request with form data
        let posting = $.post("/contact", $(this).serialize());
        // Handle successful response
        let feedback = "";
        let category = "";
        posting.done(function (data){
            if ( !$.trim( data.feedback )) {
                feedback = "An empty response was returned.";
                category = "danger";
            }
            else {
                feedback = data.feedback;
                category = "success";
            }
        });
        // Handle lack of server response
        posting.fail(function(xhr) {
            console.log("error. see details below.");
            console.log(xhr.status + ": " + xhr.responseText);
            feedback = "Something went wrong. Your message could not be sent. \
                        Please try sending an email to fullybeing.rosenmethod@gmail.com.";
            category = "danger";
        });
        // Construct toast
        posting.always(function() {
            $(".toast").removeClass("border-success border-danger"); // Make sure no border classes are set

            if (category == "success") {
                $(".toast").addClass("border-success");
                $(".toast-header strong").text("Success!");
            }
            else {
                $(".toast").addClass("border-danger");
                $(".toast-header strong").text("Warning!");
            }

            $(".toast-body").text(feedback);
            $(".toast").toast("show");
        });
        // Remove validation info and reset the form
        $(this).toggleClass("was-validated", false).trigger("reset");
    });
});
