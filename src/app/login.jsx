import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/api"; // Đường dẫn tới file api.js
import qs from "qs"; // Để chuyển đổi dữ liệu đối tượng thành chuỗi URL-encoded

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const client_secret =
    "s5n3Dys2fO64XHmFJ6b24WvFKBDHBeLryCaJresHpZ5IIETV7QDxMET8rTSxd8mTfYIACWhtXyZkpZXTi9I8tPYUaKXFErcO0s75tmaHbwkElJNVt1TJe9L5KFJPOcxs";
  const client_id = "y9LneBmuh9I7e0jQs3gjt5X1T7X64IoOy9l6ZXMF";

  // Hàm kiểm tra và tự động đăng nhập nếu có token và thông tin tài khoản lưu trữ
  const checkAuth = async () => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        // Kiểm tra API để xác thực token
        const response = await api.get("/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          navigate("/");
        }
      } else {
        // Kiểm tra localStorage
        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");
        if (savedUsername && savedPassword) {
          setUsername(savedUsername);
          setPassword(savedPassword);
        }
      }
    } catch (err) {
      // Nếu có lỗi, không làm gì cả, người dùng vẫn ở trên trang login
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuth();
    try {
      window.electron.send("unmaximize");
      window.electron.send("resize", false);
    } catch (err) {
      console.error("Not support electron!");
    }
  }, []);

  const handleLogin = async (e) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    try {
      const response = await api.post(
        "/login/",
        qs.stringify({
          grant_type: "password",
          username: username,
          password: password,
          client_id: client_id,
          client_secret: client_secret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const token = response.data.access_token;
      const expirationTime = new Date();
      expirationTime.setTime(
        expirationTime.getTime() + 7 * 24 * 60 * 60 * 1000
      ); // 7 days in milliseconds
      document.cookie = `itoken=${token}; expires=${expirationTime.toUTCString()}; path=/`;
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="video-container"></div>
      <div className="login-container">
        <div className="login-box">
          <div className="header">Đăng nhập</div>
          <div className="hi">Chào mừng bạn quay trờ lại!</div>
          <div className="form">
            <div className="items">
              <div className="name">Tài khoản</div>
              <div className="value">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="tên truy cập...."
                />
              </div>
            </div>
            <div className="items">
              <div className="name">Mật khẩu</div>
              <div className="value">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="mật khẩu...."
                />
              </div>
            </div>
          </div>
          {error && <p>{error}</p>}
          <div className="login-btn">
            <button id="login-btn" onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
          <div className="with-zalo">
            <button>Đăng nhập bằng Zalo</button>
          </div>
          <div className="fc g4">
            <div className="flex register">Đăng ký tài khoản mới</div>
            <div className="flex forget-pass">Quên mật khẩu?</div>
            <div className="flex exit">Thoát</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
