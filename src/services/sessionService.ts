export function getSessionData() {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("useremail");
  return {
    name,
    email,
  };
}

export function clearSessionData() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("useremail");
}
