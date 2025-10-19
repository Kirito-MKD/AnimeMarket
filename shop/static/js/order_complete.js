// Order Complete Page Functionality
class OrderComplete {
    constructor() {
        this.init();
    }

    init() {
        this.startAnimations();
        this.setupEventListeners();
        this.createConfetti();
        this.startCelebration();
    }

    startAnimations() {
        // Start cat animation
        this.animateCat();

        // Add floating animation to elements
        this.addFloatingAnimations();
    }

    animateCat() {
        const catAnimation = document.getElementById('cat-animation');
        if (!catAnimation) return;

        // Add random blinks to the cat
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.catBlink();
            }
        }, 3000);
    }

    catBlink() {
        const catBody = document.querySelector('.cat-body');
        if (!catBody) return;

        const originalEmoji = catBody.textContent;
        catBody.textContent = '😺';
        catBody.style.transform = 'scale(1.1)';

        setTimeout(() => {
            catBody.textContent = originalEmoji;
            catBody.style.transform = 'scale(1)';
        }, 200);
    }

    addFloatingAnimations() {
        // Add floating animation to heart
        const heart = document.querySelector('.heart');
        if (heart) {
            setInterval(() => {
                heart.style.animation = 'heartbeat 1.5s infinite, bounce 2s infinite';
            }, 4000);
        }

        // Add subtle animation to status badge
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.style.animationDelay = '0.5s';
        }
    }

    setupEventListeners() {
        // Track order button
        const trackBtn = document.getElementById('track-order');
        if (trackBtn) {
            trackBtn.addEventListener('click', () => this.trackOrder());
        }

        // Download receipt button
        const downloadBtn = document.getElementById('download-receipt');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadReceipt());
        }
    }

    createConfetti() {
        const colors = ['#ff6b93', '#ff85a1', '#ffd1dc', '#9c3d64', '#4CAF50', '#ff9800'];
        const container = document.getElementById('confetti-container');

        if (!container) return;

        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    --confetti-color: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    animation-duration: ${Math.random() * 3 + 2}s;
                    animation-delay: ${Math.random() * 2}s;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                `;

                container.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 30);
        }
    }

    startCelebration() {
        // Add celebration effects
        this.addSparkleEffects();
        this.playCelebrationSound();
    }

    addSparkleEffects() {
        // Add random sparkles around the page
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.createSparkle();
            }
        }, 1000);
    }

    createSparkle() {
        const container = document.querySelector('.complete-content');
        if (!container) return;

        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle ${Math.random() * 2 + 1}s ease-in-out;
            pointer-events: none;
            z-index: 100;
        `;

        container.style.position = 'relative';
        container.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }

    playCelebrationSound() {
        // In a real app, you might play a subtle celebration sound
        console.log('🎉 Celebration time!'); // Placeholder for sound effect
    }

    async trackOrder() {
        const trackBtn = document.getElementById('track-order');
        const originalText = trackBtn.innerHTML;

        trackBtn.innerHTML = '⏳ Redirecting...';
        trackBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.showNotification('Opening tracking page...', 'success');

        // In real app, redirect to tracking page
        // window.open('/track-order/' + orderId, '_blank');

        setTimeout(() => {
            trackBtn.innerHTML = originalText;
            trackBtn.disabled = false;
        }, 2000);
    }

    async downloadReceipt() {
        const downloadBtn = document.getElementById('download-receipt');
        const originalText = downloadBtn.innerHTML;

        downloadBtn.innerHTML = '⏳ Generating...';
        downloadBtn.disabled = true;

        try {
            // Simulate PDF generation
            await new Promise(resolve => setTimeout(resolve, 2000));

            this.showNotification('Receipt downloaded successfully!', 'success');

            // In real app, trigger actual download
            // this.downloadPDF();

        } catch (error) {
            this.showNotification('Error generating receipt', 'error');
        } finally {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }
    }

    downloadPDF() {
        // Placeholder for actual PDF download
        const link = document.createElement('a');
        link.href = '/download-receipt/' + orderId;
        link.download = `receipt-${orderId}.pdf`;
        link.click();
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
}

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
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

    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
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
`;

document.head.appendChild(additionalStyles);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OrderComplete();
});