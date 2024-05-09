import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from 'axios'
// eslint-disable-next-line react/prop-types
const TabCategories = () => {
  // axios
  const [jobs,setJobs] = useState([])
  useEffect(()=>{
    const getData = async () =>{
      // get the result into the data from the server 
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data)
    }
    getData()
  },[])
  return (
    <main>
      <Tabs>
        <div className="container mx-auto">
          <h2 className="mt-4 text-center text-4xl font-bold mb-2">
            Browse Job By categories
          </h2>
          <p className="mb-4 text-center w-3/4 mx-auto font-bold text-sm">
            Three categories are available for the time being.These are web
            development,graphics design,digital marketing.Browse them clicking
            in the tab below.
          </p>
          <div className="flex justify-center">
            <TabList>
              <Tab>Web Development</Tab>
              <Tab>Graphics Design</Tab>
              <Tab>Digital Marketing</Tab>
            </TabList>
          </div>

          <TabPanel>
           <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
           {jobs.filter(jb=>jb.category==='Web Development').map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
           </div>
          </TabPanel>
          <TabPanel>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
           {jobs.filter(jb=>jb.category==='Graphics Design').map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
           </div>
          </TabPanel>
          <TabPanel>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
           {jobs.filter(jb=>jb.category==='Digital Marketing').map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
           </div>
          </TabPanel>
        </div>
      </Tabs>
    </main>
  );
};

export default TabCategories;
