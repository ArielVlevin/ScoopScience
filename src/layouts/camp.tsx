import React, { useState } from 'react';

const Dropdown = () => {

  const [clickStatus, onClick] = useState(false);

  const handleClick = () => {
    onClick(false);
  }


  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Open Dropdown
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li onClick={handleClick}>
            <a>Dropdown Item 1</a>
          </li>
          <li onClick={handleClick}>
            <a>Dropdown Item 2</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;