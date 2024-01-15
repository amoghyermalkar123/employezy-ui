import { PiDownloadBold } from "react-icons/pi";
import { MdOpenInNew } from "react-icons/md";

function FilesContentComp() {
  return (
    <div className="h-full w-full">
      <div className="join join-vertical w-full mt-10">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Resume</div>
          <div className="collapse-content">
            <div className="join join-vertical lg:join-horizontal">
              <button className="btn btn-primary btn-outline join-item">
                <PiDownloadBold className="text-xl" />
                Download
              </button>
              <button className="btn btn-primary btn-outline  join-item">
                <MdOpenInNew className="text-xl" />
                View
              </button>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Cover Letter</div>
          <div className="collapse-content">
            <div className="join join-vertical lg:join-horizontal">
              <button className="btn btn-primary btn-outline join-item">
                <PiDownloadBold className="text-xl" />
                Download
              </button>
              <button className="btn btn-primary btn-outline  join-item">
                <MdOpenInNew className="text-xl" />View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilesContentComp;
