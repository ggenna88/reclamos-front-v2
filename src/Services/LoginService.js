import React from "react";

const LoginService = async function login(username, password) {
  var URL = "http://localhost:8080/auth/login";
  var data = { username, password };

  console.log(JSON.stringify(data));

  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => alert(error));

  //   if (response.ok) {
  //     const data = await response.json();
  //     const token = data.token;
  //     console.log(token);
  //   } else {
  //     console.log("credenciales invalidas");
  //   }
};

export default LoginService;
