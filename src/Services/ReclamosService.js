async function GetReclamo() {
  const token = localStorage.getItem("token");

  try {
    var bearer = "Bearer " + token;
    const response = await fetch("http://localhost:8080/reclamo/all", {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      origin: "http://localhost:3000",
      credentials: "include",
      referrerPolicy: "strict-origin-when-cross-origin",
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { GetReclamo };