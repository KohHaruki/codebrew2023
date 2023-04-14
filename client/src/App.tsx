import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import KnowledgeTree from './pages/KnowledgeTree'
import { ResponseCardInfo } from './components/ResponseCard'
import StudyPlanArea from './pages/StudyPlanArea'

function App() {
  const [responses, setResponses] = useState<Array<ResponseCardInfo>>([]);
  const [interestedTopics, setInterestedTopics] = useState<Set<string>>(new Set());
  const [studyPlan, setStudyPlan] = useState<string>("");

  const url = "http://localhost:8080/prompt"
  const urlStudyPlan = "http://localhost:8080/studyplan"

  // Prop drilling occurs. Using Redux might be better
  const handlePromptSubmit = async (prompt: string) => {
    console.log("prompt:", prompt);

    const res = await fetch(url, 
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({prompt: prompt}),
        })
    
    if (!res.ok) {
        throw new Error("Network was not ok");
    }

    const data = await res.json();

    console.log("Success:", data);

    handleResponses(await data);
  }

  const handleResponses = (response: ResponseCardInfo) => {
    setResponses(prevState => [...prevState, response]);
  }

  const handleInterestedTopics = (interestedTopic: string, toAdd: boolean) => {
    if (toAdd) {
      setInterestedTopics(prevState => new Set([...prevState, interestedTopic]));
    } else {
      const newInterestedTopics = new Set([...interestedTopics]);
      newInterestedTopics.delete(interestedTopic);
      setInterestedTopics(newInterestedTopics);
    }
    console.log("interested topics:", interestedTopics);
  }

  const handleGenerateStudyPlan = async () => {
    const res = await fetch(urlStudyPlan, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify([...interestedTopics]),
    })

    if (!res.ok) {
      throw new Error("Network was not ok");
    }

    const data = await res.json();

    console.log("Success:", data);

    setStudyPlan(data.studyplan);
  }

  return (
    <div>
      <Home handleResponses={handleResponses} handlePromptSubmit={handlePromptSubmit}/>
      <KnowledgeTree responseCards={responses} handlePromptSubmit={handlePromptSubmit} handleInterestedTopics={handleInterestedTopics}/>
      <StudyPlanArea interestedTopics={Array.from(interestedTopics)} handleGenerateStudyPlan={handleGenerateStudyPlan}/>
    </div>
  )
}

export default App
