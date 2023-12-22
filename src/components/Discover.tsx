import JobPostings from "./JobPost";

function DiscoverPage(props: {searchTerm: string}) {
    return (  
        <JobPostings searchTerm={props.searchTerm}/>
    );
}

export default DiscoverPage;
