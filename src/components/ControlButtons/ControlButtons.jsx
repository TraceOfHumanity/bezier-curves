import React from "react";
import "./ControlButtons.scss";
import PopupInfo from "../PopupInfo/PopupInfo";

const ControlButtons = () => {
  const [openButtons, setOpenButtons] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const clickOpenButtons = () => {
    setOpenButtons(!openButtons);
  };
  const clickOpenInfo = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <div className="controlButtons">
      <div className="dropDown" onClick={clickOpenButtons}>
        <p>Control buttons</p>{" "}
        <p className={openButtons ? "rotate180" : ""}>
          <img src="/assets/arrow.svg" alt="" />
        </p>
      </div>
      {openButtons && (
        <ul>
          <li>Ctrl + LMB - start a new curve</li> <br />
          <li>Shift + LMB - create a new point</li> <br />
          <li>LMB + Delete - delete the select point</li> <br />
          <li>Ctrl + X - clear the field</li>
        </ul>
      )}
      <div className="infoButton" onClick={clickOpenInfo}>
        <img src="/assets/info.svg" alt="" />{" "}
      </div>
      {openInfo && <PopupInfo />}
    </div>
  );
};

export default ControlButtons;
