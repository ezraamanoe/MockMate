import './App.css'
import { NavBar } from "@/components/ui/navbar"
import React, { useEffect, useState } from "react"

function Chatbot() {
  const [question, setQuestion] = useState("")

  useEffect(() => {
    // Prepare data to send (if needed for the POST request)
    const formData = {
      qualification: "Bachelors (1st year)",  // Example data
      job_desc: "Software Developer"  // Example data
    };
  
    // Call the backend when the component mounts
    fetch("/first_question", {
      method: "POST",  // Change to POST
      headers: {
        "Content-Type": "application/json",  // Set the content type as JSON
      },
      body: JSON.stringify(formData),  // Send the data to the backend
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("Received data:", data);
        setQuestion(data.question); // Assuming the response is like { "question": "asdfadfads" }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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