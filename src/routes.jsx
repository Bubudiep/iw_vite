import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Index from "./app/home";
import Trangchu from "./app/home/pages";
import Demo from "./app/demo";
import Login from "./app/login";
import Error from "./app/error404";
import PrivateRoute from "./components/PrivateRoute"; // Đường dẫn tới PrivateRoute
import { UserProvider } from "./context/UserContext"; // Đường dẫn tới UserContext
import Bangcong from "./app/home/pages/bangcong";
import Bophan from "./app/home/pages/bophan";
import Department from "./app/home/pages/bophan/phongban"; // Import component Department
import Role from "./app/home/pages/bophan/vitri"; // Import component Role
import Nhanvien from "./app/home/pages/nhanvien";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Index />} />}>
          <Route index element={<Trangchu />} />
          <Route path="/bang-cong" element={<Bangcong />} />
          <Route path="/bo-phan" element={<Bophan />}>
            <Route
              path="/bo-phan/department/:deptName"
              element={<Department />}
            />
            <Route
              path="/bo-phan/department/:deptName/role/:roleName"
              element={<Role />}
            />
          </Route>
          <Route path="/nhan-vien" element={<Nhanvien />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/*" element={<Error />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
