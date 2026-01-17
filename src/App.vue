<template>
  <div class="dynamic-background" ref="background">
    <slot class="content-container">
      <h1>动态背景演示</h1>
      <p>这是一个使用 Vue 3 和 CSS/JavaScript 创建的动态背景效果</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      particles: [],
      initialParticleCount: 10,
      animationId: null,
      generationInterval: null,
      screenArea: 0
    }
  },
  mounted() {
    this.screenArea = this.calculateScreenArea()
    this.createInitialParticles()
    this.animateParticles()
    this.setupEventListeners()
    this.startBatchGeneration()
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    calculateScreenArea() {
      const widthCm = window.innerWidth / window.devicePixelRatio / 96 * 2.54
      const heightCm = window.innerHeight / window.devicePixelRatio / 96 * 2.54
      return widthCm * heightCm
    },
    
    calculateBatchSize() {
      return Math.floor(this.screenArea / 20 * 8)
    },
    
    createInitialParticles() {
      for (let i = 0; i < this.initialParticleCount; i++) {
        this.createAndAddParticle()
      }
    },
    
    createAndAddParticle() {
      const particle = this.createParticle()
      this.particles.push(particle)
      this.$refs.background.appendChild(particle.element)
    },
    
    createParticle() {
      const element = document.createElement('div')
      element.classList.add('particle')
      
      const size = Math.random() * 6 + 2
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const delay = Math.random() * 6
      const duration = Math.random() * 4 + 4
      const lifespan = Math.random() * 5 + 3
      const birthTime = Date.now()
      
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      element.style.animationDelay = `${delay}s`
      element.style.animationDuration = `${duration}s`
      
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
      }
    },
    
    animateParticles() {
      const currentTime = Date.now()
      
      this.particles = this.particles.filter(particle => {
        const age = (currentTime - particle.birthTime) / 1000
        
        if (age > particle.lifespan) {
          this.$refs.background.removeChild(particle.element)
          return false
        }
        
        const lifePercentage = age / particle.lifespan
        let currentSize = particle.size
        
        if (lifePercentage > 0.8) {
          const shrinkFactor = 1 - (lifePercentage - 0.8) * 5
          currentSize = particle.size * shrinkFactor
        }
        
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < -currentSize) particle.x = window.innerWidth
        if (particle.x > window.innerWidth) particle.x = -currentSize
        if (particle.y < -currentSize) particle.y = window.innerHeight
        if (particle.y > window.innerHeight) particle.y = -currentSize
        
        particle.element.style.width = `${currentSize}px`
        particle.element.style.height = `${currentSize}px`
        particle.element.style.left = `${particle.x}px`
        particle.element.style.top = `${particle.y}px`
        
        return true
      })
      
      this.animationId = requestAnimationFrame(() => this.animateParticles())
    },
    
    startBatchGeneration() {
      this.generationInterval = setInterval(() => {
        const batchSize = this.calculateBatchSize()
        const particlesPerFrame = batchSize / 150
        let particlesToGenerate = batchSize
        
        const frameInterval = setInterval(() => {
          const count = Math.min(Math.ceil(particlesPerFrame), particlesToGenerate)
          for (let i = 0; i < count; i++) {
            this.createAndAddParticle()
          }
          particlesToGenerate -= count
          
          if (particlesToGenerate <= 0) {
            clearInterval(frameInterval)
          }
        }, 33)
      }, 5000)
    },
    
    setupEventListeners() {
      window.addEventListener('resize', () => {
        this.screenArea = this.calculateScreenArea()
        
        this.particles.forEach(particle => {
          particle.x = Math.min(particle.x, window.innerWidth)
          particle.y = Math.min(particle.y, window.innerHeight)
        })
      })
    },
    
    cleanup() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
      if (this.generationInterval) {
        clearInterval(this.generationInterval)
      }
    }
  }
}
</script>

<style scoped>
.content-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}
</style>
