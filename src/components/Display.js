import React, { useState, useEffect } from "react";
import { createDate, convertTemp } from "../helpers";
import { motion, AnimatePresence } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 1,
    scale: 0.1,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      //   duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { ease: "easeInOut" },
  },
};
const Display = ({ forecast, showImg, isRaining }) => {
  return (
    <motion.div
      className=" text-slate-600 flex flex-row gap-x-4 justify-between md:flex-col md:gap-y-2  text-xs md:text-base"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
    </motion.div>
  );
};

export default Display;
