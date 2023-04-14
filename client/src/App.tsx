import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import KnowledgeTree from './pages/KnowledgeTree'
import { ResponseCardProps } from './components/ResponseCard'
import { ResponseCardInfo } from './components/ResponseCard'

function App() {
  const [responses, setResponses] = useState<Array<ResponseCardInfo>>([]);

  const url = "http://localhost:8080/prompt"

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
    // const newResponses = [...responses, response];
    // setResponses(newResponses);
  }

  return (
    <div>
      <Home handleResponses={handleResponses} handlePromptSubmit={handlePromptSubmit}/>
      <KnowledgeTree responseCards={responses} handlePromptSubmit={handlePromptSubmit}/>
    </div>
  )
}

export default App
