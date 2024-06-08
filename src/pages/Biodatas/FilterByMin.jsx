import "../../assets/styleb.css";
const FilterByMin = ({ numberOptions, minValue, handleMinChange }) => {
  return (
    <div>
      <select
        value={minValue}
        onChange={handleMinChange}
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value={17}>
          Filter By Min Age
        </option>
        {numberOptions.map((num) => (
          <option className="text-blackM custom-option" key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByMin;
