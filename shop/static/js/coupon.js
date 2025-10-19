// Coupon System JavaScript
class CouponSystem {
    constructor() {
        this.modal = document.getElementById('coupon-modal');
        this.couponBtn = document.getElementById('coupon-btn');
        this.couponForm = document.getElementById('coupon-form');
        this.couponInput = document.getElementById('coupon-code');
        this.submitBtn = this.couponForm?.querySelector('.coupon-submit-btn');
        this.notificationContainer = document.getElementById('notification-container');

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Coupon button click
        if (this.couponBtn) {
            this.couponBtn.addEventListener('click', () => this.openModal());
        }

        // Coupon form submission
        if (this.couponForm) {
            this.couponForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Modal close events
        const closeButtons = this.modal?.querySelectorAll('.close-modal');
        if (closeButtons) {
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => this.closeModal());
            });
        }

        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });

        // Auto-uppercase coupon codes
        if (this.couponInput) {
            this.couponInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            this.couponInput?.focus();

            // Add animation class
            setTimeout(() => {
                const modalContent = this.modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }
            }, 10);
        }
    }

    closeModal() {
        if (this.modal) {
            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
            }

            setTimeout(() => {
                this.modal.style.display = 'none';
                this.resetForm();
            }, 300);
        }
    }

    resetForm() {
        if (this.couponForm) {
            this.couponForm.reset();
        }
        if (this.submitBtn) {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Apply';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const code = this.couponInput?.value.trim();
        if (!code) {
            this.showNotification('Please enter a coupon code', 'error');
            return;
        }

        // Show loading state
        if (this.submitBtn) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Applying...';
            this.submitBtn.classList.add('coupon-loading');
        }

        try {
            const formData = new FormData(this.couponForm);
            const response = await fetch(this.couponForm.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.getCSRFToken(),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification(data.message || 'Coupon applied successfully!', 'success');
                this.closeModal();

                // Reload page after success to update prices
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                this.showNotification(data.message || 'Invalid coupon code', 'error');
                this.resetSubmitButton();
            }
        } catch (error) {
            console.error('Coupon application error:', error);
            this.showNotification('An error occurred. Please try again.', 'error');
            this.resetSubmitButton();
        }
    }

    resetSubmitButton() {
        if (this.submitBtn) {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Apply';
            this.submitBtn.classList.remove('coupon-loading');
        }
    }

    getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]')?.value || csrftoken;
    }

    showNotification(message, type = 'info') {
        if (!this.notificationContainer) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
        `;

        this.notificationContainer.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Utility function to validate coupon format
    static validateCouponFormat(code) {
        const couponRegex = /^[A-Z0-9]{4,20}$/;
        return couponRegex.test(code);
    }
}

// Initialize coupon system
function initializeCouponSystem() {
    return new CouponSystem();
}

// Export for global access
window.CouponSystem = CouponSystem;
window.initializeCouponSystem = initializeCouponSystem;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCouponSystem);
} else {
    initializeCouponSystem();
}