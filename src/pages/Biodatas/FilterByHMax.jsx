import "../../assets/styleb.css";

const FilterByHMax = ({ handleMaxHeightChange, maxHeight, heights }) => {
  return (
    <div>
      <select
        value={maxHeight}
        onChange={handleMaxHeightChange}
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value={213}>
          Filter By Max Height
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

export default FilterByHMax;
