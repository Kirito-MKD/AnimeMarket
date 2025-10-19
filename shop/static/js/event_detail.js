// Event Detail Page Functionality
class EventDetailPage {
    constructor() {
        this.modal = document.getElementById('registration-modal');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupShareFunctionality();
        this.setupWishlist();
    }

    setupEventListeners() {
        // Registration button
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.openModal());
        }

        // Share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareEvent());
        }

        // Wishlist button
        const wishlistBtn = document.getElementById('wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.toggleWishlist());
        }

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Registration form submission
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));
        }
    }

    setupAnimations() {
        // Animate elements on scroll
        this.animateOnScroll();

        // Add hover effects to cards
        this.setupCardHoverEffects();
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

        // Observe all sections
        document.querySelectorAll('.event-description, .event-highlights, .event-speakers, .sidebar-card')
            .forEach(section => observer.observe(section));
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.speaker-card, .related-event-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(255, 182, 193, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 20px rgba(255, 182, 193, 0.2)';
            });
        });
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    async shareEvent() {
        const shareData = {
            title: document.querySelector('.event-title').textContent,
            text: document.querySelector('.event-excerpt').textContent,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                await navigator.clipboard.writeText(window.location.href);
                this.showNotification('Link copied to clipboard! 📋', 'success');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    }

    toggleWishlist() {
        const wishlistBtn = document.getElementById('wishlist-btn');
        const isSaved = wishlistBtn.classList.contains('saved');

        if (isSaved) {
            wishlistBtn.classList.remove('saved');
            wishlistBtn.innerHTML = '❤️ {% trans "Save" %}';
            this.showNotification('Removed from saved events', 'info');
        } else {
            wishlistBtn.classList.add('saved');
            wishlistBtn.innerHTML = '💖 {% trans "Saved" %}';
            this.showNotification('Added to saved events! 💕', 'success');

            // Add animation
            wishlistBtn.style.animation = 'heartbeat 0.6s ease';
            setTimeout(() => {
                wishlistBtn.style.animation = '';
            }, 600);
        }
    }

    async handleRegistration(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '⏳ {% trans "Processing..." %}';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            this.showNotification('🎉 Registration successful! Check your email for confirmation.', 'success');
            this.closeModal();
            form.reset();

        } catch (error) {
            this.showNotification('❌ Registration failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type) {
        // Create notification element
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
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #ff6b93 0%, #ff85a1 100%)';
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EventDetailPage();

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

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
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

        .btn-wishlist.saved {
            background: #ff6b93 !important;
            color: white !important;
            border-color: #ff6b93 !important;
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
    `;
    document.head.appendChild(style);
});