class DynamicBackground {
    constructor() {
        this.background = document.querySelector('.dynamic-background');
        this.particles = [];
        this.initialParticleCount = 10;
        this.animationId = null;
        this.generationInterval = null;
        this.screenArea = this.calculateScreenArea();
        
        this.init();
    }
    
    init() {
        this.createInitialParticles();
        this.animateParticles();
        this.setupEventListeners();
        this.startBatchGeneration();
    }
    
    calculateScreenArea() {
        // Get screen dimensions in pixels and convert to square centimeters
        const widthCm = window.innerWidth / window.devicePixelRatio / 96 * 2.54;
        const heightCm = window.innerHeight / window.devicePixelRatio / 96 * 2.54;
        return widthCm * heightCm;
    }
    
    calculateBatchSize() {
        // 8 particles for every 20 square centimeters
        return Math.floor(this.screenArea / 20 * 8);
    }
    
    createInitialParticles() {
        for (let i = 0; i < this.initialParticleCount; i++) {
            this.createAndAddParticle();
        }
    }
    
    createAndAddParticle() {
        const particle = this.createParticle();
        this.particles.push(particle);
        this.background.appendChild(particle.element);
    }
    
    createParticle() {
        const element = document.createElement('div');
        element.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 6;
        const duration = Math.random() * 4 + 4;
        const lifespan = Math.random() * 5 + 3; // 3-8 seconds
        const birthTime = Date.now();
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        return {
            element,
            size,
            x,
            y,
            delay,
            duration,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            lifespan,
            birthTime
        };
    }
    
    animateParticles() {
        const currentTime = Date.now();
        
        // Filter out expired particles and update remaining ones
        this.particles = this.particles.filter(particle => {
            const age = (currentTime - particle.birthTime) / 1000;
            
            if (age > particle.lifespan) {
                this.background.removeChild(particle.element);
                return false;
            }
            
            // Calculate shrink factor for particles near end of life
            const lifePercentage = age / particle.lifespan;
            let currentSize = particle.size;
            
            // Start shrinking when particle has 20% life remaining
            if (lifePercentage > 0.8) {
                const shrinkFactor = 1 - (lifePercentage - 0.8) * 5;
                currentSize = particle.size * shrinkFactor;
            }
            
            // Update particle position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < -currentSize) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = -currentSize;
            if (particle.y < -currentSize) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = -currentSize;
            
            // Apply changes to DOM
            particle.element.style.width = `${currentSize}px`;
            particle.element.style.height = `${currentSize}px`;
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            
            return true;
        });
        
        this.animationId = requestAnimationFrame(() => this.animateParticles());
    }
    
    startBatchGeneration() {
        this.generationInterval = setInterval(() => {
            const batchSize = this.calculateBatchSize();
            const particlesPerFrame = batchSize / 150; // 150 frames in 5 seconds (at 30fps)
            let particlesToGenerate = batchSize;
            
            const frameInterval = setInterval(() => {
                const count = Math.min(Math.ceil(particlesPerFrame), particlesToGenerate);
                for (let i = 0; i < count; i++) {
                    this.createAndAddParticle();
                }
                particlesToGenerate -= count;
                
                if (particlesToGenerate <= 0) {
                    clearInterval(frameInterval);
                }
            }, 33); // ~30fps
        }, 5000); // Every 5 seconds
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.screenArea = this.calculateScreenArea();
            
            this.particles.forEach(particle => {
                particle.x = Math.min(particle.x, window.innerWidth);
                particle.y = Math.min(particle.y, window.innerHeight);
            });
        });
    }
}

// Initialize the dynamic background when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DynamicBackground();
});