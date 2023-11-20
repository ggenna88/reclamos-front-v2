async function GetAllUsers() {
       const token = localStorage.getItem("token");
     
       try {
         var bearer = "Bearer " + token;
         const response = await fetch("http://localhost:8080/users/all", {
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
     
     async function AddUser(user) {
       const token = localStorage.getItem("token");
     
       try {
         var bearer = "Bearer " + token;
         const response = await fetch("http://localhost:8080/auth/register", {
           method: "POST",
           withCredentials: true,
           body: JSON.stringify(user),
           headers: {
             Authorization: bearer,
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
         const username = user.username;
         const response = await fetch(
           "http://localhost:8080/users/update/" + username,
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
     
     async function UpdateUnidadUser(username, id_unidad) {
       const token = localStorage.getItem("token");
       const apiUrl = "http://localhost:8080/users/updateUnidad";
       const params = {
         username: username,
         id_unidad: id_unidad,
       };
     
       const urlWithParams = new URL(apiUrl);
       urlWithParams.search = new URLSearchParams(params).toString();
       try {
         var bearer = "Bearer " + token;
         const response = await fetch(urlWithParams, {
           method: "PUT",
           withCredentials: true,
           headers: {
             Authorization: bearer,
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
     
     async function RemoveUser(username) {
       const token = localStorage.getItem("token");
     
       try {
         var bearer = "Bearer " + token;
     
         const response = await fetch(
           "http://localhost:8080/users/delete?username=" + username,
           {
             method: "DELETE",
             withCredentials: true,
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
     
     async function GetUnidadByUsername(username) {
       const token = localStorage.getItem("token");
     
       try {
         var bearer = "Bearer " + token;
         const response = await fetch(
           "http://localhost:8080/users/unidad?user=" + username,
           {
             method: "GET",
             withCredentials: true,
             headers: {
               Authorization: bearer,
               "Content-Type": "application/json",
             },
             origin: "http://localhost:3000",
             credentials: "include",
             referrerPolicy: "strict-origin-when-cross-origin",
           }
         ).then((res) => res.json());
         return response;
       } catch (error) {
         console.error("Error:", error);
       }
     }
     
     export {
       GetAllUsers,
       AddUser,
       UpdateUser,
       RemoveUser,
       GetUnidadByUsername,
       UpdateUnidadUser,
     };
     