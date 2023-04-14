import './ResponseCard.css'
import '../index.css'
import { useState } from 'react';

export interface ResponseCardInfo {
    topic: string,
    eli5?: string,
    description?: string,
    application?: string,
    prerequisites: Array<string>,
}

export interface ResponseCardProps {
    topic: string,
    eli5?: string,
    description?: string,
    application?: string,
    prerequisites: Array<string>,
    handlePromptSubmit: (prompt: string) => void;
}

const ResponseCard = (props: ResponseCardProps) => {
    const [active, setActive] = useState<boolean>(false);
    const [hasExplored, setHasExplored] = useState<boolean>(false);

    const handleToggleActive = () => {
        setActive(prevState => !prevState);
    }

    const handleExploreClick = async () => {
        if (hasExplored) { // If it has already been explored, do not explore again
            return;
        }

        setHasExplored(true);

        console.log("prerequisites:", props.prerequisites)

        for (let prereq of props.prerequisites) {
            props.handlePromptSubmit(prereq);
        }
    }

    return (
        <div className="response-card rounded-md p-6 text-black max-w-xl shadow font-thin text-left relative max-h-80" onClick={handleToggleActive}>
            <h1 className="text-xl font-bold text-center">{props.topic}</h1>
            <table className="response-card-table font-light border-spacing-1 border-separate border-slate-500">
                <thead>
                    <tr>
                        <td className="section-title">ELI5</td>
                        <td>{props.eli5}</td>
                    </tr>
                </thead>
                <tbody className={active ? 'visible' : 'collapse'}>
                    <tr>
                        <td className="section-title">Description</td>
                        <td>{props.description}</td>
                    </tr>
                    <tr>
                        <td className="section-title">Applications</td>
                        <td>{props.application}</td>
                    </tr>
                    <tr>
                        <td className="section-title">Prerequisites</td>
                        <td>
                            {
                                props.prerequisites.map((prereq: string, key: number) => {
                                    return <p key={key}>{prereq + " "}</p>
                                })
                        
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="button" 
                className={(hasExplored ? 'hidden' : 'visible') + `
                    btn-grad
                    bg-gradient-to-r 
                    from-orange-500 from-10% via-amber-500 via-60% to-amber-400 to-90%
                    box-border
                    rounded-md 
                    px-4 h-6 text-xs
                    absolute right-4 top-4`}
                value="Explore"
                onClick={handleExploreClick}
            />
        </div>
    )
}

export default ResponseCard