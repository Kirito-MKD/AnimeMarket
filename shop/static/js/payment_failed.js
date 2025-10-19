// Payment Failed Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment failed page initialized');
    
    // Add shake animation to payment icon on load
    const paymentIcon = document.querySelector('.payment-icon');
    if (paymentIcon) {
        setTimeout(() => {
            paymentIcon.classList.add('payment-shake');
            setTimeout(() => {
                paymentIcon.classList.remove('payment-shake');
            }, 800);
        }, 1000);
    }
    
    // Add click handlers for analytics or additional functionality
    const retryButton = document.querySelector('.btn-retry');
    const continueButton = document.querySelector('.btn-continue');
    const supportButton = document.querySelector('.btn-support');
    
    if (retryButton) {
        retryButton.addEventListener('click', function(e) {
            console.log('User clicked "Try Again"');
            // You can add analytics tracking here
            // gtag('event', 'payment_retry_click', {
            //     'event_category': 'Payment',
            //     'event_label': 'Payment Failed Page'
            // });
        });
    }
    
    if (continueButton) {
        continueButton.addEventListener('click', function(e) {
            console.log('User clicked "Continue Shopping"');
            // You can add analytics tracking here
            // gtag('event', 'continue_shopping_click', {
            //     'event_category': 'Payment',
            //     'event_label': 'Payment Failed Page'
            // });
        });
    }
    
    if (supportButton) {
        supportButton.addEventListener('click', function(e) {
            console.log('User clicked "Contact Support"');
            // You can add analytics tracking here
            // gtag('event', 'support_contact_click', {
            //     'event_category': 'Payment',
            //     'event_label': 'Payment Failed Page'
            // });
            
            // Optional: Prevent default and show support modal instead
            // e.preventDefault();
            // showSupportModal();
        });
    }
    
    // Function to show support modal (if implemented)
    function showSupportModal() {
        // This would show a modal with support options
        console.log('Show support modal');
        // Implementation would depend on your modal system
    }
    
    // Add error code handling if passed via URL parameters
    function handleErrorCodes() {
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('error_code');
        const errorMessage = urlParams.get('error_message');
        
        if (errorCode) {
            console.log('Payment error code:', errorCode);
            // You could display specific messages based on error codes
            displaySpecificErrorMessage(errorCode, errorMessage);
        }
    }
    
    function displaySpecificErrorMessage(errorCode, errorMessage) {
        // This function could show more specific error messages
        // based on the error code received from the payment processor
        
        const errorMessages = {
            'card_declined': 'Your card was declined. Please check your card details or use a different payment method.',
            'insufficient_funds': 'Your card has insufficient funds. Please use a different payment method.',
            'expired_card': 'Your card has expired. Please update your card details.',
            'invalid_cvc': 'The CVC code you entered is invalid. Please check and try again.',
            'processing_error': 'There was an error processing your payment. Please try again.'
        };
        
        const specificMessage = errorMessages[errorCode];
        if (specificMessage) {
            // You could update the main message or show an additional alert
            console.log('Specific error:', specificMessage);
        }
        
        if (errorMessage) {
            console.log('Error message from processor:', errorMessage);
        }
    }
    
    // Initialize error code handling
    handleErrorCodes();
});