import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Display from "./components/Display";
import Error from "./components/Error";
import History from "./components/History";
//test
function getLocalHistory() {
  let localHistory = localStorage.getItem("history");
  if (localHistory) {
    return (localHistory = JSON.parse(localStorage.getItem("history")));
  } else {
    return [];
  }
}
function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [history, setHistory] = useState(getLocalHistory());
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [isRaining, setIsRaining] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (city.length > 0) {
      getInfo(city, country, true);
    } else {
      alert("please enter a city");
    }
  }
  function handleClear(e) {
    e.preventDefault();
    setCity("");
    setCountry("");
  }

  function addHistory(city, country) {
    setHistory([
      ...history,
      {
        id: Date.now() + Math.random(),
        city: city,
        country: country,
        time: new Date().toLocaleString("en-us", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      },
    ]);
  }
  function removeHistory(idToDelete) {
    const newHistory = history.filter((item) => {
      return item.id !== idToDelete;
    });
    setHistory(newHistory);
  }
  //store history in local storage on each change
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  //change cloud or sun image according to forecast
  useEffect(() => {
    const keywords = ["rain", "thunderstorm", "drizzle"];
    if (forecast) {
      const desc = forecast.weather[0].main.toLowerCase();
      if (keywords.some((keyword) => desc.includes(keyword))) {
        setIsRaining(true);
      } else {
        setIsRaining(false);
      }
    }
  }, [forecast]);
  //get weather info from api
  async function getInfo(city, country, newSearch) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=6db0dcd5883f077a00ee33fa5cbd8371`;
    const response = await fetch(url);

    if (response.status !== 200) {
      //if unsuccessful
      console.log(response.statusText);
      setError(true);
      setShowImg(false);
      console.log(response);
    } else {
      //if success
      const data = await response.json();
      //display forecast info
      setForecast(data);
      //add to search history only if its a new search
      if (newSearch) {
        addHistory(data.name, data.sys.country);
      }
      //clear inputs
      setCity("");
      setCountry("");
      //remove error
      setError(false);
      //showImg
      setShowImg(true);
    }
  }
  return (
    <section
      style={{ backgroundImage: "url(/assets/bg-light.png)" }}
      className="h-screen w-screen flex justify-center items-center bg-no-repeat bg-cover bg-top fixed "
    >
      <div className="max-h-screen overflow-y-auto scrollbar-hide w-[500px] md:w-[700px] lg:w-[800px] px-4">
        {/* ----------search field -------------*/}
        <Search
          {...{ city, country, setCity, setCountry, handleSearch, handleClear }}
        ></Search>

        {/*------------ main container ------------*/}
        <div className="w-full py-4 px-4 md:px-10  h-full lg:h-auto bg-white bg-opacity-25 backdrop-blur rounded-2xl ">
          <div className="w-full relative">
            {/*-------------- cloud/sun image------------ */}
            {showImg &&
              (isRaining ? (
                <img
                  className="absolute h-28 -top-12 -right-4 md:-top-16 md:-right-8 md:h-64 "
                  src="assets/cloud.png"
                  alt=""
                />
              ) : (
                <img
                  className="absolute h-28 -top-12 -right-4 md:-top-16 md:-right-8 md:h-64 "
                  src="assets/sun.png"
                  alt=""
                />
              ))}
            {/* ------------------display forecast----------------*/}
            {forecast && !error ? (
              <Display {...{ forecast }}></Display>
            ) : (
              error && <Error></Error>
            )}
            {/* -----------------Search History ------------------*/}

            <h1 className="md:text-lg font-bold mt-4 mb-2">Search History</h1>
            <History {...{ history, getInfo, removeHistory }}></History>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
