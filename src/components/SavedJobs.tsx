import JobPostings from "./JobPost";

function SavedJobs(props: {searchTerm: string}) {
    return (  
        <JobPostings searchTerm={props.searchTerm} is_saved={true}/>
    );
}

export default SavedJobs;
