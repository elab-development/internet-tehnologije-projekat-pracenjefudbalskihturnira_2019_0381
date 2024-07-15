import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Password reset failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    localStorage.removeItem("user");
  }
};

export default {
  register,
  login,
  resetPassword,
  logout,
};
