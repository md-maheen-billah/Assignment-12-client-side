const FilterByDivision = ({ setFilter, filter }) => {
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
          setFilter(e.target.value);
        }}
        value={filter}
        name="category"
        id="category"
        className="border bg-whiteM py-2 px-4 rounded-lg"
      >
        <option value="">Filter By Category</option>
        {divisions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByDivision;
