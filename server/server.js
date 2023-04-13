// Sets up the express app
const express = require("express");
const cors = require("cors");
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

// ========== EXAMPLE ============)
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Get users
app.get("/user", (req, res) => {
  res.send(JSON.stringify(user_database));
});
// ========== EXAMPLE END ===========


app.post("/test", (req, res) => {
  console.log("hello world");
  res.send("Hello World");
})

// POST request to Open AI chatgpt-3.5-turbo
app.post("/prompt", async (req, res) => {
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


