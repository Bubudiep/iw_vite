import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Congthuc = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [activeTools, setActiveTools] = useState(false);
  const listTools = [
    {
      name: "Chia ca",
      des: "Khung giờ của ca ngày, ca đêm, thêm ca và thêm khung giờ làm việc.",
      link: "chiaca",
    },
    {
      name: "Phân loại ngày",
      des: "Ngày thường, lễ, nghỉ, cắt phép, ngày bất thường phân bổ và tính hệ số và ghi chú.",
      link: "bangluong",
    },
    {
      name: "Quy tắc",
      des: "Quy tắc bổ sung, chi tiết hơn cho các kiểu ngày, kiểu ca, cách tính giờ tăng ca và hệ số.",
      link: "bangluong",
    },
    {
      name: "Lương",
      des: "Định dạng lương chung của cả công ty bao gồm các mục chung và cách tính lương",
      link: "bangluong",
    },
    {
      name: "Mức lương mặc định",
      des: "Mức lương mặc định cho các vị trí đặc thì có lượng lớn và mức lương là như nhau.",
      link: "heso-gio",
    },
    {
      name: "Bảng lương chi tiết",
      des: "Bảng lương chi tiết cho cacsv vị trí riêng biệt, có thể thêm cả mức lương mặc định",
      link: "bangluong",
    },
  ];
  // Cập nhật activeTool dựa trên đường dẫn hiện tại
  useEffect(() => {
    const currentPath = location.pathname.split("/").pop(); // Lấy phần cuối của URL
    const activeIndex = listTools.findIndex(
      (tool) => tool.link === currentPath
    );
    setActiveTools(activeIndex);
  }, [location.pathname]); // Chạy lại khi đường dẫn thay đổi
  return (
    <div className="main-sub">
      <div className="sub-layout">
        <div className="left-sub-app">
          <div className="list-department">
            {listTools.map((tools, idx) => (
              <div key={idx} className="department">
                <div
                  className={`items ${activeTools === idx ? "actives" : ""}`}
                  title={tools.des}
                  onClick={() => {
                    setActiveTools(idx);
                    navigate(
                      `/cong-thuc/${tools.link}` // Điều hướng đến route bộ phận
                    );
                  }}
                >
                  <div className="left">
                    <div className="name">{tools.name}</div>
                    <div className="des">{tools.des}</div>
                  </div>
                  <div className="right">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
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
