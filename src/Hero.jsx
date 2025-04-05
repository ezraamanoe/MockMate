import './App.css'
import {NavBar} from "@/components/ui/navbar"
import { Particles } from "@/components/magicui/particles";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from 'react-router-dom';
import { TypingAnimation } from "@/components/magicui/typing-animation";


function Hero() {
    const navigate = useNavigate()

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
        <p className="text-2xl text-center">
        real-time interviews with an AI
        that talks back. MockMate simulates voice-powered 
        interview conversations to help you gain confidence, 
        improve answers, and get hired.  
        </p>
      </div>

      

      <InteractiveHoverButton onClick={() => navigate('form')}>
        Start practicing now
      </InteractiveHoverButton>

    </div>
    <Particles
        className="absolute inset-0 -z-10 h-full w-full"
        quantity={100}
        ease={80}
        color={"#000000"}
        vx={0.5}
        vy={0.5}
        refresh
      />
    </>

  )
}

export default Hero
