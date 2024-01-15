import { SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoIosAnalytics } from "react-icons/io";
import { BsFiles } from "react-icons/bs";
import FilesContentComp from "../../components/adminComp/FilesContentComp";
import EvaluationContent from "../../components/adminComp/EvaluationContent";
import ContactInfoComp from "../../components/adminComp/ContactInfoComp";

function CandidateDetailsPage() {
  const location = useLocation();
  const state = location.state;

  const [selectedTab, setSelectedTab] = useState("Evaluation");

  const handleTabClick = (tabName: SetStateAction<string>) => {
    setSelectedTab(tabName);
  };

  // Function to render content based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Tab 1":
        //! new comp to be made in adminComp folder
        return <ContactInfoComp state={state} />;
      case "Evaluation":
        //! new comp to be made in adminComp folder
        return <EvaluationContent evaluation={state.ai_evaluation} />;
      case "Files":
        return <FilesContentComp />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-auto flex flex-row flex-wrap">
      <div className="flex flex-col items-center w-full p-4 md:w-2/6">
        {/* avatar / profile pic */}
        <div className="w-60 h-60 rounded-xl border-2 shadow-sm flex justify-center items-center">
          <FaUser className="text-7xl text-base-300" />
        </div>
        {/* user info */}
        <div className="mt-10">
          <h2 className="text-4xl">
            {state.users.email}
          </h2>
          <h2>position name</h2>
          <h3>rating goes here</h3>
          <div className="join join-vertical w-full lg:join-horizontal mt-4">
            <button className="btn btn-primary btn-outline join-item">
              <RiSendPlaneFill className="text-xl" />
              Send Message
            </button>
            <button className="btn btn-primary btn-outline join-item">
              <TiContacts className="text-xl" />
              Contacts
            </button>
            <button className="btn btn-error btn-outline join-item">
              <MdOutlineReportGmailerrorred />
              Report User
            </button>
          </div>
        </div>
        <div className="divider divider-start">Summary</div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="divider divider-start">Work</div>
        <div className="">BYOX</div>

        <div role="tablist" className="tabs tabs-bordered">
          <a
            role="tab"
            className={`tab ${selectedTab === "Tab 1" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("Tab 1")}
          >
            Contact Information
          </a>
          <a
            role="tab"
            className={`tab ${selectedTab === "Evaluation"
              ? "tab-active"
              : ""}`}
            onClick={() => handleTabClick("Evaluation")}
          >
            <IoIosAnalytics className="text-xl" />
            Evaluation
          </a>
          <a
            role="tab"
            className={`tab ${selectedTab === "Files" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("Files")}
          >
            <BsFiles className="text-xl" />
            Files
          </a>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default CandidateDetailsPage;
