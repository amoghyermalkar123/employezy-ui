import { MdGroups } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

function CardsComp() {
  return (
    <div className="stats stats-vertical w-full md:stats-horizontal">
      <div className="stat">
        <div className="stat-figure text-primary">
          <MdGroups className="text-3xl" />
        </div>
        <div className="stat-title">Total Jobs Posted</div>
        <div className="stat-value text-primary">25.6K</div>
        {/* <div className="stat-desc">21% more than last month</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BiNotepad className="text-3xl" />
        </div>
        <div className="stat-title">Total Applicants</div>
        <div className="stat-value text-secondary">2.6M</div>
        {/* <div className="stat-desc">21% more than last month</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <FaRegUser className="text-3xl" />
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Top Applicants</div>
      </div>
    </div>
  );
}

export default CardsComp;
