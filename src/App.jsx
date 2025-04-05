import './App.css'
import { MorphingText } from "@/components/magicui/morphing-text";
import {NavBar} from "@/components/ui/navbar"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Particles } from "@/components/magicui/particles";

const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
];

function App() {

  return (
    <>
    <div className="navbar">
      <NavBar />
    </div>

    <div className="hero-text">

      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-9xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Mock Mate
      </span>
      <div className="hero-text-subtitle">
        <p className="text-sm">
        Practice real-time interviews with an AI 
        that talks back. MockMate simulates voice-powered 
        interview conversations to help you gain confidence, 
        improve answers, and get hired.  
        </p>
      </div>
    </div>
    <Particles
        className="absolute inset-0 -z-10 h-full w-full"
        quantity={400}
        ease={80}
        color={"#000000"}
        vx={0.5}
        vy={0.5}
        refresh
      />
    </>

  )
}

export default App
