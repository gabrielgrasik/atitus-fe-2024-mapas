import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * interceptar o submit do form - ok
 * prevenir que o formulário recarregue toda a página - ok
 * definir os campos obrigatórios e suas configurações - ok
 * pegar os valores preenchidos nos inputs - ok
 * chamar a API passando o payload solicitado { email: aaa, senha: algumacoisa }
 * Endpoint:https://apibase2-0bttgosp.b4a.run/auth/signin
 * Payload: { email: "string", senha: "string" }
 * Método: POST
 * receber e tratar o retorno da api
 */

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();

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
      if (response.status != 200) {
        throw new Error();
      }

      const jsonWebToken = await response.text();

      console.log("Login funcionou", jsonWebToken);

      login(jsonWebToken);

      navigate("/home");
    } catch (error) {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <main className="d-flex flex-column align-items-center ">
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.jQVFA6Ro-isXWHm-DjrliQHaHa&pid=Api&P=0&h=180"
        alt=""
        width="150"
        className="my-4"
      />

      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label for="" className="form-label">
            E-mail:
          </label>
          <input type="email" className="form-control" name="email" required />
        </div>

        <div className="mb-3">
          <label for="" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            className="form-control"
            name="senha"
            minLenght={4}
            maxLength={12}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-3">
          Acessar
        </button>
      </form>

      <Link to="/register">Clique aqui e cadastre-se!</Link>
    </main>
  );
}
