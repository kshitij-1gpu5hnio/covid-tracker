export const addStatetoLocalStorage = (state, next) => {
      console.log(state);
      localStorage.setItem("state", JSON.stringify(state));
      next();
};

export const loadStateFromStorage = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("state")) {
        return JSON.parse(localStorage.getItem("state"));
      }
    }
  };