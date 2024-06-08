import "../../assets/styleb.css";

const FIlterByMax = ({ maxValue, handleMaxChange, numberOptions }) => {
  return (
    <div>
      <select
        value={maxValue}
        onChange={handleMaxChange}
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value={71}>
          Filter By Max Age
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

export default FIlterByMax;
