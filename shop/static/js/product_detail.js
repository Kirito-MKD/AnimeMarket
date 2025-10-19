// Product Detail Page JavaScript
class ProductDetail {
    constructor() {
        this.quantityInput = document.getElementById('id_quantity');
        this.addToCartBtn = document.querySelector('.add-to-cart-btn');
        this.purchaseForm = document.getElementById('purchase-form');
        this.successModal = document.getElementById('success-modal');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.mainImage = document.getElementById('main-product-image');

        this.init();
    }

    init() {
        this.bindEvents();
        this.createSakuraPetals();
        this.initParallax();
        this.loadRelatedProducts();
    }

    bindEvents() {
        // Quantity controls
        document.querySelector('.quantity-btn.minus').addEventListener('click', () => this.changeQuantity(-1));
        document.querySelector('.quantity-btn.plus').addEventListener('click', () => this.changeQuantity(1));

        // Add to cart
        this.purchaseForm.addEventListener('submit', (e) => this.handleAddToCart(e));

        // Tab navigation
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Image thumbnails
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => this.switchImage(thumb.dataset.image));
        });

        // Modal events
        document.querySelector('.continue-shopping').addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Wishlist button
        document.querySelector('.wishlist-btn').addEventListener('click', () => this.addToWishlist());
    }

    changeQuantity(delta) {
        let currentValue = parseInt(this.quantityInput.value) || 1;
        let newValue = currentValue + delta;

        if (newValue >= 1 && newValue <= 99) {
            this.quantityInput.value = newValue;
            this.animateQuantityChange();
            this.createSakuraPetalNearElement(this.quantityInput);
        }
    }

    animateQuantityChange() {
        this.quantityInput.classList.remove('quantity-bounce');
        void this.quantityInput.offsetWidth;
        this.quantityInput.classList.add('quantity-bounce');

        setTimeout(() => {
            this.quantityInput.classList.remove('quantity-bounce');
        }, 300);
    }

    async handleAddToCart(e) {
        e.preventDefault();

        const btn = this.addToCartBtn;
        const originalText = btn.querySelector('.btn-text').textContent;

        // Show loading state
        btn.disabled = true;
        btn.querySelector('.btn-text').textContent = 'Adding...';
        btn.querySelector('.btn-loader').style.display = 'block';

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success animation
            this.showSuccessAnimation();

            // Submit form after animation
            setTimeout(() => {
                this.purchaseForm.submit();
            }, 1500);

        } catch (error) {
            console.error('Error adding to cart:', error);
            this.showError('Failed to add item to cart. Please try again.');
            this.resetButton(btn, originalText);
        }
    }

    showSuccessAnimation() {
        // Create sakura petals
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.createSakuraPetalNearElement(this.addToCartBtn), i * 100);
        }

        // Show success modal
        setTimeout(() => {
            this.showModal();
        }, 800);
    }

    showModal() {
        this.successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    resetButton(btn, originalText) {
        btn.disabled = false;
        btn.querySelector('.btn-text').textContent = originalText;
        btn.querySelector('.btn-loader').style.display = 'none';
    }

    switchTab(tabId) {
        // Update active tab button
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update active tab pane
        this.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabId);
        });
    }

    switchImage(imageUrl) {
        // Update main image with fade transition
        this.mainImage.style.opacity = '0';

        setTimeout(() => {
            this.mainImage.src = imageUrl;
            this.mainImage.style.opacity = '1';
        }, 200);

        // Update active thumbnail
        this.thumbnails.forEach(thumb => {
            thumb.classList.toggle('active', thumb.dataset.image === imageUrl);
        });
    }

    addToWishlist() {
        const btn = document.querySelector('.wishlist-btn');
        const originalText = btn.querySelector('.btn-text').textContent;

        btn.querySelector('.btn-text').textContent = 'Added!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';

        // Create celebration effect
        this.createSakuraPetalNearElement(btn);

        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }

    createSakuraPetals() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createFloatingSakura(), i * 800);
        }
    }

    createFloatingSakura() {
        const sakura = document.createElement('div');
        sakura.className = 'sakura-petal';
        sakura.innerHTML = '🌸';
        sakura.style.cssText = `
            position: fixed;
            top: -50px;
            font-size: ${20 + Math.random() * 15}px;
            opacity: ${0.3 + Math.random() * 0.4};
            left: ${Math.random() * 100}vw;
            pointer-events: none;
            z-index: 9998;
            animation: fall ${8 + Math.random() * 12}s linear infinite;
        `;

        document.body.appendChild(sakura);

        setTimeout(() => {
            sakura.remove();
        }, 20000);
    }

    createSakuraPetalNearElement(element) {
        const rect = element.getBoundingClientRect();

        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.innerHTML = '🌸';
        petal.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height/2}px;
            left: ${rect.left + rect.width/2}px;
            font-size: 20px;
            opacity: 0.8;
            pointer-events: none;
            z-index: 9999;
            animation: petal-pop 1.5s ease-out forwards;
        `;

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 1500);
    }

    initParallax() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
        });

        const updateParallax = () => {
            if (this.mainImage) {
                this.mainImage.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.02)`;
            }
            requestAnimationFrame(updateParallax);
        };

        updateParallax();
    }

    loadRelatedProducts() {
        // This would typically fetch from an API
        const relatedProducts = [
            {
                name: 'Anime Figure - Character B',
                price: '2499',
                image: '/static/img/products/figure-b.jpg',
                category: 'Figures'
            },
            {
                name: 'Manga Collection Vol. 1',
                price: '899',
                image: '/static/img/products/manga-1.jpg',
                category: 'Manga'
            },
            {
                name: 'Anime T-Shirt - Design A',
                price: '1299',
                image: '/static/img/products/tshirt-a.jpg',
                category: 'Apparel'
            },
            {
                name: 'Keychain - Cute Mascot',
                price: '499',
                image: '/static/img/products/keychain.jpg',
                category: 'Accessories'
            }
        ];

        const grid = document.getElementById('related-products-grid');
        if (!grid) return;

        grid.innerHTML = relatedProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <button class="quick-view-btn">👀 Quick View</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <div class="product-price">${product.price} ₽</div>
                    <button class="add-to-cart-mini">🛒 Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <span class="notification-icon">❌</span>
            <span class="notification-message">${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }

    @keyframes petal-pop {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, -50px) scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0.5) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .quantity-bounce {
        animation: bounce 0.3s ease;
    }

    .sakura-petal {
        position: fixed;
        pointer-events: none;
        user-select: none;
        z-index: 9998;
    }

    .error-notification {
        font-family: inherit;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
});
