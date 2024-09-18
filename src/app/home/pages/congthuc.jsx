import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Congthuc = () => {
  const [activeTools, setActiveTools] = useState(false);
  // Hàm kiểm tra mã nhân viên có tồn tại hay không
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const listTools = [
    {
      name: "Hệ số giờ",
      count: "",
      link: "heso-gio",
    },
    {
      name: "Lịch nghỉ",
      count: "",
      link: "lichnghi",
    },
    {
      name: "Bảng lương",
      count: "",
      link: "bangluong",
    },
  ];
  return (
    <div className="main-sub">
      <div className="sub-layout">
        <div className="left-sub">
          <div className="list-department">
            {listTools.map((tools, idx) => (
              <div key={idx} className="department">
                <div
                  className={`items ${activeTools === idx ? "actives" : ""}`}
                  onClick={() => {
                    setActiveTools(idx);
                    navigate(
                      `/cong-thuc/${tools.link}` // Điều hướng đến route bộ phận
                    );
                  }}
                >
                  <div className="name">{tools.name}</div>
                  <div className="employee">{tools.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-sub">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Congthuc;
