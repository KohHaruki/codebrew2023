import ResponseCard from "../components/ResponseCard"
import { ResponseCardInfo } from "../components/ResponseCard"

interface KnowledgeTreeProps {
    responseCards: Array<ResponseCardInfo>;
    handlePromptSubmit: (prompt: string) => void;
}

const KnowledgeTree = (props: KnowledgeTreeProps) => {
    
    return (
        <div className="knowledge-tree container md:grid md:grid-cols-2 md:gap-4">
            {
                props.responseCards.map((responseCardProps: ResponseCardInfo, key: number) => {
                    return (
                        <ResponseCard topic={responseCardProps.topic} 
                            eli5={responseCardProps.eli5}
                            description={responseCardProps.description}
                            application={responseCardProps.application}
                            prerequisites={responseCardProps.prerequisites}
                            handlePromptSubmit={props.handlePromptSubmit}
                            key={key}
                        />
                    )
                })
            }
        </div>
        
    )
}

export default KnowledgeTree