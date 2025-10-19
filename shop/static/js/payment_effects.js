document.addEventListener('DOMContentLoaded', function() {
    // Particle effect
    const particlesContainer = document.getElementById('payment-particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        particlesContainer.appendChild(particle);

        // Animation
        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: particle.style.opacity },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        animation.onfinish = () => {
            particle.remove();
            createParticle();
        };
    }

    // Button hover effect
    const payButton = document.getElementById('sao-pay-button');
    payButton.addEventListener('click', function() {
        this.classList.add('processing');
        setTimeout(() => {
            this.classList.remove('processing');
        }, 2000);
    });
});