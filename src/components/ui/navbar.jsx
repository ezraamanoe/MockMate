import { useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useNavigate } from 'react-router-dom';
import { Linkedin, Github } from "lucide-react";

function NavBar() {
  // const location = useLocation()
  const navigate = useNavigate();
  return (
    <NavigationMenu>
      <NavigationMenuList>
      {location.pathname !== '/' && (
        <NavigationMenuItem className="ml-3 mr-3"> 
          <NavigationMenuLink onClick={() => navigate('/')}>Home</NavigationMenuLink>
        </NavigationMenuItem>
      )}
      
        <NavigationMenuItem className="ml-3 mr-3">
          <NavigationMenuLink className="flex flex-row items-center gap-1" onClick={(e) => { e.preventDefault(); window.open('https://www.linkedin.com/in/ezramanoe/', '_blank'); }}><Linkedin size={0.01} />Ezra</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-3 mr-3">
        <NavigationMenuLink className="flex flex-row items-center gap-1" onClick={(e) => { e.preventDefault(); window.open('https://www.linkedin.com/in/jordan-keane-liman/', '_blank'); }}><Linkedin size={0.01} />Jordan</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-3 mr-3">
        <NavigationMenuLink className="flex flex-row items-center gap-1" onClick={(e) => { e.preventDefault(); window.open('https://github.com/ezraamanoe/studenthack', '_blank'); }}><Github size={0.01} />GitHub</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export { NavBar }