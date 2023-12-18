function JobSteps() {
    return (
        <div className="p-1">
            <span className="ml-5">
                Job Application Steps
            </span>
            <ul className="steps">
                <li className="step step-info">Fly to moon</li>
                <li className="step step-info">Shrink the moon</li>
                <li className="step step-info">Grab the moon</li>
                <li className="step step-error" data-content="?">Sit on toilet</li>
            </ul>
        </div>
    );
}

export default JobSteps;