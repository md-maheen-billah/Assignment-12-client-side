const FilterByDivision = ({ setFilter, filter }) => {
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
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Mexican">Mexican</option>
        <option value="Indian">Indian</option>
        <option value="Mediterranean">Mediterranean</option>
      </select>
    </div>
  );
};

export default FilterByDivision;
