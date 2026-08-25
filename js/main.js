function calculateEstimate(){

    const serviceElement =
        document.getElementById("serviceType");

    const hoursElement =
        document.getElementById("hours");

    const resultElement =
        document.getElementById("result");

    if(
        !serviceElement ||
        !hoursElement ||
        !resultElement
    ){
        return;
    }

    const service = serviceElement.value;
    const hours =
        Math.max(0, parseFloat(hoursElement.value) || 0);

    let rate = 0;

    switch(service){

        case "household-basic":
            rate = 24;
            break;

        case "household-premium":
            rate = 29.5;
            break;

        case "office":
            rate = 30;
            break;

        case "hospitality":
            rate = 32;
            break;

        case "industrial":
            rate = 42;
            break;

        default:
            rate = 0;

    }

    const total = rate * hours;

    resultElement.innerText =
        "€" +
        total.toFixed(2) +
        " / month";
}

document.querySelectorAll(".contact-form").forEach((form) => {
    const formMessage = form.querySelector(".form-message");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Disable button while submitting
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // Clear any previous message
        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "form-message";
        }

        try {
            const response = await fetch(form.action, {
                method: form.method || "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                // Success message
                if (formMessage) {
                    formMessage.textContent =
                        "✓ Thank you! Your submission has been sent successfully.";
                    formMessage.classList.add("success");
                }

                // Reset the form
                form.reset();

            } else {
                // Error message
                if (formMessage) {
                    formMessage.textContent =
                        "✗ Sorry, something went wrong. Please try again.";
                    formMessage.classList.add("error");
                }
            }

        } catch (error) {
            // Connection error
            if (formMessage) {
                formMessage.textContent =
                    "✗ Unable to send your submission. Please check your internet connection and try again.";
                formMessage.classList.add("error");
            }

        } finally {
            // Restore submit button
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        }
    });
});