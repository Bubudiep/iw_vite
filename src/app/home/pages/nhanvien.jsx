import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Nhanvien = () => {
  const [activeTools, setActiveTools] = useState(false);
  // Hàm kiểm tra mã nhân viên có tồn tại hay không
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const listTools = [
    {
      name: "Quản lý nhân viên",
      count: 200,
      link: "quanly-nhanvien",
    },
    {
      name: "Phân quyền",
      count: "",
      link: "phanquyen-nhanvien",
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
                      `/nhan-vien/${tools.link}` // Điều hướng đến route bộ phận
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

export default Nhanvien;
