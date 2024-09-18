import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import employees from "./employees";
import EmployeeForm from "./EmployeeForm";

const QuanlyNV = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState(employees);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const isEmployeeCodeExist = (code) => {
    return data.some((employee) => employee.employeeCode === code);
  };

  const handleAdd = (newEmployee) => {
    if (isEmployeeCodeExist(newEmployee.employeeCode)) {
      alert("Mã nhân viên đã tồn tại.");
      return;
    }

    const newEmployeeWithId = {
      ...newEmployee,
      employeeCode: newEmployee.employeeCode || `EMP${Date.now()}`,
    };

    setData([...data, newEmployeeWithId]);
    setIsPopupOpen(false);
  };

  const validateData = (data) => {
    const requiredFields = [
      "employeeCode",
      "fullName",
      "dob",
      "address",
      "accessCode",
      "department",
      "position",
      "startDate",
      "status",
      "todayStatus",
      "avatar",
      "idCard",
      "accountNumber",
      "bank",
    ];

    return data.every((item) =>
      requiredFields.every((field) => item.hasOwnProperty(field))
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data, {
      header: [
        "employeeCode",
        "fullName",
        "dob",
        "address",
        "accessCode",
        "department",
        "position",
        "startDate",
        "status",
        "todayStatus",
        "avatar",
        "idCard",
        "accountNumber",
        "bank",
      ],
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nhân viên");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "nhanvien.xlsx"
    );
  };
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(new Uint8Array(evt.target.result), {
        type: "array",
      });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(ws);

      if (validateData(importedData)) {
        const uniqueData = importedData.filter(
          (item) => !isEmployeeCodeExist(item.employeeCode)
        );
        if (uniqueData.length > 0) {
          setData([...data, ...uniqueData]);
        } else {
          alert("File không có dữ liệu mới.");
        }
      } else {
        alert("File không đúng định dạng.");
      }
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="flex flex-1 flex-col p-2 gap-2">
      <EmployeeForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleAdd}
      />
      <div className="white-nav">
        <div className="left">
          <button onClick={() => setIsPopupOpen(true)}>Thêm Nhân viên</button>
        </div>
        <div className="right">
          <label htmlFor="nhanvien_upload">Nhập excel</label>
          <input
            type="file"
            id="nhanvien_upload"
            className="hidden"
            onChange={handleImport}
            accept=".xlsx, .xls"
          />
          <button onClick={handleExport}>Xuất Excel</button>
        </div>
      </div>
      <div className="employeer-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort("todayStatus")}>Trạng thái</th>
              <th onClick={() => handleSort("employeeCode")}>Mã nhân viên</th>
              <th onClick={() => handleSort("fullName")}>Họ và tên</th>
              <th onClick={() => handleSort("dob")}>Ngày sinh</th>
              <th onClick={() => handleSort("address")}>Địa chỉ</th>
              <th onClick={() => handleSort("accessCode")}>Mã khóa</th>
              <th onClick={() => handleSort("department")}>Bộ phận</th>
              <th onClick={() => handleSort("position")}>Chức vụ</th>
              <th onClick={() => handleSort("startDate")}>Ngày bắt đầu</th>
              <th onClick={() => handleSort("idCard")}>CCCD</th>
              <th onClick={() => handleSort("accountNumber")}>Số tài khoản</th>
              <th onClick={() => handleSort("bank")}>Ngân hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.employeeCode}>
                <td className="isOut">
                  {employee.status === "Chưa nghỉ việc" ? (
                    <div className="work" title={employee.status}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  ) : (
                    <div className="notwork" title={employee.status}>
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  )}
                </td>
                <td className="isWork">
                  {employee.status === "Chưa nghỉ việc"
                    ? employee.todayStatus
                    : "Thôi việc"}
                </td>
                <td>{employee.employeeCode}</td>
                <td>{employee.fullName}</td>
                <td>{employee.dob}</td>
                <td>{employee.address}</td>
                <td>{employee.accessCode}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.startDate}</td>
                <td>{employee.idCard}</td>
                <td>{employee.accountNumber}</td>
                <td>{employee.bank}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="edit">Sửa</button>
                    <button className="remove">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuanlyNV;
