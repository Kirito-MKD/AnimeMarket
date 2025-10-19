

// Wave Button Smooth Animation


class WaveButton {
    constructor(button) {
        this.button = button;
        this.waveElement = null;
        this.isHovering = false;
        this.animation = null;

        this.init();
    }

    init() {
        this.createWaveElement();
        this.setupEventListeners();
    }

    createWaveElement() {
        this.waveElement = document.createElement('div');
        this.waveElement.className = 'wave-btn-wave';
        this.waveElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.3) 100%);
            clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
            opacity: 0;
            transition: opacity 0.8s ease, clip-path 1.2s ease;
            z-index: 2;
            pointer-events: none;
        `;
        this.button.appendChild(this.waveElement);
    }

    setupEventListeners() {
        this.button.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.button.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.button.addEventListener('click', (e) => this.createRipple(e));

        // Touch events
        this.button.addEventListener('touchstart', (e) => {
            this.handleMouseEnter();
            this.createRipple(e);
            e.preventDefault();
        }, { passive: false });

        this.button.addEventListener('touchend', () => {
            setTimeout(() => this.handleMouseLeave(), 500);
        });
    }

    handleMouseEnter() {
        if (this.isHovering) return;
        this.isHovering = true;

        // Плавное появление волны
        this.waveElement.style.opacity = '1';

        // Плавная анимация волны
        setTimeout(() => {
            if (this.isHovering) {
                this.waveElement.style.clipPath = this.generateWavePath(0);
                this.startWaveAnimation();
            }
        }, 50);
    }

    handleMouseLeave() {
        if (!this.isHovering) return;
        this.isHovering = false;

        // Плавное исчезновение волны
        this.waveElement.style.opacity = '0';

        // Останавливаем анимацию
        if (this.animation) {
            cancelAnimationFrame(this.animation);
            this.animation = null;
        }

        // Плавно скрываем волну
        setTimeout(() => {
            if (!this.isHovering) {
                this.waveElement.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
            }
        }, 300);
    }

    generateWavePath(phase) {
        const points = [];
        const segments = 8;
        const amplitude = 15; // Высота волны
        const baseHeight = 60; // Базовая высота

        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * 100;
            const angle = (i / segments) * Math.PI * 2 + phase;
            const y = baseHeight + Math.sin(angle) * amplitude;
            points.push(`${x}% ${y}%`);
        }

        points.push('100% 100%', '0% 100%');
        return `polygon(${points.join(', ')})`;
    }

    startWaveAnimation() {
        let phase = 0;
        const speed = 0.05;

        const animate = () => {
            if (!this.isHovering) return;

            phase += speed;
            this.waveElement.style.clipPath = this.generateWavePath(phase);

            this.animation = requestAnimationFrame(animate);
        };

        this.animation = requestAnimationFrame(animate);
    }

    createRipple(event) {
        const circle = document.createElement("span");
        const diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
        const radius = diameter / 2;

        // Получаем координаты касания/клика
        const clientX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
        const clientY = event.clientY || (event.touches && event.touches[0].clientY) || 0;

        const rect = this.button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clientX - rect.left - radius}px`;
        circle.style.top = `${clientY - rect.top - radius}px`;
        circle.classList.add("ripple");
        circle.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 3;
        `;

        const ripple = this.button.querySelector(".ripple");
        if (ripple) {
            ripple.remove();
        }

        this.button.appendChild(circle);

        // Удаляем ripple после анимации
        setTimeout(() => {
            if (circle.parentNode) {
                circle.parentNode.removeChild(circle);
            }
        }, 600);
    }
}

// Инициализация всех wave buttons
function initWaveButtons() {
    const waveButtons = document.querySelectorAll('.wave-btn');
    waveButtons.forEach(button => {
        new WaveButton(button);
    });
}

// CSS анимация для ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .wave-btn {
        position: relative;
        overflow: hidden;
    }

    /* Плавные переходы для кнопки */
    .wave-btn {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .wave-btn:hover {
        transform: translateY(-3px) scale(1.05);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .wave-btn-wave {
            transition: none !important;
            animation: none !important;
        }

        .ripple {
            animation: none !important;
        }

        .wave-btn:hover {
            transform: none;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Handle learn more click
function handleLearnMore() {
    const notifications = new NotificationSystem();
    notifications.show('Exploring more categories 🌸', 'info');

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Добавляем в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initWaveButtons();

    // Добавляем обработчики для существующих кнопок
    document.querySelectorAll('.wave-btn').forEach(btn => {
        btn.addEventListener('click', handleLearnMore);
    });
});