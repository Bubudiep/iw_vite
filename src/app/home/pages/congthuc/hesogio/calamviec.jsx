import React from "react";

const Calamviec = () => {
  return (
    <div className="white-box">
      <div className="flex gap-2 items-center">
        <div>Ca làm việc</div>
        <div>
          <select>
            <option value="HC">Hành chính</option>
            <option value="2CA">2 Ca</option>
            <option value="3CA">3 Ca</option>
            <option value="4CA">4 Ca</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Calamviec;
