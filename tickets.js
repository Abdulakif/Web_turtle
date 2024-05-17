// Function to calculate charges based on selected duration and ticket quantities
function calculateCharges(duration) {
    const pricingTable = {
      'SL Adult': { normal: 400, peak: 600 },
      'SL Child': { normal: 200, peak: 300 },
      'Foreigner Adult': { normal: 1000, peak: 1200 },
      'Foreigner Child': { normal: 800, peak: 1000 },
      'Infant': { normal: 0, peak: 0 }
    };
  
    const ticketElements = document.querySelectorAll('#guestForm select');
    const summaryTable = document.getElementById('summaryTable');
    let totalPayable = 0;
  
    ticketElements.forEach(element => {
      const category = element.dataset.category;
      const quantity = parseInt(element.value);
      let charge;
      if (duration === '10.00 am - 11.00 am (Peak)') {
        charge = pricingTable[category].peak;
      } else if (duration === '11.00 am - 12.00 pm (Peak)') {
        charge = pricingTable[category].extendedPeak;
      } else {
        charge = pricingTable[category].normal;
      }
      const total = quantity * charge;
  
      totalPayable += total;
  
      // Check if a row for the category already exists, or create a new row
      let row = summaryTable.querySelector(`[data-category="${category}"]`);
      if (!row) {
        row = summaryTable.insertRow();
        row.dataset.category = category;
        const categoryCell = row.insertCell(0);
        const quantityCell = row.insertCell(1);
        const pricePerTicketCell = row.insertCell(2);
        const totalPriceCell = row.insertCell(3);
        categoryCell.textContent = category;
      }
  
      // Update the row with quantity, price per ticket, and total price
      const quantityCell = row.cells[1];
      const pricePerTicketCell = row.cells[2];
      const totalPriceCell = row.cells[3];
      quantityCell.textContent = quantity;
      pricePerTicketCell.textContent = `RS.${charge.toFixed(2)} (${getDurationLabel(duration, category)})`;

      totalPriceCell.textContent = `Rs.${total.toFixed(2)}`;
    });
  
    // Remove rows that no longer have quantity
    summaryTable.querySelectorAll('tr').forEach(row => {
      const category = row.dataset.category;
      const quantity = parseInt(row.cells[1].textContent);
      if (!Array.from(ticketElements).some(element => element.dataset.category === category) || quantity === 0) {
        row.remove();
      }
    });
  
    return totalPayable;
  }
  
  function getDurationLabel(duration) {
  if (duration === '10.00 am - 11.00 am (Peak)') {
    return 'Peak';
  } else if (duration === '11.00 am - 12.00 pm (Peak)') {
    return 'Peak';
  } else if (duration === '12.00 pm - 01.00 pm (Peak)') {
    return 'Peak';
  } else if (duration === '03.00 pm - 04.00 pm (Peak)') {
    return 'Peak';
  } else if (duration === '04.00 pm - 05.00 pm (Peak)') {
    return 'Peak';
  } else if (duration === '05.00 pm - 06.00 pm (Peak)') {
    return 'Peak';
  } else {
    return 'Normal';
  }
}
  
  
  // Function to update the summary table and total payable
  function updateSummaryTable() {
    const durationSelect = document.getElementById('durationSelect');
    const selectedDuration = durationSelect.value;
  
    const totalPayable = calculateCharges(selectedDuration);
    const totalPayableElement = document.getElementById('totalPayable');
    totalPayableElement.textContent = `Total Payable: Rs.${totalPayable.toFixed(2)}`;
  
    const continueButton = document.getElementById('continueButton');
    continueButton.disabled = totalPayable <= 0;
  }
  
  // Function to initialize the page
  function initializeTicketsPage() {
    const durationSelect = document.getElementById('durationSelect');
    durationSelect.addEventListener('change', updateSummaryTable);
  
    const ticketElements = document.querySelectorAll('#guestForm select');
    ticketElements.forEach(element => {
      element.addEventListener('change', updateSummaryTable);
    });
  
    const continueButton = document.getElementById('continueButton');
    continueButton.addEventListener('click', function() {
      // Check if the button is enabled
      if (!continueButton.disabled) {
        // Redirect to the "Details" page
        window.location.href = 'details.html'; // Change the URL to the actual Details page URL
      }
    });
  }
  
  
  // Initialize the page when it loads
  initializeTicketsPage();
  
