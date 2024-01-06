/* eslint-disable @typescript-eslint/no-explicit-any */
import { CgBookmark } from "react-icons/cg";
import { RiAmazonFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import jc from "../controllers/JobController";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";


const pastelColors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
  "bg-green-200",
  "bg-teal-200",
  "bg-orange-200",
  "bg-indigo-200",
  "bg-red-200"
];

// Function to get a random pastel color from the array
const getRandomPastelColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};

function JobPostings(props: { searchTerm:string }) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchJob, setSearchJobs] = useState<any[]>([]);

  const getJobs = async () => {
    const res = await jc.getAllOpenings();
    if (res != null) {
      setJobs(res);
    }
  };

  useEffect(() => {
    if (!props.searchTerm) {
      setSearchJobs(jobs)
      return
    }
    const fuse = new Fuse(jobs, {
      keys: ["opening_name", "job_tags", "name"]
    });
    const result = fuse.search(props.searchTerm);
    const finalResult: any[] = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchJobs(finalResult);
    } else {
      setSearchJobs(jobs);
    }
  }, [props.searchTerm, jobs])

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
      {searchJob ? searchJob.map((item: any, index: number) =>
        <JobPost key={index} item={item} />
      ) : jobs.map((item: any, index: number) =>
        <JobPost key={index} item={item} />
      )}
    </div>
  );
}

function JobPost({ item }: any) {
  const normalDate = new Date(item.created_at);
  const year = normalDate.getFullYear();
  const month = normalDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = normalDate.getDate();
  const navigate = useNavigate();

  const submission = {
    opening_id: item.opening_id,
    code_question: item.assignment_problem_statement,
  };

  return (
    <motion.div
      className="card border-4 flex flex-col w-full h-96 p-2 bg-base-100"
      transition={{ delay: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`flex flex-col flex-1 justify-between p-4 rounded-xl ${getRandomPastelColor()}`}
      >
        <div className="flex flex-row justify-between">
          <div className="p-2 bg-white rounded-full">
            <p className="font-bold">
              {day}-{month}-{year}
            </p>
          </div>
          <div className="p-2 bg-white rounded-full">
            <CgBookmark className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-medium font-sans">
              {item.Orgs.name}
            </p>
            <h2 className="font-bold font-mono text-2xl">
              {item.opening_name}
            </h2>
          </div>
          <span className="p-2 bg-white rounded-full">
            <RiAmazonFill className="text-4xl" />
          </span>
        </div>
        <div className="flex flex-row flex-wrap justify-start">
          { }
          <div className="p-2 border-2 border-gray-400 rounded-full m-1">
            Full-Time
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 py-4">
        <div className="flex flex-col justify-start">
          <p className="font-bold font-mono">
            ${item.salary}/ year
          </p>
          <p className="text-gray-500">
            {item.location}
          </p>
        </div>
        <button
          className="btn btn-neutral rounded-full"
          onClick={() =>
            navigate("/home/code", { state: JSON.stringify(submission) })}
        >
          Apply
        </button>
      </div>
    </motion.div>
  );
}

export default JobPostings;
