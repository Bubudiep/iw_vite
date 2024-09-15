import React from "react";
import { useParams } from "react-router-dom";

const Role = () => {
  const { deptName, roleName } = useParams();
  const decodedDeptName = decodeURIComponent(deptName);
  const decodedRoleName = decodeURIComponent(roleName);

  // Bạn có thể thêm logic để lấy thông tin chi tiết về vai trò dựa trên decodedDeptName và decodedRoleName

  return (
    <div>
      <h2>Bộ phận: {decodedDeptName}</h2>
      <h3>Vị trí: {decodedRoleName}</h3>
      {/* Hiển thị thêm thông tin về vai trò */}
    </div>
  );
};

export default Role;
