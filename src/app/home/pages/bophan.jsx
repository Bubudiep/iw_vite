import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate

const Bophan = () => {
  const [openDepartments, setOpenDepartments] = useState([]); // Lưu trữ danh sách các department đang mở
  const [activeRole, setActiveRole] = useState({
    deptIndex: null,
    roleIndex: null,
  }); // Thay đổi cấu trúc lưu activeRole
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const departments = [
    {
      name: "Engineer",
      employeeCount: 200,
      roles: [
        { name: "Software Engineer", count: 120 },
        { name: "Hardware Engineer", count: 80 },
      ],
    },
    {
      name: "Marketing",
      employeeCount: 150,
      roles: [
        { name: "Marketing Manager", count: 30 },
        { name: "SEO Specialist", count: 50 },
        { name: "Content Creator", count: 70 },
      ],
    },
    {
      name: "Sales",
      employeeCount: 180,
      roles: [
        { name: "Sales Manager", count: 20 },
        { name: "Sales Representative", count: 160 },
      ],
    },
    {
      name: "Human Resources",
      employeeCount: 120,
      roles: [
        { name: "HR Manager", count: 10 },
        { name: "HR Specialist", count: 110 },
      ],
    },
    {
      name: "Finance",
      employeeCount: 90,
      roles: [
        { name: "Finance Manager", count: 10 },
        { name: "Accountant", count: 80 },
      ],
    },
    {
      name: "Customer Support",
      employeeCount: 250,
      roles: [
        { name: "CS Manager", count: 20 },
        { name: "CS Agent", count: 230 },
      ],
    },
  ];

  // Toggle mở hoặc đóng department
  const toggleDepartment = (deptIndex) => {
    if (openDepartments.includes(deptIndex)) {
      setOpenDepartments(
        openDepartments.filter((index) => index !== deptIndex)
      ); // Đóng department
    } else {
      setOpenDepartments([...openDepartments, deptIndex]); // Mở department
    }
  };

  return (
    <div className="main-sub">
      <div className="sub-layout">
        <div className="left-sub">
          <div className="list-department">
            {departments.map((department, deptIndex) => (
              <div key={deptIndex} className="department">
                <div
                  className={`items ${
                    openDepartments.includes(deptIndex) ? "active" : ""
                  }`}
                  onClick={() => {
                    toggleDepartment(deptIndex);
                    setActiveRole({ deptIndex: null, roleIndex: null }); // Reset active role when changing department
                    navigate(
                      `/bo-phan/department/${encodeURIComponent(
                        department.name
                      )}` // Điều hướng đến route bộ phận
                    );
                  }}
                >
                  <div className="name">{department.name}</div>
                  <div className="employee">{department.employeeCount}</div>
                </div>
                {openDepartments.includes(deptIndex) && (
                  <div className="roles">
                    {department.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className={`role ${
                          activeRole.deptIndex === deptIndex &&
                          activeRole.roleIndex === roleIndex
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveRole({ deptIndex, roleIndex }); // Lưu cả deptIndex và roleIndex
                          navigate(
                            `/bo-phan/department/${encodeURIComponent(
                              department.name
                            )}/role/${encodeURIComponent(role.name)}`
                          ); // Điều hướng đến route vị trí
                        }}
                      >
                        <div className="active" />
                        <div className="role-name">{role.name}</div>
                        <div className="role-count">{role.count}</div>
                      </div>
                    ))}
                  </div>
                )}
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

export default Bophan;
