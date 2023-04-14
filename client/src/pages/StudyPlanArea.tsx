interface StudyPlanAreaProps {
    interestedTopics: Array<string>;
    handleGenerateStudyPlan: () => void;
}
const StudyPlanArea = (props: StudyPlanAreaProps) => {
    return (
        <div className={props.interestedTopics.length == 0 ? 'hidden' : 'visible'}>
            <h1>Interested topics:</h1>
            <div className="flex flex-wrap">
                {
                    props.interestedTopics.map((topic:string, key: number) => {
                        return <p className="shadow p-1 rounded-md" key={key}>{topic}</p>
                    })
                }
            </div>

            <input type="button"
                className="btn-grad
                    bg-gradient-to-r 
                    from-orange-500 from-10% via-amber-500 via-60% to-amber-400 to-90%
                    absolute
                    right-0
                    box-border
                    rounded-r-md 
                    px-16
                    h-8"
                value="Generate Study Plan"
                onClick={props.handleGenerateStudyPlan}
            />
        </div>
    )
}

export default StudyPlanArea