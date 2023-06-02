import React, { useState, useEffect } from "react";
import { createDate, convertTemp } from "../helpers";
const Display = ({ forecast }) => {
  return (
    <div className=" text-slate-600 flex flex-row gap-x-4 justify-between md:flex-col md:gap-y-2  text-xs md:text-base">
      <div className="grid items-center">
        <p className="text-lg font-bold">{`${forecast.name}, ${forecast.sys.country}`}</p>
        <p className="py-2 text-6xl md:text-8xl font-bold text-purple-800">
          {convertTemp(forecast.main.temp)}°
        </p>

        <div className="flex flex-row gap-x-2 text-black ">
          <p>{`H: ${convertTemp(forecast.main.temp_max)}°`}</p>
          <p>{`L: ${convertTemp(forecast.main.temp_min)}°`}</p>
        </div>
      </div>

      <div className="grid items-end">
        <div
          className="flex flex-col gap-y-2 md:flex-row justify-between text-xs md:text-base
        text-right "
        >
          <p className="capitalize">{forecast.weather[0].description}</p>
          <p>Humidity: {forecast.main.humidity}%</p>
          <p>{createDate(forecast.dt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Display;
