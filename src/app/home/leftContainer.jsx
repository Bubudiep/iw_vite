import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LeftContainer = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Chiều cao của mỗi mục (50px như trong CSS của bạn)
  const itemHeight = 50;

  const items = [
    { name: "Trang chủ", icon: "fa-house", path: "/" },
    { name: "Bảng công", icon: "fa-calendar-days", path: "/bang-cong" },
    { name: "Nhân viên", icon: "fa-user", path: "/nhan-vien" },
    { name: "Bộ phận", icon: "fa-users", path: "/bo-phan" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const index = items.findIndex((item) => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, items]);

  return (
    <div className="tools-list" style={{ position: "relative" }}>
      {/* Active box di chuyển theo vị trí mục được chọn */}
      <div
        className="active-box"
        style={{
          top: `${activeIndex * (itemHeight + 10)}px`, // Khoảng cách giữa các mục là 10px
        }}
      ></div>

      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`items ${index === activeIndex ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
          style={{ textDecoration: "none" }} // Để xóa underline
        >
          <div className="box">
            <div className="logo">
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <div className="name">{item.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeftContainer;
