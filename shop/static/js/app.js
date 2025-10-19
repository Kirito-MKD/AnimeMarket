// Product data
const products = [
    {
        id: 1,
        name: "Premium Anime Figure",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZpZ3VyZSUyMGNvbGxlY3RpYmxlfGVufDF8fHx8MTc1NjAzODgyOXww&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: true,
        isSale: true
    },
    {
        id: 2,
        name: "Mecha Robot Model",
        price: 64.99,
        originalPrice: null,
        rating: 4.6,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1747547766819-a6a25384a41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRveSUyMHJvYm90fGVufDF8fHx8MTc1NjA1ODU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: false,
        isSale: false
    },
    {
        id: 3,
        name: "Kawaii Plushie Set",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.9,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1751559203073-2027dd23246b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVzaGllJTIwdG95JTIwY3V0ZXxlbnwxfHx8fDE3NTYwNTg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: false,
        isSale: true
    },
    {
        id: 4,
        name: "Samurai Katana Replica",
        price: 149.99,
        originalPrice: null,
        rating: 4.7,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1662826321315-c72a74f871c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGthdGFuYSUyMHN3b3JkfGVufDF8fHx8MTc1NjA1ODU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: true,
        isSale: false
    },
    {
        id: 5,
        name: "Anime Keychain Collection",
        price: 19.99,
        originalPrice: 29.99,
        rating: 4.5,
        reviews: 193,
        image: "https://images.unsplash.com/photo-1741294830180-4bfbd8ca2c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1lcmNoYW5kaXNlJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzU2MDU4NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: false,
        isSale: true
    },
    {
        id: 6,
        name: "Japanese Art Print",
        price: 24.99,
        originalPrice: null,
        rating: 4.4,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1569793667639-dae11573b34f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFydCUyMHBvc3RlcnxlbnwxfHx8fDE3NTYwNTg1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        isNew: true,
        isSale: false
    }
];

// Shopping cart
let cart = [];

// Hero Carousel Class
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.slide-indicator');
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoPlay();
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');

        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;

        this.slides.forEach((slide, index) => {
            slide.classList.remove('translate-x-0', '-translate-x-full', 'translate-x-full');

            if (index === slideIndex) {
                slide.classList.add('translate-x-0');
            } else if (index < slideIndex) {
                slide.classList.add('-translate-x-full');
            } else {
                slide.classList.add('translate-x-full');
            }
        });

        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('bg-pink-400', 'bg-white/50');
            indicator.classList.add(index === slideIndex ? 'bg-pink-400' : 'bg-white/50');
        });
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Notification System
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification-container');
    }

    show(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        this.container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (this.container.contains(notification)) {
                    this.container.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = [];
        this.notifications = new NotificationSystem();
        this.updateCartDisplay();
    }

    addItem(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.items.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }

            this.updateCartDisplay();
            this.notifications.show(`${product.name} added to cart! 🛒`, 'success');
        }
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Product Grid Class
class ProductGrid {
    constructor() {
        this.container = document.getElementById('products-grid');
        this.cart = new ShoppingCart();
        this.render();
    }

    createStarRating(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(`<span class="star ${i <= rating ? 'filled' : ''}">⭐</span>`);
        }
        return `<div class="star-rating">${stars.join('')}</div>`;
    }

    createProductCard(product) {
        return `
            <div class="product-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-pink-200">
                <div class="relative aspect-square overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 fade-in" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZCNkMxIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4K'"/>

                    <div class="absolute top-3 left-3 flex flex-col gap-2">
                        ${product.isNew ? '<span class="badge badge-new">NEW 🌟</span>' : ''}
                        ${product.isSale ? '<span class="badge badge-sale">SALE 🔥</span>' : ''}
                    </div>

                    <button class="wishlist-btn absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        ❤️
                    </button>

                    <div class="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="quick-add-btn w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-lg px-4 py-2 flex items-center justify-center gap-2" data-product-id="${product.id}">
                            🛒 Quick Add
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <h3 class="text-lg mb-2 group-hover:text-pink-400 transition-colors">${product.name}</h3>

                    <div class="flex items-center gap-1 mb-3">
                        ${this.createStarRating(Math.floor(product.rating))}
                        <span class="text-sm text-gray-600 ml-2">${product.rating} (${product.reviews})</span>
                    </div>

                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-xl text-pink-400 font-semibold">$${product.price}</span>
                        ${product.originalPrice ? `<span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>` : ''}
                    </div>

                    <button class="add-to-cart-btn w-full bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-gray-800 rounded-full transform hover:scale-105 transition-all px-4 py-2 font-medium" data-product-id="${product.id}">
                        Add to Cart 🛒
                    </button>
                </div>

                <div class="absolute inset-0 border-2 border-transparent group-hover:border-pink-300/50 rounded-2xl transition-colors pointer-events-none"></div>
            </div>
        `;
    }

    render() {
        this.container.innerHTML = products.map(product => this.createProductCard(product)).join('');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add to cart buttons
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || e.target.classList.contains('quick-add-btn')) {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                this.cart.addItem(productId);
            }

            if (e.target.classList.contains('wishlist-btn')) {
                e.target.style.color = e.target.style.color === 'red' ? '' : 'red';
                const notifications = new NotificationSystem();
                notifications.show('Added to wishlist! 💕', 'success');
            }
        });
    }
}

// Newsletter Class
class Newsletter {
    constructor() {
        this.emailInput = document.getElementById('newsletter-email');
        this.submitBtn = document.getElementById('newsletter-btn');
        this.notifications = new NotificationSystem();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.subscribe());
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.subscribe();
            }
        });
    }

    subscribe() {
        const email = this.emailInput.value.trim();

        if (!email) {
            this.notifications.show('Please enter your email address', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.notifications.show('Please enter a valid email address', 'error');
            return;
        }

        // Simulate subscription
        this.submitBtn.textContent = 'Subscribing...';
        this.submitBtn.disabled = true;

        setTimeout(() => {
            this.notifications.show('Thank you for subscribing! 🌸✨', 'success');
            this.emailInput.value = '';
            this.submitBtn.textContent = 'Subscribe ✨';
            this.submitBtn.disabled = false;
        }, 1500);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Search Functionality
class SearchSystem {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.notifications = new NotificationSystem();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.search();
            }
        });
    }

    search() {
        const query = this.searchInput.value.trim();
        if (query) {
            this.notifications.show(`Searching for "${query}" 🔍`, 'info');
            // In a real app, this would filter products or redirect to search results
            this.searchInput.value = '';
        }
    }
}

// Mobile Menu Class
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.isOpen = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.menuBtn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const notifications = new NotificationSystem();

        if (this.isOpen) {
            notifications.show('Mobile menu opened 📱', 'info', 2000);
            // In a real app, this would show/hide a mobile menu
        }

        this.isOpen = false; // Reset for demo
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item')) {
                // Simulate navigation
                const notifications = new NotificationSystem();
                notifications.show(`Navigating to ${e.target.textContent.trim()} 🌸`, 'info');
            }
        });
    }
}

// Image Lazy Loading
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }
}

// Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.category-card, .product-card');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroCarousel();
    new ProductGrid();
    new Newsletter();
    new SearchSystem();
    new MobileMenu();
    new SmoothScroll();
    new LazyLoader();
    new ScrollAnimations();

    // Add some interactive effects
    addInteractiveEffects();

    console.log('🌸 AnimeMarket initialized successfully!');
});

// Additional interactive effects
function addInteractiveEffects() {
    // Hover effects for buttons
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('no-hover')) {
            e.target.style.transform = 'scale(1.05)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.style.transform = '';
        }
    });

    // Add floating animation to certain elements
    const floatingElements = document.querySelectorAll('.torii-gate, .paper-scroll h2');
    floatingElements.forEach(el => {
        el.classList.add('floating');
    });

    // Easter egg: Konami Code
    let konamiCode = [];
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > sequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === sequence.join(',')) {
            const notifications = new NotificationSystem();
            notifications.show('🎉 Konami Code activated! Hidden anime mode unlocked! 🌸✨', 'success', 5000);
            document.body.style.filter = 'hue-rotate(45deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 10000);
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    // Responsive adjustments
    if (window.innerWidth < 768) {
        // Mobile specific code
        console.log('Mobile view active');
    }
});

// Handle scroll events for parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.sakura-animation');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

const fider = document.getElementById('scroll-search')
const icon_find = document.getElementById('search-icon')
fider.addEventListener('focusin', () => {
    fider.style.border = 'white';
    fider.style.boxShadow = 'none';
    fider.style.background = 'white';
    icon_find.style.left = '100%';
})

fider.addEventListener('focusout', () => {
    fider.style.border = '2px solid #ffd1dc'
    fider.style.boxShadow = '0 6px 20px rgba(255, 182, 193, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.6);';
    icon_find.style.left = '90%';
    fider.style.background = 'linear-gradient(to bottom, #ffffff, #fffafb)'
})

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.sakura-animation');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});



class SakuraPetals {
    constructor() {
        this.container = null;
        this.petals = [];
        this.maxPetals = 30;
        this.creationInterval = null;

        this.init();
    }

    init() {
        this.createContainer();
        this.startCreatingPetals();
        this.setupResizeHandler();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'sakura-container';
        document.body.appendChild(this.container);
    }

    createPetal() {
        if (this.petals.length >= this.maxPetals) {
            this.removeOldestPetal();
        }

        const petal = document.createElement('div');
        petal.className = 'sakura-petal';

        // Random properties
        const petalType = Math.floor(Math.random() * 5) + 1;
        const size = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
        const animationType = [
            'sakura-fall',
            'sakura-fall-left',
            'sakura-fall-zigzag',
            'sakura-float'
        ][Math.floor(Math.random() * 4)];

        const delay = Math.floor(Math.random() * 8);

        petal.classList.add(`petal-${petalType}`, size, animationType, `delay-${delay}`);
        petal.innerHTML = '🌸';

        // Random position
        const left = Math.random() * 100;
        petal.style.left = `${left}vw`;

        // Random start position for falling petals
        if (animationType.includes('fall')) {
            petal.style.top = `${-50 - Math.random() * 50}px`;
        } else {
            petal.style.top = `${Math.random() * 100}vh`;
        }

        this.container.appendChild(petal);
        this.petals.push(petal);

        // Remove petal after animation completes
        const duration = animationType.includes('float') ? 15000 :
                        animationType.includes('zigzag') ? 12000 : 10000;

        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
                this.petals = this.petals.filter(p => p !== petal);
            }
        }, duration + (delay * 1000));
    }

    removeOldestPetal() {
        if (this.petals.length > 0) {
            const oldestPetal = this.petals.shift();
            if (oldestPetal.parentNode) {
                oldestPetal.parentNode.removeChild(oldestPetal);
            }
        }
    }

    startCreatingPetals() {
        // Create initial petals
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.createPetal(), i * 300);
        }

        // Continue creating petals at intervals
        this.creationInterval = setInterval(() => {
            if (this.petals.length < this.maxPetals) {
                this.createPetal();
            }
        }, 800);
    }

    stopCreatingPetals() {
        if (this.creationInterval) {
            clearInterval(this.creationInterval);
        }
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.adjustPetalsForResize();
            }, 250);
        });
    }

    adjustPetalsForResize() {
        // Recalculate positions on resize if needed
        this.petals.forEach(petal => {
            if (petal.style.left.includes('vw')) {
                const leftValue = parseFloat(petal.style.left);
                petal.style.left = `${leftValue}vw`;
            }
        });
    }

    destroy() {
        this.stopCreatingPetals();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.petals = [];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sakuraPetals = new SakuraPetals();
});

// Optional: Control methods
window.sakuraControls = {
    start: function() {
        if (!window.sakuraPetals) {
            window.sakuraPetals = new SakuraPetals();
        } else {
            window.sakuraPetals.startCreatingPetals();
        }
    },
    stop: function() {
        if (window.sakuraPetals) {
            window.sakuraPetals.stopCreatingPetals();
        }
    },
    destroy: function() {
        if (window.sakuraPetals) {
            window.sakuraPetals.destroy();
            window.sakuraPetals = null;
        }
    }
};