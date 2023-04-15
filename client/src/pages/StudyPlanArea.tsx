interface StudyPlanAreaProps {
    interestedTopics: Array<string>;
    handleGenerateStudyPlan: () => void;
    studyplan?: string,
}
const StudyPlanArea = (props: StudyPlanAreaProps) => {
    return (
        <div className={(props.interestedTopics.length == 0 ? 'hidden' : 'visible') + " container  my-5"}>
            <h1>Interested topics:</h1>
            <div className="flex flex-wrap  my-3">
                {
                    props.interestedTopics.map((topic:string, key: number) => {
                        return <p className="shadow p-1 rounded-md mr-2" key={key}>{topic}</p>
                    })
                }
            </div>

            <input type="button"
                className="btn-grad
                    bg-gradient-to-r 
                    from-orange-500 from-10% via-amber-500 via-60% to-amber-400 to-90%
                    box-border
                    rounded-md 
                    px-16
                    h-8 mb-8"
                value="Generate Study Plan"
                onClick={props.handleGenerateStudyPlan}
            />

            <p className="mb-16">{props.studyplan}</p>
        </div>
    )
}

export default StudyPlanArea