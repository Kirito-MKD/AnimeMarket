// Search Page JavaScript - Simplified Version

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize Search Page
function initializeSearchPage() {
    bindEventListeners();
    startAnimations();
}

function bindEventListeners() {
    // Real-time search suggestions (optional enhancement)
    const searchInput = document.getElementById('search-input-SEARCH');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleInputChange, 300));
    }
    
    // Pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination-btn-SEARCH:not(:disabled)');
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', handlePagination);
    });
    
    // Add smooth animations to detail buttons
    const detailButtons = document.querySelectorAll('.detail-btn-SEARCH');
    detailButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function startAnimations() {
    // Start floating animations
    const floatingItems = document.querySelectorAll('.floating-item-SEARCH, .floating-sakura-SEARCH, .empty-sakura-SEARCH');
    floatingItems.forEach((item, index) => {
        // Add slight variation to animations
        const delay = index * 0.5;
        item.style.animationDelay = `${delay}s`;
    });
}

function handleInputChange(e) {
    // Optional: Could add search suggestions here
    // For now, just track input for potential enhancements
    const query = e.target.value.trim();
    
    // Add visual feedback for typing
    if (query.length > 0) {
        e.target.style.background = '#fff9f9';
    } else {
        e.target.style.background = 'white';
    }
}

function handlePagination(e) {
    e.preventDefault();
    
    // Add click animation
    const button = e.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // In a real implementation, this would navigate to the next page
    // For now, just show a message
    console.log('Navigating to page:', button.dataset.page);
    
    // Simulate page transition
    const resultsContainer = document.querySelector('.results-container-SEARCH');
    if (resultsContainer) {
        resultsContainer.style.opacity = '0.7';
        setTimeout(() => {
            resultsContainer.style.opacity = '1';
        }, 300);
    }
}

// Add some interactive enhancements
function addInteractiveEffects() {
    // Add hover effects to result items
    const resultItems = document.querySelectorAll('.result-item-SEARCH');
    resultItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchPage();
    addInteractiveEffects();
    
    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .result-item-SEARCH,
        .detail-btn-SEARCH,
        .pagination-btn-SEARCH {
            transition: all 0.3s ease;
        }
        
        .search-input-SEARCH {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Handle form submission with visual feedback
const searchForm = document.getElementById('search-form-SEARCH');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        const searchBtn = this.querySelector('.search-btn-SEARCH');
        if (searchBtn) {
            // Add loading state to button
            const originalText = searchBtn.innerHTML;
            searchBtn.innerHTML = '<span class="search-icon-SEARCH">⏳</span><span class="search-text-SEARCH">Searching...</span>';
            searchBtn.disabled = true;
            
            // Reset after a short delay (in real implementation, this would be after the request)
            setTimeout(() => {
                searchBtn.innerHTML = originalText;
                searchBtn.disabled = false;
            }, 1000);
        }
    });
}