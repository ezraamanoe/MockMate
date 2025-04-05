import './App.css'
import { NavBar } from "@/components/ui/navbar"
import React, { useEffect, useState } from "react"

function Chatbot() {
  const [question, setQuestion] = useState("")

  useEffect(() => {
    // Call the backend when the component mounts
    fetch("/get-question")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("Received data:", data)
        setQuestion(data.question) // Assuming the response is like { "question": "asdfadfads" }
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>
      <span>{question}</span>
    </>
  )
}

export default Chatbot