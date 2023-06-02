import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
const Search = ({
  city,
  country,
  setCity,
  setCountry,
  handleSearch,
  handleClear,
}) => {
  return (
    <form className="sticky top-0 z-50 flex flex-row gap-x-2 my-4 md:my-4 md:mb-12 w-full h-full ">
      <div className="w-[70%] flex flex-col md:flex-row md:grow md:gap-x-6 gap-y-2 text-xs md:text-base ">
        <div className="flex flex-row gap-x-2 grow">
          <p className="grid items-center">
            <span>City:</span>
          </p>
          <input
            type="text"
            className="w-36 md:w-36 lg:flex lg:grow rounded-2xl bg-white bg-opacity-25 backdrop-blur px-4 py-0.5 focus:outline-none"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="city name"
          />
        </div>
        <div className="flex flex-row gap-x-2 grow">
          <p className="grid items-center w-[60px] md:w-auto">
            <span>Country Code:</span>
          </p>
          <input
            className=" w-32 md:w-36 lg:flex lg:grow   rounded-2xl bg-white bg-opacity-25 backdrop-blur px-4 py-0.5 focus:outline-none"
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="Optional"
          />
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <MagnifyingGlassIcon
          className="h-8 w-8 md:h-10 md:w-10 p-2 text-white bg-purple-700 rounded-xl cursor-pointer hover:bg-purple-600"
          onClick={handleSearch}
        ></MagnifyingGlassIcon>
        <button
          className="p-2 bg-slate-200 hidden"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="text-xs md:text-base h-8 md:h-10 p-2 md:p-2 text-white bg-purple-700 rounded-xl cursor-pointer hover:bg-purple-600"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Search;
