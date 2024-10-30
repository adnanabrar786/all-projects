export function getToken() {
  return typeof localStorage !== "undefined" && localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
}

export function getDrawerOpen() {
  return typeof localStorage !== "undefined" && localStorage.getItem("open")
    ? JSON.parse(localStorage.getItem("open")!)
    : true;
}

export const clearLocalStorage = () => {
  localStorage.clear();
};
