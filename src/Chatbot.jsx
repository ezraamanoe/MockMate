import './App.css'
import { NavBar } from "@/components/ui/navbar"
import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button" 
import { Particles } from "@/components/magicui/particles"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Chatbot() {
  const [question, setQuestion] = useState("")
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const name = queryParams.get("name")

  // useEffect(() => {
  //   // Call the backend when the component mounts
  //   fetch("/first_question", {
  //     method: "POST",  // Change to POST
  //     headers: {
  //       "Content-Type": "application/json",  // Set the content type as JSON
  //     },
  //     body: JSON.stringify(formData),  // Send the data to the backend
  //   })
  //     .then((response) => response.json()) // Parse the JSON response
  //     .then((data) => {
  //       console.log("Received data:", data);
  //       setQuestion(data.question); // Assuming the response is like { "question": "asdfadfads" }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const [typingDone, setTypingDone] = useState(false)


  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="question">
      
      
      <TypingAnimation>
         Hi, Jordan! Welcome to your interview.
      </TypingAnimation>

      </div>


      <div className={`answer transition-opacity duration-500 mt-4 ${
      typingDone ? "visible opacity-100" : "invisible opacity-0"
      }`}>
        <Card className="w-[60vw]">
          <CardContent>
            <Textarea
            placeholder="Type your answer here..."
            />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
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

export default Chatbot