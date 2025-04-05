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

function NavBar() {
  // const location = useLocation()

  return (
    <NavigationMenu>
      <NavigationMenuList>
      {location.pathname !== '/hero' && (
        <NavigationMenuItem>
          <NavigationMenuLink>Home</NavigationMenuLink>
        </NavigationMenuItem>
      )}
      
        <NavigationMenuItem>
          <NavigationMenuTrigger>Log in</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[50px] gap-3 p-4 md:w-[100px] md:grid-cols-1 lg:w-[200px]">
              <NavigationMenuLink>GitHub</NavigationMenuLink>
              <NavigationMenuLink>LinkedIn</NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export { NavBar }