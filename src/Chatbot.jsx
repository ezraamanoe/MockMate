import './App.css';
import { NavBar } from "@/components/ui/navbar";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";  // Import the loader icon

function Chatbot() {
  const [question, setQuestion] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const [answer, setAnswer] = useState("");
  const [interviewDone, setInterviewDone] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state for the button

  useEffect(() => {
    // Fetch the first question when the component mounts
    fetch("/first_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setQuestion(data.question);
        setTypingDone(false);
        if (data.question.toLowerCase().startsWith("thank you for your time")) {
          setInterviewDone(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = () => {
    // Delay loading spinner to ensure the question is fully typed
      setLoading(true);  // Set loading to true when submitting // Adjust this timeout to match your animation duration

    fetch("/prev_qna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        QnA: `${question} ${answer}`,
      }),
    })
      .then(res => res.json())
      .then(() => {
        return fetch("/continue_interview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then(res => res.json())
      .then((data) => {
        setQuestion(data.question);
        setAnswer("");
        setTypingDone(false);
        
        // Add a delay before setting loading to false
        setTimeout(() => {
          setLoading(false);  // Set loading to false after a delay
        }, 500);  // Adjust the delay to fit your needs (e.g., 1000ms = 1 second)

        if (data.question.toLowerCase().startsWith("thank you for your time")) {
          setInterviewDone(true);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);  // Set loading to false in case of error
      });
  };

  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>

      <div className="question">
        <TypingAnimation
          onComplete={() => {
            console.log("Typing done");
            setTypingDone(true);
          }}
          duration={50}
        >
          {question}
        </TypingAnimation>
      </div>

      <div
        className={`answer transition-opacity duration-500 mt-4 ${
          interviewDone
            ? "invisible opacity-0"
            : typingDone
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <Card className="w-[60vw]">
          <CardContent>
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Please wait...
                </>
              ) : (
                "Submit"
              )}
            </Button>
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
  );
}

export default Chatbot;