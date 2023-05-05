import { useState } from "react";
import "./Selector.scss";
import { RiArrowDownSLine } from "react-icons/ri";
const Selector = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="selector">
        <div className="selector-container">
          <div
            className="selector-container-top"
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <h6>{props.selected}</h6>
            <div className="selector-container-top-icon">
              <RiArrowDownSLine />
            </div>
          </div>

          {isActive && (
            <div className="selector-container-selector">
              <div className="selector-container-selector-content">
                {props.data.map((item) => {
                  return (
                    <>
                      <div
                        className="selector-container-selector-item"
                        onClick={(e) => {
                          props.setSelected(e.target.textContent);
                          setIsActive(!isActive);
                        }}
                      >
                        {item.name}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Selector;
