import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Correct import

export function Login() {
  const { login } = useContext(UserContext); // Accessing the login function

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const senha = event.target.senha.value;

    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }

    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (response.status !== 200) {
        throw new Error("Usuário ou senha inválidos");
      }

      const jsonWebToken = await response.text();
      console.log("Login funcionou", jsonWebToken);

      login(jsonWebToken); // Store the token in context
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <main className="d-flex flex-column align-items-center">
      <img src="https://placehold.co/120" alt="" width="120" className="my-4" />
      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input
            type="password"
            className="form-control"
            name="senha"
            minLength={4}
            maxLength={12}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-4">
          Acessar
        </button>
      </form>

      <Link to="/register">Cadastrar nova conta</Link>
    </main>
  );
}
