# Learn Smart GPT (Codebrew 2023)
## Inspiration
At the heart of Learn Smart GPT is our belief that everyone deserves access to a quality mentor that can guide their learning journey. However, we recognize that traditional study coaches can be expensive, with costs reaching up to $250 per session, making it out of reach for many people. Additionally, learning new topics and creating a personalized study plan can be time-consuming. That's why we were inspired to create an AI-powered tutor and study coach that is knowledgeable in any topic and can provide users with personalized suggestions for their study path. We envisioned a solution that would eliminate the barriers of cost and time, making it accessible to anyone who wants to learn and grow. With Learn Smart GPT, we hope to empower users to achieve their learning goals and realize their full potential.

## What it does
Our solution starts by prompting the user about the topics they want to learn. From there, our ChatGPT 3.5 powered solution generates a comprehensive overview of the chosen topic, coupled with real-life applications, and suggests prerequisite knowledge to explore. With just a few clicks, our users can delve into the details of any topic they're interested in, making learning both accessible and engaging. Finally, our solution generates a detailed study plan tailored to the user, taking into account their unique preferences and learning style. We aim to make the learning journey as seamless and efficient as possible, enabling users to achieve their learning goals with ease.

## How to run our project
1. Clone or download our repo
1. Run `npm install` in the parent folder, the `client` folder, and the `server` folder
1. Create a `.env` file inside the `server` folder with the following content: `OPEN_AI_API_KEY=INSERT_YOUR_API_KEY_HERE`
1. Run `npm run dev` in the `client` folder, and run `npm run start` in the `server` folder. This launches the front-end website and the backend server
1. Type in a topic you would like to explore, and click Learn. It will send the prompt to the backend. Note that you may have to wait around 10~20 seconds before the response manifests
1. Once response is created, a card with the topic's overview will appear. You can scroll  Click "explore" to explore its prerequisites. Note that if your OpenAI account is on free trial, there is 3 prompts/min limit.
1. Click the checkboxes of topics you are interested in, and click Generate Study Plan to generate your study plan.

## How we built it
* To build the front-end, we chose React for its ease of learning and the opportunity for workshops during the hackathon.
* We accelerated our styling process with TailwindCSS, which allowed us to create a polished and visually appealing interface.
* For the back-end, we opted for the simplicity of Express.js. The back-end receives user prompts from the front-end, and then sends a HTTP POST request to the OpenAI API with additional context and instructions. This enables ChatGPT to act as a knowledgeable mentor, providing users with personalized guidance and suggestions for their study plan.

## Challenges we ran into
* Learning new skills on the spot during our first hackathon was a challenge, as most of us had little experience with front-end development, back-end development, and Git collaboration
* Integrating the OpenAI API into our product proved to be a challenge, especially during debugging
Streaming GPT's response chunk by chunk was not natively supported in the npm openai package, and implementing the workaround with Server Side Events or Web Sockets was unfeasible due to time constraints
* Bringing our complex Figma design to reality was a challenge that we had to compromise on due to time constraints, but we're proud of the final product's UI/UX

## Accomplishments that we're proud of
* A working product with a pleasant UI/UX
* Integration with external API
* First hackathon for most of us, and our first project powered by AI

## What we learned
* React front-end development
* Back-end development with Express.js
* Figma design
* Integrating external API into our product
* Prompt engineering

## What's next for Learn Smart GPT
* Database and platform where students and teachers can share their plan
* Implement peer review system where teachers can rate someone's learning path/study plan
* Notification feature urging students to learn
* When students mark their study plan as done, our product will test them regarding the topics and mark their understanding (test and marking done by ChatGPT)
* When students make mistakes, ChatGPT analyses the mistake, create a new study plan based on those mistake, so students can revise their weak points
