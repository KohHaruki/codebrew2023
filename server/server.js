// Sets up the express app
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const sse = require("sse");
const app = express();

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

// Reads the .env file, which stores the OPEN_AI_API_KEY
// Reference: https://www.npmjs.com/package/dotenv 
require("dotenv").config();

// OPEN AI
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const MODEL = "gpt-3.5-turbo";

const openai = new OpenAIApi(configuration);

// This is an example. Don't uncomment this section, otherwise it will send API call
// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "Hello world"}],
// });
// console.log(completion.data.choices[0].message);


app.post("/test", (req, res) => {
  console.log("hello world");
  res.send("Hello World");
})

app.post("/prompt", async (req, res) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const userPrompt = req.body.prompt;
  const completePrompt = `Answer or explain the user's prompt or topic in the following format:
    ELI5: brief and concise overview of the topic,
    Description: Detailed one-paragraph-long description,
    Application: A few notable applications of the topic,
    Prerequisites: [prerequisite knowledge array]

    User's prompt: """${userPrompt}"""
  `;

  try {
    if (!userPrompt.trim()) {
      throw new Error("Empty user prompt.");
    }

    const parameters = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "role: a knowledgeable assistant in any topic imaginable. Audience: high school and university students."
        }, 
        {
          role: "user",
          content: completePrompt
        }
      ],
      stream: true,
    }

    const chatResponse = await fetch(url, 
      {
        method: 'POST',
        headers: 
          {
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
            'Content-Type': "application/json",
          },
        body: JSON.stringify(parameters),
      }
    )

    if (!chatResponse.ok) {
      const err = await chatResponse.json();
      throw new Error(err);
    }

    return new Response(chatResponse.body, {
      headers: 
      {
        'Content-Type': 'text/event-stream',
      }
    })
  } catch (err) {
    
  }
  return new Response();
})

app.post("/prompt3", async (req, res) => {
  // Get's user's prompt/question
  const userPrompt = req.body.prompt; 
  const completePrompt = `${userPrompt}`;
  
  
  // `
  //   User's prompt: ${userPrompt}.
  //   Answer the user's prompt exclusively in JSON format with following properties:
  //   {
  //     eli5: string,
  //     description: string,
  //     application: string,
  //     prerequisites: []
  //   }
  // `

  // Set up the response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  // https://github.com/openai/openai-node/issues/18#issuecomment-1369996933 
  try {
    const completion = await openai.createChatCompletion(
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "role: a knowledgeable assistant in any topic imaginable. Audience: high school and university students."
          }, 
          {
            role: "user",
            content: completePrompt
          }
        ],
        stream: true,
      },
      { 
        responseType: "stream" 
      }
    );

    completion.data.on("data", (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message === "[DONE]") {
          break; // Stream finished
        }
        try {
          const parsed = JSON.parse(message);
          console.log("hi: ", parsed.choices[0].text);
        } catch (error) {
          console.error("Could not JSON parse stream message", message, error);
        }
      }
    });
  } catch (error) {
    if (error.response?.status) {
      console.error(error.response.status, error.message);
      error.response.data.on('data', data => {
          const message = data.toString();
          try {
              const parsed = JSON.parse(message);
              console.error('An error occurred during OpenAI request: ', parsed);
          } catch(error) {
              console.error('An error occurred during OpenAI request: ', message);
          }
      });
    } else {
        console.error('An error occurred during OpenAI request', error);
    }
  }
})

// POST request to Open AI chatgpt-3.5-turbo
app.post("/prompt2", async (req, res) => {
  const userPrompt = req.body.prompt; // Get's user's prompt/question
  const completePrompt = `
    User's prompt: ${userPrompt}.
    Answer the user's prompt exclusively in JSON format with following properties:
    {
      eli5: string,
      description: string,
      application: string,
      prerequisites: []
    }
  `;

  const promptResponse = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "role: a knowledgeable assistant in any topic imaginable. Audience: high school and university students."
      }, 
      {
        role: "user",
        content: completePrompt
      }],
  });

  // TODO: convert response into JSON and send it back to front-end

  console.log(promptResponse.data.choices[0].message);
  res.status(200).send(JSON.stringify(promptResponse.data.choices[0].message.content));
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
  console.log("OPEN_AI_API_KEY: ", process.env.OPEN_AI_API_KEY) // Make sure you have .env file with OPEN_AI_API_KEY
});


