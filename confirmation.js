document.addEventListener("DOMContentLoaded", function () {
    // Retrieve contact information from localStorage
    const contactName = localStorage.getItem("contactName");
    const contactDate = localStorage.getItem("contactDate");
    const contactTime = localStorage.getItem("contactTime");
    const contactDuration = localStorage.getItem("contactDuration");
    const contactMobile = localStorage.getItem("contactMobile");
    const contactEmail = localStorage.getItem("contactEmail");
    const contactGender = localStorage.getItem("contactGender");

    // Retrieve ticket information from localStorage
    const ticketsCharges = JSON.parse(localStorage.getItem("ticketsCharges"));

    // Calculate total payable amount
    let totalPayable = 0;

    // Create a summary object to store ticket quantities and charges
    const summary = {};

    // Populate contact information
    document.getElementById("contactName").textContent = contactName;
    document.getElementById("contactDate").textContent = contactDate;
    document.getElementById("contactTime").textContent = contactTime;
    document.getElementById("contactDuration").textContent = contactDuration;
    document.getElementById("contactMobile").textContent = contactMobile;
    document.getElementById("contactEmail").textContent = contactEmail;
    document.getElementById("contactGender").textContent = contactGender;

    // Populate tickets and charges table
    const ticketsChargesTable = document.querySelector(".summary-table:last-of-type");
    for (const ticket of ticketsCharges) {
        const row = ticketsChargesTable.insertRow();
        row.insertCell().textContent = ticket.ticket;
        row.insertCell().textContent = "$" + ticket.charge.toFixed(2);
        
        // Update the summary object with ticket quantities and charges
        summary[ticket.ticket] = summary[ticket.ticket] || { quantity: 0, charge: 0 };
        summary[ticket.ticket].quantity++;
        summary[ticket.ticket].charge += ticket.charge;

        totalPayable += ticket.charge;
    }

    // Populate total payable
    document.getElementById("totalPayable").textContent = "$" + totalPayable.toFixed(2);

    // Populate summary of the table
    const summaryTable = document.querySelector(".summary-table:first-of-type");
    for (const ticket in summary) {
        const row = summaryTable.insertRow();
        row.insertCell().textContent = ticket;
        row.insertCell().textContent = summary[ticket].quantity;
        row.insertCell().textContent = "$" + summary[ticket].charge.toFixed(2);
    }

    // Back to Home button
    const backToHomeButton = document.getElementById("backToHomeButton");
    backToHomeButton.addEventListener("click", function () {
        window.location.href = "home.html";
    });
});
