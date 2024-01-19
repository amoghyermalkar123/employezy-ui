import JobPostings from "./JobPost";

function DiscoverPage(props: {searchTerm: string}) {
    return (  
        <JobPostings searchTerm={props.searchTerm} is_saved={false}/>
    );
}

export default DiscoverPage;
