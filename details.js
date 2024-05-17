document.addEventListener("DOMContentLoaded", function () {
    const fullNameInput = document.getElementById("fullName");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    const genderSelect = document.getElementById("gender");
    const continueButton = document.getElementById("continueButton");

    const storedDetails = JSON.parse(localStorage.getItem("details")) || {};

    fullNameInput.value = storedDetails.fullName || "";
    mobileNumberInput.value = storedDetails.mobileNumber || "";
    emailInput.value = storedDetails.email || "";
    confirmEmailInput.value = storedDetails.confirmEmail || "";
    genderSelect.value = storedDetails.gender || "Male";

    function updateContinueButtonState() {
        if (
            fullNameInput.value.trim() !== "" &&
            mobileNumberInput.value.trim() !== "" &&
            emailInput.value.trim() !== "" &&
            confirmEmailInput.value.trim() !== "" &&
            emailInput.value === confirmEmailInput.value
        ) {
            continueButton.removeAttribute("disabled");
        } else {
            continueButton.setAttribute("disabled", "disabled");
        }
    }

    fullNameInput.addEventListener("input", updateContinueButtonState);
    mobileNumberInput.addEventListener("input", updateContinueButtonState);
    emailInput.addEventListener("input", updateContinueButtonState);
    confirmEmailInput.addEventListener("input", updateContinueButtonState);

    const detailsForm = document.getElementById("detailsForm");
    detailsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const details = {
            fullName: fullNameInput.value,
            mobileNumber: mobileNumberInput.value,
            email: emailInput.value,
            confirmEmail: confirmEmailInput.value,
            gender: genderSelect.value
        };

        localStorage.setItem("details", JSON.stringify(details));

        // Redirect to the next page (Payment page)
        window.location.href = "payement.html";
    });
});
