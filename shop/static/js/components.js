// Lucide Icons as SVG strings
const ICONS = {
    search: `<svg class="lucide lucide-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    shoppingCart: `<svg class="lucide lucide-shopping-cart" viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L23 6H6"/></svg>`,
    menu: `<svg class="lucide lucide-menu" viewBox="0 0 24 24"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    package: `<svg class="lucide lucide-package" viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    zap: `<svg class="lucide lucide-zap" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>`,
    star: `<svg class="lucide lucide-star" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>`,
    tag: `<svg class="lucide lucide-tag" viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.828 8.828a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
    chevronLeft: `<svg class="lucide lucide-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>`,
    chevronRight: `<svg class="lucide lucide-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`,
    heart: `<svg class="lucide lucide-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
    </svg>`
};

// Navigation Component
function createNavigation() {
    return `
        <nav class="bg-pure-white border-b-2 border-sakura-pink shadow-lg relative">
            <!-- Decorative wave pattern -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sakura-pink via-light-sakura to-sakura-pink"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo with torii gate inspiration -->
                    <div class="flex items-center space-x-2">
                        <div class="torii-gate px-4 py-2 bg-gradient-to-r from-sakura-pink to-light-sakura rounded-lg">
                            <h1 class="text-white font-bold">🌸 AnimeMarket</h1>
                        </div>
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-6">
                        <button class="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-light-sakura transition-colors group">
                            <span class="text-sakura-pink group-hover:text-sakura-pink">${ICONS.package}</span>
                            <span class="text-gray-700 group-hover:text-gray-900">Shop Categories</span>
                        </button>
                        <button class="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-light-sakura transition-colors group">
                            <span class="text-sakura-pink group-hover:text-sakura-pink">${ICONS.zap}</span>
                            <span class="text-gray-700 group-hover:text-gray-900">New Arrivals</span>
                        </button>
                        <button class="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-light-sakura transition-colors group">
                            <span class="text-sakura-pink group-hover:text-sakura-pink">${ICONS.star}</span>
                            <span class="text-gray-700 group-hover:text-gray-900">Best Sellers</span>
                        </button>
                        <button class="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-light-sakura transition-colors group">
                            <span class="text-sakura-pink group-hover:text-sakura-pink">${ICONS.tag}</span>
                            <span class="text-gray-700 group-hover:text-gray-900">Sale</span>
                        </button>
                    </div>

                    <!-- Search Bar with Paper Scroll Design -->
                    <div class="flex-1 max-w-md mx-8 hidden md:block">
                        <div class="relative paper-scroll">
                            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-sakura-pink w-4 h-4">
                                ${ICONS.search}
                            </div>
                            <input
                                type="text"
                                placeholder="Search for anime treasures..."
                                class="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-sakura-pink rounded-lg"
                            />
                        </div>
                    </div>

                    <!-- Cart and Mobile Menu -->
                    <div class="flex items-center space-x-4">
                        <button class="relative p-2 hover:bg-light-sakura rounded-full transition-colors">
                            <div class="w-5 h-5 text-sakura-pink">${ICONS.shoppingCart}</div>
                            <span class="absolute -top-1 -right-1 bg-sakura-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                3
                            </span>
                        </button>
                        <button class="md:hidden p-2">
                            <div class="w-5 h-5 text-sakura-pink">${ICONS.menu}</div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Floating sakura petals -->
            <div class="absolute top-2 left-20 text-sakura-pink opacity-50 sakura-animation">🌸</div>
            <div class="absolute top-4 right-32 text-light-sakura opacity-60 sakura-animation" style="animation-delay: 2s;">🌸</div>
            <div class="absolute top-1 right-64 text-sakura-pink opacity-40 sakura-animation" style="animation-delay: 4s;">🌸</div>
        </nav>
    `;
}

// Hero Banner Component
function createHeroBanner() {
    const slides = [
        {
            id: 1,
            title: "New Anime Collection",
            subtitle: "Discover the latest releases",
            buttonText: "Shop Now",
            bgGradient: "from-sakura-pink via-light-sakura to-pure-white"
        },
        {
            id: 2,
            title: "Limited Edition Figures",
            subtitle: "Exclusive collectibles available",
            buttonText: "Explore",
            bgGradient: "from-light-sakura via-pure-white to-sakura-pink"
        },
        {
            id: 3,
            title: "Spring Sale",
            subtitle: "Up to 50% off selected items",
            buttonText: "Save Now",
            bgGradient: "from-pure-white via-sakura-pink to-light-sakura"
        }
    ];

    const slidesHTML = slides.map((slide, index) => `
        <div class="hero-slide absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-transform duration-500 ease-in-out ${index === 0 ? 'translate-x-0' : 'translate-x-full'}" data-slide="${index}">
            <div class="flex items-center justify-between h-full px-8 lg:px-16">
                <!-- Text Content -->
                <div class="flex-1 space-y-4">
                    <h2 class="text-4xl lg:text-6xl text-gray-800 drop-shadow-lg">
                        ${slide.title}
                    </h2>
                    <p class="text-xl lg:text-2xl text-gray-600">
                        ${slide.subtitle}
                    </p>
                    <button class="bg-sakura-pink hover:bg-sakura-pink/90 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all">
                        ${slide.buttonText}
                    </button>
                </div>

                <!-- Decorative Elements -->
                <div class="hidden lg:block flex-1 relative">
                    <div class="absolute top-10 right-20 text-6xl opacity-30 wave-pattern">🌸</div>
                    <div class="absolute top-32 right-32 text-4xl opacity-40 wave-pattern" style="animation-delay: 1s;">🎌</div>
                    <div class="absolute top-20 right-8 text-5xl opacity-35 wave-pattern" style="animation-delay: 2s;">⛩️</div>
                    <div class="absolute bottom-20 right-16 text-3xl opacity-50 sakura-animation">🌸</div>
                    <div class="absolute bottom-32 right-40 text-2xl opacity-40 sakura-animation" style="animation-delay: 3s;">🌸</div>
                </div>
            </div>

            <!-- Wave Pattern Overlay -->
            <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/20 to-transparent">
                <svg class="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
                        fill="rgba(255,182,193,0.1)" 
                        class="wave-pattern"
                    />
                </svg>
            </div>
        </div>
    `).join('');

    const indicators = slides.map((_, index) => `
        <button
            class="slide-indicator w-3 h-3 rounded-full transition-colors ${index === 0 ? 'bg-sakura-pink' : 'bg-white/50'}"
            data-slide="${index}"
        ></button>
    `).join('');

    return `
        <div class="relative h-96 overflow-hidden rounded-xl mx-4 my-6 shadow-2xl" id="hero-carousel">
            ${slidesHTML}

            <!-- Navigation Arrows -->
            <button id="prev-slide" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg p-2">
                ${ICONS.chevronLeft}
            </button>
            <button id="next-slide" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg p-2">
                ${ICONS.chevronRight}
            </button>

            <!-- Slide Indicators -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                ${indicators}
            </div>
        </div>
    `;
}

// Category Section Component
function createCategorySection() {
    const categories = [
        {
            id: 1,
            name: "Figures & Collectibles",
            description: "Premium anime figures",
            image: "https://images.unsplash.com/photo-1720630351963-93567f7a746d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZpZ3VyaW5lJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTYwNTg1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: "🎭"
        },
        {
            id: 2,
            name: "Manga & Light Novels",
            description: "Latest manga releases",
            image: "https://images.unsplash.com/photo-1666153184660-a09d73e5b755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGJvb2tzJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTYwNTg1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: "📚"
        },
        {
            id: 3,
            name: "Apparel & Cosplay",
            description: "Authentic anime clothing",
            image: "https://images.unsplash.com/photo-1660563534620-adc8eb1e4b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNsb3RoaW5nJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTYwNTg1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: "👘"
        },
        {
            id: 4,
            name: "Gaming & Tech",
            description: "Anime gaming gear",
            image: "https://images.unsplash.com/photo-1631755217310-cd2592db1100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2Nlc3NvcmllcyUyMHNldHVwfGVufDF8fHx8MTc1NjA1ODUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: "🎮"
        }
    ];

    const categoryCards = categories.map(category => `
        <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
            <!-- Background Image -->
            <div class="aspect-square relative">
                <img
                    src="${category.image}"
                    alt="${category.name}"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZCNkMxIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4K'"
                />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <!-- Floating Icon -->
                <div class="absolute top-4 right-4 text-3xl bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:scale-110 transition-transform">
                    ${category.icon}
                </div>
            </div>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl mb-2 group-hover:text-light-sakura transition-colors">
                    ${category.name}
                </h3>
                <p class="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    ${category.description}
                </p>
            </div>

            <!-- Hover Border Effect -->
            <div class="absolute inset-0 border-2 border-transparent group-hover:border-sakura-pink rounded-2xl transition-colors"></div>

            <!-- Sakura petals on hover -->
            <div class="absolute top-2 left-2 text-sakura-pink opacity-0 group-hover:opacity-70 transition-opacity sakura-animation">🌸</div>
            <div class="absolute top-8 left-8 text-light-sakura opacity-0 group-hover:opacity-50 transition-opacity sakura-animation" style="animation-delay: 1s;">🌸</div>
        </div>
    `).join('');

    return `
        <section class="py-16 px-4 bg-gradient-to-b from-pure-white to-soft-gray">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header with Japanese-inspired styling -->
                <div class="text-center mb-12 relative">
                    <div class="inline-block paper-scroll px-8 py-4 mb-4">
                        <h2 class="text-3xl text-gray-800">Shop by Category</h2>
                        <p class="text-gray-600 mt-2">Discover your passion</p>
                    </div>
                    
                    <!-- Decorative elements -->
                    <div class="absolute top-0 left-1/4 text-2xl opacity-30 sakura-animation">🌸</div>
                    <div class="absolute top-4 right-1/4 text-2xl opacity-30 sakura-animation" style="animation-delay: 2s;">🌸</div>
                </div>

                <!-- Categories Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${categoryCards}
                </div>

                <!-- Wave pattern decoration -->
                <div class="mt-16 relative">
                    <svg class="w-full h-16 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path 
                            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
                            fill="url(#waveGradient)" 
                            class="wave-pattern"
                        />
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#FFB6C1" />
                                <stop offset="50%" stop-color="#FFD1DC" />
                                <stop offset="100%" stop-color="#FFB6C1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    `;
}

// Product Grid Component
function createProductGrid() {
    const products = [
        {
            id: 1,
            name: "Premium Anime Figure",
            price: 89.99,
            originalPrice: 119.99,
            rating: 4.8,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZpZ3VyZSUyMGNvbGxlY3RpYmxlfGVufDF8fHx8MTc1NjAzODgyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            image: "https://images.unsplash.com/photo-1747547766819-a6a25384a41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRveSUyMHJvYm90fGVufDF8fHx8MTc1NjA1ODU1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            image: "https://images.unsplash.com/photo-1751559203073-2027dd23246b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVzaGllJTIwdG95JTIwY3V0ZXxlbnwxfHx8fDE3NTYwNTg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            image: "https://images.unsplash.com/photo-1662826321315-c72a74f871c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGthdGFuYSUyMHN3b3JkfGVufDF8fHx8MTc1NjA1ODU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            image: "https://images.unsplash.com/photo-1741294830180-4bfbd8ca2c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1lcmNoYW5kaXNlJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzU2MDU4NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
            image: "https://images.unsplash.com/photo-1569793667639-dae11573b34f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFydCUyMHBvc3RlcnxlbnwxfHx8fDE3NTYwNTg1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            isNew: true,
            isSale: false
        }
    ];

    const createStars = (rating) => {
        return Array.from({length: 5}, (_, i) => 
            `<span class="w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}">${ICONS.star}</span>`
        ).join('');
    };

    const productCards = products.map(product => `
        <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-sakura-pink/20">
            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZCNkMxIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4K'"
                />
                
                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-col gap-2">
                    ${product.isNew ? '<span class="bg-sakura-pink text-white px-2 py-1 text-xs rounded-full">NEW 🌟</span>' : ''}
                    ${product.isSale ? '<span class="bg-red-500 text-white px-2 py-1 text-xs rounded-full">SALE 🔥</span>' : ''}
                </div>

                <!-- Wishlist Button -->
                <button class="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="w-4 h-4 text-sakura-pink">${ICONS.heart}</div>
                </button>

                <!-- Quick Add to Cart - appears on hover -->
                <div class="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="w-full bg-sakura-pink hover:bg-sakura-pink/90 text-white rounded-full shadow-lg px-4 py-2 flex items-center justify-center gap-2">
                        <div class="w-4 h-4">${ICONS.shoppingCart}</div>
                        Quick Add
                    </button>
                </div>
            </div>

            <!-- Product Info -->
            <div class="p-6">
                <h3 class="text-lg mb-2 group-hover:text-sakura-pink transition-colors">
                    ${product.name}
                </h3>
                
                <!-- Rating -->
                <div class="flex items-center gap-1 mb-3">
                    <div class="flex items-center">
                        ${createStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-600">
                        ${product.rating} (${product.reviews})
                    </span>
                </div>

                <!-- Price -->
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-xl text-sakura-pink">
                        $${product.price}
                    </span>
                    ${product.originalPrice ? `<span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>` : ''}
                </div>

                <!-- Add to Cart Button -->
                <button class="w-full bg-gradient-to-r from-light-sakura to-sakura-pink hover:from-light-sakura/90 hover:to-sakura-pink/90 text-gray-800 rounded-full transform hover:scale-105 transition-all px-4 py-2">
                    Add to Cart 🛒
                </button>
            </div>

            <!-- Decorative border on hover -->
            <div class="absolute inset-0 border-2 border-transparent group-hover:border-sakura-pink/50 rounded-2xl transition-colors pointer-events-none"></div>
        </div>
    `).join('');

    return `
        <section class="py-16 px-4 bg-pure-white">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-12 relative">
                    <div class="inline-block paper-scroll px-8 py-4 mb-4">
                        <h2 class="text-3xl text-gray-800">Featured Products</h2>
                        <p class="text-gray-600 mt-2">Handpicked anime treasures</p>
                    </div>
                    
                    <!-- Decorative sakura -->
                    <div class="absolute top-2 left-1/3 text-xl opacity-40 sakura-animation">🌸</div>
                    <div class="absolute top-6 right-1/3 text-xl opacity-40 sakura-animation" style="animation-delay: 3s;">🌸</div>
                </div>

                <!-- Products Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${productCards}
                </div>

                <!-- View All Button -->
                <div class="text-center mt-12">
                    <button class="bg-gradient-to-r from-sakura-pink to-light-sakura hover:from-sakura-pink/90 hover:to-light-sakura/90 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all">
                        View All Products 🌸
                    </button>
                </div>
            </div>
        </section>
    `;
}