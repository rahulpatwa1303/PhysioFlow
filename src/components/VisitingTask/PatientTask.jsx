import { MoreVertical } from "lucide-react";
import { useState } from "react";
import "./Patient.css";

function PatientTask({openTaskModel}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-white p-4 rounded-lg group/task flex justify-between">
      <div className="relative flex gap-4">
        <div className="checkbox-wrapper-12">
          <div className="cbx">
            <input
              id="cbx-12"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <label></label>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo-12">
                <fegaussianblur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                ></fegaussianblur>
                <fecolormatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  result="goo-12"
                ></fecolormatrix>
                <feblend in="SourceGraphic" in2="goo-12"></feblend>
              </filter>
            </defs>
          </svg>
        </div>
        <span
          className={`${
            isChecked ? "checkbox-label checked" : "checkbox-label"
          }`}
          onClick={openTaskModel}
        >
          To-Do
        </span>
      </div>
      <div className="hidden sm:block">
        <button className="invisible group-hover/task:visible ">
          <MoreVertical />
        </button>
      </div>
    </div>
  );
}

export default PatientTask;
