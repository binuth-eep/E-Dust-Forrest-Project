let unitPrice = 2500;
let deliveryFee = 300;

function changeQty(amt) {
    let qtyInput = document.getElementById('qty');
    if (!qtyInput) return;
    let newQty = parseInt(qtyInput.value) + amt;
    if (newQty >= 1) {
        qtyInput.value = newQty;
        updateAllTotals();
    }
}

function updateAllTotals() {
    let qtyInput = document.getElementById('qty');
    let qty = qtyInput ? parseInt(qtyInput.value) : 0;
    let subtotal = unitPrice * qty;

    let isCod = document.querySelector('input[name="pay"]:checked')?.value === 'cod';
    let codFee = isCod ? 100 : 0;
    let total = subtotal + deliveryFee + codFee;

    // UI Updates
    const updateText = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val.toLocaleString(); };
    
    updateText('item-total-price', subtotal);
    updateText('subtotal', subtotal);
    updateText('summary-subtotal', subtotal);
    updateText('final-total-1', total);
    updateText('final-total-2', total);

    if(document.getElementById('cod-fee-row')) document.getElementById('cod-fee-row').style.display = isCod ? 'flex' : 'none';
    if(document.getElementById('card-details')) document.getElementById('card-details').style.display = isCod ? 'none' : 'block';
}

function goToStep(n) {
    // Hide all contents
    document.querySelectorAll('.step-content').forEach(c => c.classList.remove('active-step'));
    // Update Stepper Circles
    document.querySelectorAll('.step').forEach((s, idx) => {
        if(idx + 1 <= n) s.classList.add('active');
        else s.classList.remove('active');
    });
    // Show current step
    document.getElementById('step' + n).classList.add('active-step');
    updateAllTotals();
}

function validateStep2() {
    let fields = ['fullName', 'address', 'phone'];
    let valid = fields.every(id => document.getElementById(id).value.trim().length > 0);
    if(!valid) return alert("Please fill all shipping details.");
    goToStep(3);
}

function removeItem(id) {
    if(confirm("Remove this item from cart?")) {
        document.getElementById(id).remove();
        unitPrice = 0;
        updateAllTotals();
    }
}

function finish() {
    // 1. Terms and Conditions පරීක්ෂා කිරීම
    const termsChecked = document.getElementById('terms').checked;
    if (!termsChecked) {
        alert("Please agree to the Terms & Conditions to proceed.");
        return; // මෙතැනින් function එක නතර වෙනවා
    }

    // 2. Payment Method එක අනුව පරීක්ෂා කිරීම
    const paymentMethod = document.querySelector('input[name="pay"]:checked').value;
    
    if (paymentMethod === 'card') {
        // Card details fields තියෙන container එක
        const cardInputs = document.querySelectorAll('#card-details input');
        let cardValid = true;
        
        cardInputs.forEach(input => {
            if (input.value.trim() === "") {
                cardValid = false;
            }
        });

        if (!cardValid) {
            alert("Please fill in all card details.");
            return;
        }
    }

    // 3. සියල්ල හරි නම් පමණක් Order එක Process කිරීම
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Processing...";
    btn.disabled = true;

    // Order ID logic...
    let lastOrder = localStorage.getItem('lastOrderNumber') || 1000;
    let nextOrder = parseInt(lastOrder) + 1;
    localStorage.setItem('lastOrderNumber', nextOrder);

    setTimeout(() => {
        document.getElementById('checkout-main').style.display = 'none';
        document.getElementById('success-page').style.display = 'flex';
        document.getElementById('order-id-display').innerText = "SL-" + nextOrder;
    }, 1500);
}