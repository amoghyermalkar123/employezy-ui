import { SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";

import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoIosAnalytics } from "react-icons/io";
import { BsFiles } from "react-icons/bs";
import FilesContentComp from "../../components/adminComp/FilesContentComp";
import EvaluationContent from "../../components/adminComp/EvaluationContent";
import ContactInfoComp from "../../components/adminComp/ContactInfoComp";
import AdminController from "../../controllers/AdminController";

function CandidateDetailsPage() {
  const location = useLocation();
  const state = location.state;

  const [selectedTab, setSelectedTab] = useState("Tab 1");
  const [orgId, setOrgId] = useState(0);
  const [link, setLink] = useState("");

  const handleTabClick = (tabName: SetStateAction<string>) => {
    setSelectedTab(tabName);
  };

  const orgDetails = async () => {
    const data: string | null = localStorage.getItem("org_details");
    if (data) {
      const parsedData = JSON.parse(data);
      setOrgId(parsedData.org_id);
    }
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString();
    AdminController.ScheduleMeeting(state.users.id, orgId, date, link);
  };

  useEffect(
    () => {
      orgDetails();
      console.log(state.ai_evaluation);
    },
    [state]
  );

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
            <button
              className="btn btn-primary btn-outline join-item"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}
            >
              <AiOutlineSchedule className="text-xl" />
              Schedule Meets
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            <p>
              User_id: {state.users.id}
            </p>
            <p>
              Org_id: {orgId}
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={e => setLink(e.target.value)}
            />
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn m-2" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn m-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CandidateDetailsPage;
