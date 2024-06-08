import "../../assets/styleb.css";

const FilterByDivision = ({ setDFilter, dfilter, setCurrentPage }) => {
  const divisions = [
    "Barisal",
    "Chattogram",
    "Dhaka",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ];
  return (
    <div>
      <select
        onChange={(e) => {
          setDFilter(e.target.value);
          setCurrentPage(1);
        }}
        value={dfilter}
        name="category"
        id="category"
        className="border w-full text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
      >
        <option className="text-blackM custom-option" value="">
          Filter By Category
        </option>
        {divisions.map((item) => (
          <option
            className="text-blackM custom-option decoration"
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByDivision;
