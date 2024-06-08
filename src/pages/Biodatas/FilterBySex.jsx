import "../../assets/styleb.css";
const FilterBySex = ({ setSFilter, sfilter, setCurrentPage }) => {
  const sexs = ["Male", "Female"];
  return (
    <div>
      <select
        onChange={(e) => {
          setSFilter(e.target.value);
          setCurrentPage(1);
        }}
        value={sfilter}
        name="category"
        id="category"
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value="">
          Filter By Sex
        </option>
        {sexs.map((item) => (
          <option className="text-blackM custom-option" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBySex;
