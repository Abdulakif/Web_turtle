// Function to validate the card number format
function validateCardNumber(cardNumber) {
    const cardNumberPattern = /^\d{16}$/; // Assumes a 16-digit card number format
    return cardNumberPattern.test(cardNumber);
  }
  
  // Function to validate the expiry date format (MM/YY)
  function validateExpiryDate(expiryDate) {
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/; // Assumes MM/YY format
    return expiryDatePattern.test(expiryDate);
  }
  
  // Function to validate the payment form
  function validatePaymentForm() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvcInput = document.getElementById('cvc');
    const nameOnCardInput = document.getElementById('nameOnCard');
  
    const cardNumber = cardNumberInput.value;
    const expiryDate = expiryDateInput.value;
    const cvc = cvcInput.value;
    const nameOnCard = nameOnCardInput.value;
  
    if (!validateCardNumber(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return false;
    }
  
    if (!validateExpiryDate(expiryDate)) {
      alert('Please enter a valid expiry date in MM/YY format.');
      return false;
    }
  
    if (cvc.length !== 3) {
      alert('Please enter a valid 3-digit CVC / CVV number.');
      return false;
    }
  
    if (nameOnCard.trim() === '') {
      alert('Please enter the name on the card.');
      return false;
    }
  
    return true;
  }
  
  // Function to initialize the payment page
  function initializePaymentPage() {
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      if (validatePaymentForm()) {
        // Perform payment processing here
        alert('Payment successful!'); // Replace with actual payment processing code
        window.location.href = 'confirmation.html'; // Redirect to the confirmation page
      }
    });
  }
  
  // Initialize the payment page when it loads
  initializePaymentPage();
  