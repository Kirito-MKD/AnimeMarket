class NewsCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.carousel = this.container.querySelector('.news-carousel');
        this.cards = this.container.querySelectorAll('.news-card');
        this.prevBtn = this.container.querySelector('.carousel-prev');
        this.nextBtn = this.container.querySelector('.carousel-next');
        this.indicators = this.container.querySelectorAll('.carousel-indicator');

        this.currentIndex = 0;
        this.cardWidth = 350 + 25; // Width + gap
        this.autoPlayInterval = null;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.cloneCardsForInfinite();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateIndicators();
        this.updateCarousel();
    }

    cloneCardsForInfinite() {
        // Клонируем первые и последние карточки для бесконечного эффекта
        const firstClone = this.cards[0].cloneNode(true);
        const lastClone = this.cards[this.cards.length - 1].cloneNode(true);

        firstClone.classList.add('cloned');
        lastClone.classList.add('cloned');

        this.carousel.appendChild(firstClone);
        this.carousel.insertBefore(lastClone, this.cards[0]);

        // Обновляем коллекцию карточек
        this.cards = this.carousel.querySelectorAll('.news-card');
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch events for mobile
        let startX, endX;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
            this.startAutoPlay();
        });

        // Mouse events for desktop
        this.carousel.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            this.stopAutoPlay();
        });

        this.carousel.addEventListener('mouseup', (e) => {
            endX = e.clientX;
            this.handleSwipe();
            this.startAutoPlay();
        });

        // Transition end event для бесконечной прокрутки
        this.carousel.addEventListener('transitionend', () => {
            this.handleTransitionEnd();
        });
    }

    handleTransitionEnd() {
        this.isAnimating = false;

        // Если достигли клонированной первой карточки (в начале)
        if (this.currentIndex === 0) {
            this.carousel.style.transition = 'none';
            this.currentIndex = this.cards.length - 2; // Переходим к последней оригинальной карточке
            this.updateCarousel();

            // Восстанавливаем transition после обновления позиции
            setTimeout(() => {
                this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
        // Если достигли клонированной последней карточки (в конце)
        else if (this.currentIndex === this.cards.length - 1) {
            this.carousel.style.transition = 'none';
            this.currentIndex = 1; // Переходим к первой оригинальной карточке
            this.updateCarousel();

            setTimeout(() => {
                this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
    }

    handleSwipe() {
        if (this.isAnimating) return;

        const diff = startX - endX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex--;
        this.updateCarousel();
        this.updateIndicators();
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex++;
        this.updateCarousel();
        this.updateIndicators();
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = index + 1; // +1 потому что добавили клонированную карточку в начале
        this.updateCarousel();
        this.updateIndicators();
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.cardWidth;
        this.carousel.style.transform = `translateX(${translateX}px)`;
    }

    updateIndicators() {
        let visibleIndex = this.currentIndex;

        // Корректируем индекс для индикаторов
        if (this.currentIndex === 0) {
            visibleIndex = this.cards.length - 3;
        } else if (this.currentIndex === this.cards.length - 1) {
            visibleIndex = 0;
        } else {
            visibleIndex = this.currentIndex - 1;
        }

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === visibleIndex);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Метод для обновления при изменении размера окна
    handleResize() {
        this.cardWidth = this.cards[0].offsetWidth + 25; // Width + gap
        this.updateCarousel();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new NewsCarousel('news-carousel-container');

    // Обработчик изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            carousel.handleResize();
        }, 250);
    });
});