import "../../assets/styleb.css";

const FilterByHMin = ({ handleMinHeightChange, minHeight, heights }) => {
  return (
    <div>
      <select
        value={minHeight}
        onChange={handleMinHeightChange}
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value={137}>
          Filter By Min Height
        </option>
        {heights.map((num) => (
          <option className="text-blackM custom-option" key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByHMin;
