document.addEventListener('DOMContentLoaded', function() {
    // Confetti particles effect
    const particlesContainer = document.getElementById('success-particles');
    const particleCount = 50;
    const colors = ['#64d8ff', '#00e676', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'success-particle';

        // Random properties
        const size = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const posX = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${posX}%`;
        particle.style.bottom = '0';
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        particlesContainer.appendChild(particle);

        // Animation
        const animation = particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
            { transform: `translateY(-100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });

        animation.onfinish = () => {
            particle.remove();
            createParticle();
        };
    }

    // Continue button hover effect
    const continueButton = document.querySelector('.sao-button');
    continueButton.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });

    continueButton.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
});