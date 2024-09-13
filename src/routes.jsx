import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Index from './app/index';
import Demo from './app/demo';
import Login from './app/login';
import Error from './app/error404';
import PrivateRoute from './components/PrivateRoute'; // Đường dẫn tới PrivateRoute
import { UserProvider } from './context/UserContext'; // Đường dẫn tới UserContext

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Index />} />} />
          <Route path="/demo" element={<PrivateRoute element={<Demo />} />} />
          <Route path="/*" element={<Error />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
