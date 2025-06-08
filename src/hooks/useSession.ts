import { useEffect, useState } from "react";

export function useSession() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
 
  useEffect(() => {
    const name = localStorage.getItem("username");
    const mail = localStorage.getItem("useremail");

    if (name) setUsername(name);
    if (mail) setEmail(mail);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return { username, email, logout };
}
