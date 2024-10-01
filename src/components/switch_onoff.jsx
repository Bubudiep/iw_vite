import React, { useState, useEffect } from "react";

const Switch = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked); // Nhận giá trị ban đầu từ prop

  useEffect(() => {
    setIsChecked(checked); // Cập nhật khi giá trị prop "checked" thay đổi
  }, [checked]);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked); // Gọi hàm onChange để truyền giá trị mới lên component cha
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
