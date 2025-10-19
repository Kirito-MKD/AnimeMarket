// Checkout Page Functionality

class CheckoutPage {
    constructor() {
        this.form = document.getElementById('checkout-form');
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAnimations();
        this.setupPaymentMethods();
    }

    setupEventListeners() {
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Input validation on blur
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        // Terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', () => {
                this.validateTerms();
                this.togglePrivacyError(); // Добавлен вызов метода
            });
        }

        // Submit button hover for privacy error
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('mouseover', () => {
                this.showPrivacyErrorOnHover();
            });
        }
    }

    setupFormValidation() {
        // Add validation rules to fields
        this.setupValidationRules();
    }

    setupValidationRules() {
        const rules = {
            first_name: { required: true, minLength: 2 },
            last_name: { required: true, minLength: 2 },
            email: { required: true, email: true },
            phone: { required: true, phone: true },
            address: { required: true, minLength: 5 },
            city: { required: true, minLength: 2 },
            postal_code: { required: true, minLength: 4 },
            country: { required: true }
        };

        // Store rules in dataset
        Object.keys(rules).forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.dataset.rules = JSON.stringify(rules[fieldName]);
            }
        });
    }

    setupAnimations() {
        // Animate form sections on scroll
        this.animateOnScroll();

        // Add hover effects
        this.setupHoverEffects();
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.form-section, .summary-card')
            .forEach(section => observer.observe(section));
    }

    setupHoverEffects() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('mouseenter', () => {
                method.style.transform = 'translateX(5px)';
                method.style.borderColor = '#ff9eb3';
            });

            method.addEventListener('mouseleave', () => {
                method.style.transform = 'translateX(0)';
                if (!method.querySelector('input').checked) {
                    method.style.borderColor = '#ffd1dc';
                }
            });
        });
    }

    setupPaymentMethods() {
        const paymentMethods = document.querySelectorAll('.payment-method input');
        paymentMethods.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateSelectedPayment();
            });
        });
    }

    updateSelectedPayment() {
        document.querySelectorAll('.payment-method').forEach(method => {
            method.style.borderColor = '#ffd1dc';
            method.style.background = 'white';
        });

        const selectedMethod = document.querySelector('.payment-method input:checked')?.closest('.payment-method');
        if (selectedMethod) {
            selectedMethod.style.borderColor = '#ff6b93';
            selectedMethod.style.background = 'linear-gradient(135deg, #fffafb 0%, #fff5f7 100%)';
        }
    }

    validateField(field) {
        const rules = JSON.parse(field.dataset.rules || '{}');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Minimum ${rules.minLength} characters required`;
        }

        if (isValid && rules.email && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        if (isValid && rules.phone && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateTerms() {
        const termsCheckbox = document.getElementById('terms');
        const termsError = document.querySelector('#terms ~ .error-message');

        if (!termsCheckbox?.checked) {
            if (termsError) {
                termsError.textContent = 'You must accept the terms and conditions';
            }
            return false;
        }

        if (termsError) {
            termsError.textContent = '';
        }

        return true;
    }

    // Новый метод для управления ошибкой приватности
    togglePrivacyError() {
        const termsCheckbox = document.getElementById('terms');
        const privacyLabel = document.getElementById('privacy-error');

        if (!termsCheckbox || !privacyLabel) return;

        if (!termsCheckbox.checked) {
            privacyLabel.classList.remove('hidden');
        } else {
            privacyLabel.classList.add('hidden');
        }
    }

    // Новый метод для показа ошибки при наведении
    showPrivacyErrorOnHover() {
        const termsCheckbox = document.getElementById('terms');
        const privacyLabel = document.getElementById('privacy-error');

        if (!termsCheckbox || !privacyLabel) return;

        if (!termsCheckbox.checked) {
            privacyLabel.classList.remove('hidden');
        }
    }

    validateForm() {
        let isValid = true;

        // Validate all fields
        document.querySelectorAll('input[data-rules], select[data-rules]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate terms
        if (!this.validateTerms()) {
            isValid = false;
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        this.showLoading(true);
        submitBtn.innerHTML = '⏳ Processing...';
        submitBtn.disabled = true;

        try {

            if (document.querySelector('input[name="payment_method"]:checked').value == 'cash';)
            // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                setTimeout(() => {
                window.location.href = '{{ payment:completed }}';
                }, 1500);
                this.showNotification('Order placed successfully! Redirecting...', 'success');
            else {
                // In real app, this would submit the form
                // this.form.submit();

                // Simulate success
                this.showNotification('Order placed successfully! Redirecting...', 'success');

                // Simulate redirect
                setTimeout(() => {
                    window.location.href = '{{ payment:process }}';
                }, 1500);
            }


        } catch (error) {
            this.showNotification('Error placing order. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        } finally {
            this.showLoading(false);
        }
    }

    showFieldError(field, message) {
        this.clearFieldError(field);

        field.style.borderColor = '#f44336';

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.marginTop = '5px';

        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '#ffd1dc';

        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    showLoading(show) {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.display = show ? 'flex' : 'none';
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutPage();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .wave-btn {
            position: relative;
            overflow: hidden;
        }

        .wave-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
        }

        .wave-btn:hover::after {
            left: 100%;
        }

        .form-section {
            opacity: 0;
            transform: translateY(20px);
        }

        .summary-card {
            opacity: 0;
            transform: translateY(20px);
        }

        .hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
});