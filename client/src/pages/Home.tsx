import { useState } from 'react'
import Footer from '../components/Footer';
import './Home.css'
import { Configuration, ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { SSE } from 'sse';
// const SSE = require('sse');

const Home = () => {
    const [questions, setQuestions] = useState<Array<string>>([]);
    const [chatMessages, setChatMessages] = useState<Array<ChatCompletionRequestMessage>>([]);
    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const url = "http://localhost:8080/prompt"

    const handleClick = () => {
        
    }

    // const handleClick = () => {
    //     if (prompt) { // Only handles when prompt is non-empty, non-null etc
    //         const newQuestions = [...questions, prompt];
    //         setQuestions(newQuestions);

    //         const newChatMessages = [...chatMessages, {role: ChatCompletionRequestMessageRoleEnum.User, content: prompt}];
    //         setChatMessages(newChatMessages);

    //         setIsLoading(true);

    //         const eventSource = new SSE(url, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             payload: JSON.stringify({messages: chatMessages})
    //         })

    //         eventSource.addEventListener('error', handleError);

    //         eventSource.addEventListener('message', (e) => {
    //             try {
    //                 setIsLoading(false);
    //                 if (e.data === '[DONE]') {
    //                     const newChatMessages = [...chatMessages, {role: ChatCompletionResponseMessageRoleEnum.Assistant, content: answer}];
    //                     setChatMessages(newChatMessages);
    //                     setAnswer('');
    //                     return;
    //                 }

    //                 const completionResponse = JSON.parse(e.data);
    //                 const [{ delta }] = completionResponse.choices;

    //                 if (delta.content) {
    //                     const newAnswer = (answer ?? '') + delta.content;
    //                 }
    //             } catch (err) {
    //                 handleError(err);
    //             }
    //         })
    //         eventSource.stream();
    //     }
    // }

    const handleError = (err:any) => {
        setIsLoading(false);
        setPrompt('');
        setAnswer('');
        console.log(err);
    }

    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
        console.log(prompt);
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleClick(); // When Enter key is pressed, treat as if it was clicked 
            (event.target as HTMLInputElement).value = "";
        }
    }

    return (
        <div className="">
            <div className="container pt-28 mb-16">

                <div className="hero">
                    <h1 className="text-2xl text-opacity-80">Welcome to Cyber Sapiens</h1>
                    <h1 className="text-6xl pt-4 pb-8">What do you want to learn?</h1>

                    <div className="prompt-input-wrapper relative">

                        <input type="text-area" className="w-full 
                            h-8 p-8 text-3xl bg-slate-800 rounded-md 
                            box-border border-none text-slate-50" 
                            placeholder='Ask any question about any topic!'
                            onChange={handlePromptChange}
                            onKeyDown={handleEnter}
                        />

                        <input type="button" 
                            className="
                                btn-grad
                                
                                bg-gradient-to-r 
                                from-orange-500 from-10% via-amber-500 via-60% to-amber-400 to-90%
                                absolute
                                right-0
                                box-border
                                rounded-r-md 
                                px-16
                                h-full"
                            value="Learn"
                            onClick={handleClick}
                        />
                    </div>

                </div>
                
                
            </div>
            
            <Footer />
        </div>
    )
}

export default Home