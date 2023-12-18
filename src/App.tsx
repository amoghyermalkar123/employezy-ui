import AssignmentStatuse from "./components/AssignmentStatuses"
import Breadcrumb from "./components/Breadcrumb"
import Navbar from "./components/Main"
import JobPostings from "./components/JobPost"
import JobSteps from "./components/JobSteps"

function App() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex flex-col p-4">
        <Breadcrumb />
        <AssignmentStatuse />
      </div>
      <div className="w-full">
        <JobSteps />
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
          <JobPostings />
        </div>
      </div>
    </div>
  )
}

export default App
