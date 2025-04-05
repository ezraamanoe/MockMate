import './App.css'
import { MorphingText } from "@/components/magicui/morphing-text";
import {NavBar} from "@/components/ui/navbar"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

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
    
    <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
    <div className="navbar">
      <NavBar />
    </div>

    <div className="hero-text">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Meteors
      </span>
      <div className="hero-text-subtitle">
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
    </>

  )
}

export default App
