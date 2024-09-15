import React, { useState } from "react";

const EmployeeForm = ({ isOpen, onClose, onSave }) => {
  const [employee, setEmployee] = useState({
    employeeCode: "",
    fullName: "",
    dob: "",
    address: "",
    accessCode: "",
    department: "",
    position: "",
    startDate: "",
    status: "",
    todayStatus: "",
    avatar: "",
    idCard: "",
    accountNumber: "",
    bank: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <h2>Thêm Nhân viên</h2>
        <div className="form-grid">
          <div>
            <label>
              Mã nhân viên:
              <input
                type="text"
                name="employeeCode"
                value={employee.employeeCode}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Họ và tên:
              <input
                type="text"
                name="fullName"
                value={employee.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ngày sinh:
              <input
                type="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Địa chỉ:
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mã truy cập:
              <input
                type="text"
                name="accessCode"
                value={employee.accessCode}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Bộ phận:
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Chức vụ:
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ngày bắt đầu làm việc:
              <input
                type="date"
                name="startDate"
                value={employee.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Trạng thái:
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
                required
              >
                <option value="">Chọn trạng thái</option>
                <option value="active">Chưa nghỉ việc</option>
                <option value="inactive">Nghỉ việc</option>
              </select>
            </label>
            <label>
              Trạng thái hôm nay:
              <select
                name="todayStatus"
                value={employee.todayStatus}
                onChange={handleChange}
                required
              >
                <option value="">Chọn trạng thái hôm nay</option>
                <option value="present">Đi làm</option>
                <option value="absent">Nghỉ</option>
              </select>
            </label>
            <label>
              Avatar:
              <input
                type="text"
                name="avatar"
                value={employee.avatar}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Căn cước công dân:
              <input
                type="text"
                name="idCard"
                value={employee.idCard}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Số tài khoản:
              <input
                type="text"
                name="accountNumber"
                value={employee.accountNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ngân hàng:
              <input
                type="text"
                name="bank"
                value={employee.bank}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>
        <button type="submit">Lưu</button>
        <button type="button" onClick={onClose}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
