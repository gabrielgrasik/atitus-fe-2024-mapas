import { Link } from "react-router-dom";

/**
 * interceptar o submit do form - ok
 * prevenir que o formulario recarregue toda a página - ok
 * definir os imputs obrigatórios e suas configurações - ok
 * pegar os valores preenchidos nos inputs
 * chamar a API passando o payload solictado
 * ** Endpoint: https://apibase2-0bttgosp.b4a.run/auth/signin
 ** payload: { email: "string", senha: "string" }
 * receber e tratar o retorno da API
 */

export function Login() {
  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const senha = event.target.senha.value;

    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }
    try {
      const response = await fletch(
        "https://apibase2-0bttgosp.b4a.run/auth/signin",
        {
          method: "POST",
          headers: {
            "Constant-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (response.status != 200) {
        throw new Error("Usuário ou senha inválidos");
      }

      const jsonWebToken = await response.text();

      console.log("Login funcionou", jsonWebToken);
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  };
  return (
    <main className="d-flex flex-column align-items-center">
      <img src="https://placehold.co/120" alt="" width="120" className="my-4" />

      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label for="" className="form-label">
            Email:
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
            minLength={4}
            maxLength={12}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary mb-4">
          Acessar
        </button>
      </form>

      <Link to="/register">Cadastrar nova conta</Link>
    </main>
  );
}
