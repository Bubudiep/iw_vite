import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/api'; // Đường dẫn tới file api.js
import qs from 'qs';  // Để chuyển đổi dữ liệu đối tượng thành chuỗi URL-encoded

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const client_secret="ZOftAFxAiGjTRGq7gv6maDONnyTjYUO3XnLImvMdUJbzC0Zxc7ofkwfOCJUWwC8cLwMi5cgEm1bnwKo6ApDiXYBDYJUDNUNmv9bFJWRUjDMzSg6hoRmEl2nM2BHNnxCJ";
  const client_id="WKaWvGthBMD8boZQJuzgBrCOR8wVvymnF5DwYjVv";

  // Hàm kiểm tra và tự động đăng nhập nếu có token và thông tin tài khoản lưu trữ
  const checkAuth = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (token) {
        // Kiểm tra API để xác thực token
        const response = await api.get('/user', { headers: { Authorization: `Bearer ${token}` } });
        if (response.data) {
          navigate('/');
        }
      } else {
        // Kiểm tra localStorage
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
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
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    try {
      const response = await api.post("/login/",qs.stringify({
        grant_type:"password",
        username:username,
        password:password,
        client_id:client_id,
        client_secret:client_secret,
      }),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }});
      const token = response.data.access_token;
      document.cookie = `token=${token}; path=/`;
      navigate('/');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
