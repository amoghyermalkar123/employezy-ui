import JobPostings from "./JobPost";

function SavedJobs(props: {searchTerm: string}) {
    return (  
        <JobPostings searchTerm={props.searchTerm}/>
    );
}

export default SavedJobs;
