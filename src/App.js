import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  //set loading to true, displays a loading screen until data is gathered and output
  //use fetch to grab the data from the given url, then convert it to a json
  const fetchTours = async () => {
    setLoading(true);

    //try to get the data, if success, convert to json, set loading to false,
    // set tours to the data gathered
    // if failure, still set loading to false, log error
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    console.log(tours);
  };
  //on render (since no dependency in array) fetch the tours
  useEffect(() => {
    fetchTours();
  }, []);

  //if loading is true, render loading... else render app
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className='btn btn-dark' onClick={() => fetchTours()}>
          refresh
        </button>
      </div>
      </main>;
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
