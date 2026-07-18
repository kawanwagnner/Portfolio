import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { About } from '@/components/sections/About'
import { Founder } from '@/components/sections/Founder'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Support } from '@/components/sections/Support'
import { Immersive } from '@/components/sections/Immersive'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Founder />
      <Projects />
      <Services />
      <Support />
      <Immersive />
      <Contact />
    </>
  )
}
