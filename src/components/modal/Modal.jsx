import { useState } from "react";
import "./Modal.scss";
import { RxCross2 } from "react-icons/rx";
const Modal = (props) => {
  const [display, setDisplay] = useState(true);

  return (
    <>
      {display ? (
        <div className="modal-overlay">
          <div className="modal_container">
            <div className="modal">
              <div className="modal_container-cross ">
                <RxCross2 onClick={() => setDisplay(!display)} />
              </div>
              {props.children}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
