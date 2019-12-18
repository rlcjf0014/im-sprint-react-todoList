import React from "react";

const CategoryListEntry = ({categoryName, selectCategory, removeCategory}) => {

  

  return (
    <div className="category-list-entry">
      <div className="category-list-body">
        <div onClick={e => selectCategory(e.target.innerHTML)} className="category-list-entry-detail">{categoryName}
        </div>
        <span>
          <button className="removeButton" onClick={() => removeCategory(categoryName)}>x</button>
          </span>
      </div>
    </div> 
  );
};

export default CategoryListEntry;
