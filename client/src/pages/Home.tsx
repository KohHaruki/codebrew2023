import { useState } from 'react'
import Footer from '../components/Footer';
import './Home.css'
import { Configuration, ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { ResponseCardProps } from '../components/ResponseCard';

interface HomeProps {
    handleResponses: (response: ResponseCardProps) => void;
    handlePromptSubmit: (prompt: string) => void;
}

const Home = (props: HomeProps) => {
    const [prompt, setPrompt] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<Array<ChatCompletionRequestMessage>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
        console.log(prompt);
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.handlePromptSubmit(prompt); // When Enter key is pressed, treat as if it was clicked 
            (event.target as HTMLInputElement).value = "";
        }
    }

    return (
        <div className="">
            <div className="container pt-14 mb-16">

                <div className="hero">
                    <h1 className="text-2xl text-opacity-80">Welcome to Learn Smart GPT</h1>
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
                            onClick={() => props.handlePromptSubmit(prompt)}
                        />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Home