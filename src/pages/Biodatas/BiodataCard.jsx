import React from "react";
import { FaBriefcase, FaHourglassEnd, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BiodataCard = ({ member }) => {
  return (
    <div>
      <div className="max-w-xs mx-auto rounded-md shadow-md">
        <div className="flex flex-col justify-between px-6 py-4 space-y-6 bg-reddM">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={member.image}
                alt=""
                className="object-cover  object-center w-10 h-10 rounded-lg  bg-redM"
              />
              <h2 className="text-2xl font-semibold tracking-wide">
                BIODATA ID{" "}
                <span className="text-whiteM">#{member.biodataId}</span>
              </h2>
            </div>
            <p className="text-whiteM">{member.sex}</p>
            <div className="text-whiteM flex items-center gap-2">
              <FaLocationDot />
              {member.permanentDivision}
            </div>
            <div className="text-whiteM flex items-center gap-2">
              <FaHourglassEnd />
              {member.age} Years Old
            </div>
            <div className="text-whiteM flex items-center gap-2">
              <FaBriefcase />
              {member.occupation}
            </div>
          </div>
          <div className="flex justify-center">
            <Link to={`/biodata-details/${member.biodataId}`}>
              <button className="group relative z-10 px-6 py-3 overflow-hidden bg-black text-base text-white">
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                  View Profile
                </span>
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;
