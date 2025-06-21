import { useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

function TypewriterHero() {
  const text_element = useRef(null)

  useEffect(() => {
    if (text_element.current) {
      const writer = new Typewriter(text_element.current, {
        loop: true,
        delay: 75,
        deleteSpeed: 50,
      })

      writer
        .typeString('Create Professional Courses with AI')
        .pauseFor(3000)
        .deleteAll()
        .typeString('Build Amazing Learning Experiences')
        .pauseFor(2500)
        .deleteAll()
        .typeString('Transform Your Expertise into Courses')
        .pauseFor(2500)
        .deleteAll()
        .typeString('Generate Course Content in Minutes')
        .pauseFor(2500)
        .deleteAll()
        .start()
    }
  }, [])

  return (
    <h1 className="heading-lg mb-6">
      <span ref={text_element}></span>
    </h1>
  )
}

export default TypewriterHero 