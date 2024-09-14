import React, { useState } from "react";

const Bophan = () => {
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [activeRole, setActiveRole] = useState(null);

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

  return (
    <div className="main-sub">
      <div className="sub-layout">
        <div className="left-sub">
          <div className="search-box">
            <div className="search-box-inner">
              <label htmlFor="searchDepartment">
                <i className="fas fa-search"></i>
              </label>
              <input id="searchDepartment" type="text" placeholder="Tìm kiếm" />
            </div>
          </div>
          <div className="list-department">
            {departments.map((department, deptIndex) => (
              <div key={deptIndex} className="department">
                <div
                  className={`items ${
                    activeDepartment === deptIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveDepartment(deptIndex);
                    setActiveRole(null); // Reset active role when changing department
                  }}
                >
                  <div className="name">{department.name}</div>
                  <div className="employee">{department.employeeCount}</div>
                </div>
                {activeDepartment === deptIndex && (
                  <div className="roles">
                    {department.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className={`role ${
                          activeRole === roleIndex ? "active" : ""
                        }`}
                        onClick={() => setActiveRole(roleIndex)}
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
      </div>
    </div>
  );
};

export default Bophan;
