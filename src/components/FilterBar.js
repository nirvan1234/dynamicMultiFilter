import { useState } from "react";

const FilterBar = ({
  onPlaceFilter,
  onStatusFilter,
  onGenderFilter,
 
}) => {
  const [filters, setFilters] = useState({
    place: "",
    status: "",
    gender: "",
   
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "place":
        onPlaceFilter(value);
        break;
      case "status":
        onStatusFilter(value);
        break;
      case "gender":
        onGenderFilter(value);
        break;
    
      default:
        break;
    }
  };

  return (
    <div className="row my-5">
      <div className="col">
        <h4 className="border-bottom">Filters</h4>

      </div>
      <div className="col-sm-12 my-2">
      <label htmlFor="gender">Gender</label>
        <select
          className="form-control"
          id="gender"
          value={filters.gender}
          onChange={(e) => handleInput(e.target.value)}
        >
          <option value="">Select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>

      <div className="col-sm-12 my-2">
      <label htmlFor="place">Place</label>
        <select
          className="form-control"
          id="place"
          value={filters.place}
          onChange={(e) => handleInput(e.target.value)}
        >
          <option value="">Select</option>
          <option value="pune">pune</option>
          <option value="bhopal">Bhopal</option>
          <option value="surat">Surat</option>
          <option value="delhi">Delhi</option>
        </select>
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="status">Status</label>
        <select
          className="form-control"
          id="status"
          value={filters.status}
          onChange={(e) => handleInput(e.target.value)}
        >
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
         
        </select>
      </div>
    </div>
  );
};

export default FilterBar;