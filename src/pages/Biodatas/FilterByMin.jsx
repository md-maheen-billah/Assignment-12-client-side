const FilterByMin = ({ numberOptions, minValue, handleMinChange }) => {
  return (
    <div>
      <select value={minValue} onChange={handleMinChange}>
        <option value={17}>Filter By Min Age</option>
        {numberOptions.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByMin;
