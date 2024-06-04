import React from "react";

const FIlterByMax = ({ maxValue, handleMaxChange, numberOptions }) => {
  return (
    <div>
      <select value={maxValue} onChange={handleMaxChange}>
        <option value={71}>Filter By Max Age</option>
        {numberOptions.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FIlterByMax;
