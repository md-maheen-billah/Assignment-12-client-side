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
        className="border bg-whiteM py-2 px-4 rounded-lg"
      >
        <option value="">Filter By Sex</option>
        {sexs.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBySex;
