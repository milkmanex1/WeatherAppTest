import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
    // y: "-30vh",
    x: "-20vw",
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      //   duration: 1
    },
  },
  exit: {
    x: "60vw",
    // y: "-40vw",
    transition: { ease: "easeInOut" },
    opacity: 0,
    duration: 0.5,
  },
};
const History = ({ history, getInfo, removeHistory }) => {
  const historyEndRef = useRef(null);
  const scrollToTop = () => {
    historyEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToTop();
  }, [history]);
  return (
    <div
      className={`flex ${
        history.length ? "flex-col-reverse" : "flex-col items-center"
      } gap-y-2 py-2 text-xs md:text-base max-h-[40vh] overflow-y-auto scrollbar overflow-x-hidden`}
    >
      <AnimatePresence>
        {history.length ? (
          history.map((item, index) => {
            return (
              <motion.div
                key={index}
                className="bg-white bg-opacity-30 px-4 py-2 md:p-4 rounded-2xl flex flex-row gap-x-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                ref={historyEndRef}
              >
                <div className="flex flex-col md:flex-row md:gap-x-2 md:justify-between grow">
                  <p className="grid items-center">
                    <span>
                      {item.city}, {item.country}
                    </span>
                  </p>
                  <p className="text-slate-600 text-xs md:text-base grid items-center">
                    <span>{item.time}</span>
                  </p>
                </div>
                <div className="grid items-center ">
                  <div className="flex flex-row gap-x-2">
                    <MagnifyingGlassIcon
                      className="h-8 w-8 p-2 cursor-pointer bg-slate-100 rounded-2xl hover:bg-slate-300 text-slate-500 drop-shadow-lg "
                      onClick={() => {
                        getInfo(item.city, item.country, false);
                      }}
                    ></MagnifyingGlassIcon>
                    <TrashIcon
                      className="h-8 w-8 p-2 cursor-pointer bg-slate-100 hover:bg-slate-300 rounded-2xl text-slate-500 drop-shadow-lg"
                      onClick={() => removeHistory(item.id)}
                    ></TrashIcon>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div>
            <p className="text-slate-700">No History Available</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
