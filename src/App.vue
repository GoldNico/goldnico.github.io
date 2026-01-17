<template>
  <div class="dynamic-background" ref="background">
    <div class="profile-card">
      <div class="card-left">
        <a href="https://github.com/GoldNico" target="_blank" rel="noopener noreferrer" class="avatar-link">
          <div class="avatar">
            <img src="https://github.com/GoldNico.png" alt="个人头像">
          </div>
        </a>
      </div>
      <div class="card-divider"></div>
      <div class="card-right">
        <ul class="profile-list">
          <li>系统架构师 / 运维开发工程师 / Python程序员</li>
          <li>AIGC 学习者</li>
          <li>团队管理学习者</li>
        </ul>
      </div>
    </div>
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
.profile-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  width: 800px;
  max-width: 90vw;
  height: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 2px 4px rgba(255, 255, 255, 0.15),
              inset 0 -2px 4px rgba(0, 0, 0, 0.15),
              inset 2px 0 4px rgba(0, 0, 0, 0.1),
              inset -2px 0 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.card-left {
  width: 36%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.5);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.avatar:hover img {
  transform: scale(1.05);
}

.avatar-link {
  display: inline-block;
  text-decoration: none;
  border: none;
  outline: none;
}

.avatar-link:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.card-divider {
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent, 
    rgba(0, 0, 0, 0.4), 
    rgba(255, 255, 255, 0.3), 
    rgba(0, 0, 0, 0.4), 
    transparent);
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2),
              0 0 8px rgba(0, 0, 0, 0.3);
}

.card-right {
  width: 67%;
  display: flex;
  align-items: center;
  padding: 40px;
}

.profile-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.profile-list li {
  font-size: 1.1rem;
  color: white;
  margin-bottom: 30px;
  padding: 15px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-list li:hover {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    height: auto;
    width: 80vw;
    max-width: 85%;
    padding: 15px;
  }
  
  .card-left, .card-right {
    width: 100%;
  }
  
  .card-left {
    padding: 15px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .card-divider {
    width: 100%;
    height: 2px;
    margin: 10px 0;
  }
  
  .card-right {
    padding: 15px;
  }
  
  .profile-list li {
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 10px 14px;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}

@media (max-width: 480px) {
  .profile-card {
    width: 85vw;
    max-width: 90%;
    padding: 12px;
  }
  
  .card-left {
    padding: 12px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .card-right {
    padding: 12px;
  }
  
  .profile-list li {
    font-size: 0.8rem;
    margin-bottom: 10px;
    padding: 8px 12px;
  }
}

@media (max-width: 320px) {
  .profile-card {
    width: 90vw;
    max-width: 95%;
    padding: 10px;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
  }
  
  .profile-list li {
    font-size: 0.75rem;
    margin-bottom: 8px;
    padding: 6px 10px;
  }
}
</style>
