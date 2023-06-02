import React, { useState, useEffect } from "react";

const Error = () => {
  return (
    <div className="text-red-600 h-[150px] md:h-[240px] grid place-items-center">
      <span>Sorry, your searched result could not be found.</span>
    </div>
  );
};

export default Error;
