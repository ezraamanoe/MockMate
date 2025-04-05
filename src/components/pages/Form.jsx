import './App.css'
import { NavBar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Particles } from "@/components/magicui/particles"
import { BorderBeam } from "@/components/magicui/border-beam"
import { useState } from "react"

function Form() {
  const [qualification, setQualification] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!qualification || !jobDescription) {
      setError("Both fields must be filled!")
      return
    }

    setError("") // Clear error message if fields are filled

    // Prepare data for submission
    const formData = {
      qualification,
      jobDescription,
    }

    // Send data to backend using fetch
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
        // Handle success (e.g., display a success message or redirect)
      })
      .catch((error) => {
        console.error("Error:", error)
        // Handle error (e.g., show error message)
      })
  }

  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>

      <div className="form">
        <Card className="w-[35vw]">
          <CardHeader>
            <CardTitle>Start practicing for your interview!</CardTitle>
            <CardDescription>Enter a few details to help us help you</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="qualification">Select your qualification</Label>
                  <Select
                    id="qualification"
                    value={qualification} // Ensure value is controlled by state
                    onValueChange={setQualification} // Update state on selection change
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="highschool student">High School</SelectItem>
                      <SelectItem value="first-year uni student">Bachelors (1st year)</SelectItem>
                      <SelectItem value="second-year uni student">Bachelors (2nd year)</SelectItem>
                      <SelectItem value="third-year uni student">Bachelors (3rd year)</SelectItem>
                      <SelectItem value="masters student">Masters</SelectItem>
                      <SelectItem value="postgraduate student">Post-graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-3 mt-3">
                <Label htmlFor="job-description">Job description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Enter your job description here"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" onClick={handleSubmit}>Start Now!</Button>
          </CardFooter>
        </Card>
        <BorderBeam
          duration={2}
          size={300}
          reverse
          className="from-transparent via-black-500 to-transparent"
        />
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

export default Form