import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import particlesConfig from '../../particlesjs-config.json'

function ParticlesBackground() {
  const [ready, set_ready] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      set_ready(true)
    })
  }, [])

  const particles_loaded = (container) => {
    console.log(container)
  }

  const config = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: particlesConfig.interactivity.events.onclick.enable,
          mode: particlesConfig.interactivity.events.onclick.mode,
        },
        onHover: {
          enable: particlesConfig.interactivity.events.onhover.enable,
          mode: particlesConfig.interactivity.events.onhover.mode,
        },
        resize: particlesConfig.interactivity.events.resize,
      },
      modes: {
        push: {
          quantity: particlesConfig.interactivity.modes.push.particles_nb,
        },
        repulse: {
          distance: particlesConfig.interactivity.modes.repulse.distance,
          duration: particlesConfig.interactivity.modes.repulse.duration,
        },
      },
    },
          particles: {
        color: {
          value: "#00FFF7",
        },
        links: {
          color: "#C147E9",
          distance: particlesConfig.particles.line_linked.distance,
          enable: particlesConfig.particles.line_linked.enable,
          opacity: 0.4,
          width: particlesConfig.particles.line_linked.width,
        },
      move: {
        direction: particlesConfig.particles.move.direction,
        enable: particlesConfig.particles.move.enable,
        outModes: {
          default: "bounce",
        },
        random: particlesConfig.particles.move.random,
        speed: particlesConfig.particles.move.speed,
        straight: particlesConfig.particles.move.straight,
      },
      number: {
        density: {
          enable: particlesConfig.particles.number.density.enable,
          area: particlesConfig.particles.number.density.value_area,
        },
        value: particlesConfig.particles.number.value,
      },
              opacity: {
          value: 0.3,
        },
      shape: {
        type: particlesConfig.particles.shape.type,
      },
      size: {
        value: { min: 1, max: particlesConfig.particles.size.value },
      },
    },
    detectRetina: particlesConfig.retina_detect,
  }), [])

  if (ready) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particles_loaded}
        options={config}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10,
          pointerEvents: 'none'
        }}
      />
    )
  }

  return <></>
}

export default ParticlesBackground;