import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import video from "../Assets/howToSearch.mp4";
import HeroSection from "./HeroSection";

function Home() {
  const [fruits, setFruits] = useState([]);

/*   useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/fruits")
      .then((response) => response.json())
      .then((data) => setFruits(data))
      .catch((error) => console.error("Error fetching fruits:", error));
  }, []);

  console.log("i frutti sono " + fruits); */

  return (
    <div className="flex flex-col justify-center items-center m-10">
      {/* <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <ul className="list-disc">
        {fruits.map((fruit, index) => (
          <li key={index} className="text-2xl">
            {fruit.name}
          </li>
        ))}
      </ul>   */}
      <HeroSection/>
      <SearchBar />
     {/*  <div>
        <video
          src={video}
          width="750"
          height="500"
          controls
          loop
          muted
        ></video>
      </div> */}

    </div>
  );
}

export default Home;
