import React from "react";

const LoginService = async function login(username, password) {
  var URL = "http://localhost:8080/auth/login";
  var data = { username, password };

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());

    const token = await response.token;

    return token;
  } catch (error) {
    // Handle fetch errors or JSON parsing errors
    console.error("Login error:", error);
    throw new Error("Error during login process");
  }
};

export default LoginService;
