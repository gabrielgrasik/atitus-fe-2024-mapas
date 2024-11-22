import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Header() {
  const { logout } = useContext(UserContext);
  return (
    <header
      className="navbar bg-dark border-bottom border-body d-flex P-2"
      data-bs-theme="dark"
    >
      <h2 className="text-white">Logo</h2>
      <button className="btn btn-priamry" onClick={() => logout()}>
        Sair
      </button>
    </header>
  );
}
