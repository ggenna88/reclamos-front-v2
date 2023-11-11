export const usersAdminReducer = (state = [], action) => {
  switch (action.type) {
    case "loadingUsers":
      return action.payload;
    case "addUser":
      return [
        ...state,
        {
          ...action.payload,
          id: new Date().getTime(),
        },
      ];
    case "removeUser":
      return state.filter((user) => user.id !== action.payload);
    case "updateUser":
      return state.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
            passsword: u.passsword,
          };
        }
        return u;
      });
    default:
      return state;
  }
};
