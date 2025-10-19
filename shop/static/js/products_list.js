// Products Page Functionality
class ProductsPage {
    constructor() {
        this.currentCategory = null;
        this.products = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCategoryNavigation();
        this.setupProductHoverEffects();
        this.setupResponsiveBehavior();
    }

    setupEventListeners() {
        // Smooth scrolling for category links
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryClick(e.target.closest('a'));
            });
        });

        // Product card interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-card')) {
                this.handleProductClick(e);
            }
        });
    }

    setupCategoryNavigation() {
        // Highlight current category
        const currentPath = window.location.pathname;
        document.querySelectorAll('.category-link').forEach(link => {
            if (link.href.includes(currentPath)) {
                link.closest('.category-item').classList.add('selected');
                this.currentCategory = link.textContent.trim();
            }
        });
    }

    setupProductHoverEffects() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProductCard(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateProductCard(card, false);
            });
        });
    }

    animateProductCard(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 50px rgba(255, 182, 193, 0.35)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 35px rgba(255, 182, 193, 0.2)';
        }
    }

    handleCategoryClick(link) {
        const categoryItem = link.closest('.category-item');

        // Remove selection from all categories
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Add selection to clicked category
        categoryItem.classList.add('selected');

        // Show loading state
        this.showLoading();

        // Navigate to category (simulate with timeout for demo)
        setTimeout(() => {
            window.location.href = link.href;
        }, 500);
    }

    handleProductClick(event) {
        const productCard = event.target.closest('.product-card');
        const productLink = productCard.querySelector('a');

        if (productLink && !event.target.closest('.product-link')) {
            event.preventDefault();

            // Add click animation
            productCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                productCard.style.transform = '';
                window.location.href = productLink.href;
            }, 150);
        }
    }

    showLoading() {
        const mainContent = document.querySelector('.products-main');
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;

        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        mainContent.style.position = 'relative';
        mainContent.appendChild(loader);

        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 2000);
    }

    setupResponsiveBehavior() {
        // Handle mobile menu for categories
        this.setupMobileCategoryMenu();

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    setupMobileCategoryMenu() {
        if (window.innerWidth < 1024) {
            const sidebar = document.querySelector('.products-sidebar');
            const categoryList = document.querySelector('.category-list');

            // Create mobile toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-category-toggle';
            toggleBtn.innerHTML = '📁 Categories';
            toggleBtn.style.cssText = `
                display: block;
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #ff6b93 0%, #ff85a1 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                margin-bottom: 15px;
                cursor: pointer;
            `;

            sidebar.insertBefore(toggleBtn, categoryList);

            // Toggle categories on mobile
            toggleBtn.addEventListener('click', () => {
                categoryList.style.display = categoryList.style.display === 'none' ? 'block' : 'none';
            });

            // Hide categories initially on mobile
            categoryList.style.display = 'none';
        }
    }

    handleResize() {
        const categoryList = document.querySelector('.category-list');
        const toggleBtn = document.querySelector('.mobile-category-toggle');

        if (window.innerWidth < 1024) {
            if (!toggleBtn) {
                this.setupMobileCategoryMenu();
            }
        } else {
            if (toggleBtn) {
                toggleBtn.remove();
            }
            if (categoryList) {
                categoryList.style.display = 'block';
            }
        }
    }

    // Filter products (if needed for future functionality)
    filterProducts(categorySlug) {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            if (!categorySlug || productCategory === categorySlug) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();

    // Add additional styling for loading spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-spinner {
            text-align: center;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #ffd1dc;
            border-top: 4px solid #ff6b93;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }

        .loading-spinner p {
            color: #ff6b93;
            font-weight: 600;
        }

        /* Mobile category toggle animation */
        .category-list {
            transition: all 0.3s ease;
        }

        @media (max-width: 1024px) {
            .category-list {
                max-height: 0;
                overflow: hidden;
            }

            .category-list.show {
                max-height: 500px;
            }
        }
    `;
    document.head.appendChild(style);
});