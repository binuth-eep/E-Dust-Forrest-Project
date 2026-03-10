// Navigation Function
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active-step');
    });

    // Show current step
    document.getElementById('step' + stepNumber).classList.add('active-step');

    // Update progress bar
    document.querySelectorAll('#progressbar li').forEach((li, index) => {
        if (index < stepNumber) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

// Validation Function for Shipping
function validateStep2() {
    const name = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Check if fields are empty
    if (name === "" || address === "" || phone === "") {
        alert("Please fill in all shipping details.");
        return;
    }

    // Check for 10 digits
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        document.getElementById('phone').focus();
        return;
    }

    // If valid, move to step 3
    goToStep(3);
}

function togglePaymentFields() {
    const cardDetails = document.getElementById('card-details');
    const codFeeDisplay = document.getElementById('cod-fee-display');
    const totalDisplay = document.getElementById('final-total-2');
    
    const selectedPay = document.querySelector('input[name="pay"]:checked').value;
    
    // Base prices
    const subtotal = 2500;
    const deliveryFee = 300;
    let finalTotal = subtotal + deliveryFee;

    if (selectedPay === 'card') {
        cardDetails.style.display = 'block';
        codFeeDisplay.style.display = 'none';
    } else {
        cardDetails.style.display = 'none';
        codFeeDisplay.style.display = 'block';
        finalTotal += 100; // Adding COD Fee
    }

    // Update the final total display
    totalDisplay.innerText = finalTotal.toLocaleString();
}

// Finalization Function
function finish() {
    // Check which payment method is selected
    const selectedPay = document.querySelector('input[name="pay"]:checked').value;

    if (selectedPay === 'card') {
        // Simple check to see if card fields are filled
        // You can add more complex pattern matching here later
        const cardInputs = document.querySelectorAll('#card-details input');
        let allFilled = true;
        
        cardInputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert("Please enter your card details to proceed.");
            return; // Stop here if details are missing
        }
    }

    // If COD or Card details are filled, proceed
    alert("Success! Your order has been placed successfully. Thank you for shopping with us!");
    window.location.reload(); 
}

x   