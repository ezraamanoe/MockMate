import './App.css';
import { NavBar } from "@/components/ui/navbar";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSpeechRecognition } from "react-speech-kit";
import { Mic }  from "lucide-react";
import { Progress } from "@/components/ui/progress";


function Chatbot() {
  const [question, setQuestion] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const [answer, setAnswer] = useState("");
  const [interviewDone, setInterviewDone] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasFirstQuestion, setHasFirstQuestion] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 180;
  const [listening, setListening] = useState(false);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setAnswer(answer + ' ' + result);
    },
  });

  useEffect(() => {
    let intervalId;
    
    if (typingDone) {
      intervalId = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + (100 / duration);
          if (newValue >= 100) {
            clearInterval(intervalId); // Clear interval when reaching 100%
            handleSubmit();
            return 100;
          }
          return newValue;
        });
      }, 1000);
  
      return () => {
        clearInterval(intervalId); // Cleanup on unmount or when typingDone changes
        setProgress(0); // Reset progress when effect cleans up
      };
    }
  }, [typingDone]);
        

  useEffect(() => {
    fetch("/first_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.question);
        setHasFirstQuestion(true);
        setTypingDone(false);
        if (data.question.toLowerCase().startsWith("thank you")) {
          setInterviewDone(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    
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
        
        setTimeout(() => {
          setLoading(false);
        }, 500);

        if (data.question.toLowerCase().startsWith("thank you")) {
          setInterviewDone(true);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>

      <div className="question">
        {hasFirstQuestion && (
          <TypingAnimation
            onComplete={() => {
              setTypingDone(true);
            }}
            duration={30}
          >
            {question}
          </TypingAnimation>
        )}
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
            <Progress className="mb-4" value={progress}/>
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!typingDone}
            />
          </CardContent>
          <CardFooter className="flex gap-5">
            <Button onClick={handleSubmit} disabled={loading || !typingDone}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <Button onClick={() => {
                setListening(!listening)
                if (!listening) {  // Add state to track listening
                  listen();
                } else {
                  stop();
                }
              }}>
              <Mic />{listening ? " Stop" : " Speak"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Particles
        className="absolute inset-0 -z-10 h-full w-full"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        vx={0.5}
        vy={0.5}
        refresh
      />
    </>
  );
}

export default Chatbot;