import React, { useEffect, useState } from "react";
import { items } from "./items";

function MultiFilters() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteresItems, setFilteredItems] = useState(items);

  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];
  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      console.log(tempItems);
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...items]);
    }
  };
  return (
    <div className="main">
      {/* filter */}
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* filtered items */}
      <div className="items-container">
        {filteresItems.map((item, idx) => (
          <div key={`items-${idx}`} className="item">
            <p className="name">{item.name}</p>
            <p className="category">{item.category}</p>
            <p>{item.emoji}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiFilters;
