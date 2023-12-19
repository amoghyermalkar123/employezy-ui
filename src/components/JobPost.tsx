import { CgBookmark } from "react-icons/cg";
import { RiAmazonFill } from "react-icons/ri";
import { motion } from "framer-motion"

const pastelColors = [
    'bg-pink-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-green-200',
    'bg-teal-200',
    'bg-orange-200',
    'bg-indigo-200',
    'bg-red-200',
];

// Function to get a random pastel color from the array
const getRandomPastelColor = () => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
};

function JobPostings() {
    const componentsArray = Array.from({ length: 10 }, (v, i) => i);
    return (
        <div className="bg-base-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
            {
                componentsArray.map((index) => (
                    <JobPost key={index} />
                ))
            }
        </div>
    );
}

function JobPost() {
    return (
        <motion.div className="card border-4 flex flex-col w-full h-96 p-2 bg-base-100" transition={{ delay: 0.2 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`flex flex-col flex-1 justify-between p-4 rounded-xl ${getRandomPastelColor()}`}>
                <div className="flex flex-row justify-between">
                    <div className="p-2 bg-white rounded-full">
                        <p className="font-bold">19-12-2023</p>
                    </div>
                    <div className="p-2 bg-white rounded-full"><CgBookmark className="text-2xl" /></div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="font-medium font-sans">Amazon</p>
                        <h2 className="font-bold font-mono text-3xl">SWE-1</h2>
                    </div>
                    <span className="p-2 bg-white rounded-full"><RiAmazonFill className="text-4xl" /></span>
                </div>
                <div className="flex flex-row flex-wrap justify-start">
                    <div className="p-2 border-2 border-gray-400 rounded-full m-1">
                        Full-Time
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between px-2 py-4">
                <div className="flex flex-col justify-start">
                    <p className="font-bold font-mono">
                        $230,000/ year
                    </p>
                    <p className="text-gray-500">Remote, Hybrid</p>
                </div>
                <button className="btn btn-neutral rounded-full">
                    Apply
                </button>
            </div>
        </motion.div>
    );
}

export default JobPostings;
