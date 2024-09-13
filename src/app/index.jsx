import React, { useEffect, useState, useContext } from 'react';
import api from '../components/api'; // Đường dẫn tới file api.js
import { UserContext } from '../context/UserContext'; // Đường dẫn tới UserContext

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useContext(UserContext);
  console.log(user);
  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default Index;
