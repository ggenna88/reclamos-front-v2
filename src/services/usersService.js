/*async function GetAllUsers(token) {

  const response = fetch("http://localhost:8080/users/all", {
    method: "GET",
    credentials: 'include',
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: {
      Authorization: "Bearer " + {token},
      "Content-Type": "application/json",
    }
  })
    .catch(error => console.log('Error',error));
    
    return response;
  }
/*
export async function AddUser(user) {

  const {auth} = useAuth();

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      withCredentials: true,
      body: JSON.stringify(user),
      headers: {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
      origin: "http://localhost:3000",
      credentials: "include",
      referrerPolicy: "strict-origin-when-cross-origin",
    }).then((res) => res.ok);
    
    return response;

  } catch (error) {
    console.error("Error:", error);
  }
}

async function UpdateUser(user) {
  const token = localStorage.getItem("token");

  try {
    var bearer = "Bearer " + token;
    const response = await fetch(
      "http://localhost:8080/users/update/{username}",
      {
        method: "PUT",
        withCredentials: true,
        body: JSON.stringify(user),
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        origin: "http://localhost:3000",
        credentials: "include",
        referrerPolicy: "strict-origin-when-cross-origin",
      }
    ).then((res) => res.ok);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default AddUser;*/