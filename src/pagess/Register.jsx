import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  /**
   * tratar o submit do form - ok
   * prevenir recarregar a tela - ok
   * pegar os campos digitados no form
   * fazer uma chamada ao endpoint de cadastro
   * tratar o seu retorno
   */

  const handleFormCadastroSubmit = async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value.trim();
    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();
    const endereco = event.target.endereco.value.trim();
    const cpf = event.target.cpf.value.trim();

    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            endereco,
            cpf,
            senha,
          }),
        }
      );

      if (response.status != 201) {
        throw new Error();
      }

      alert("Cadastro efetuado com sucesso!");

      // Redirecionar o usuário para a rota HOME
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <main className="d-flex flex-column align-items-center pb-5">
      <img
        src="https://tse4.mm.bing.net/th?id=OIP.jQVFA6Ro-isXWHm-DjrliQHaHa&pid=Api&P=0&h=180"
        alt=""
        width="120"
        className="my-4"
      />

      <form onSubmit={handleFormCadastroSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Nome:
          </label>
          <input name="nome" type="text" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            E-mail:
          </label>
          <input name="email" type="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Senha:
          </label>
          <input
            name="senha"
            type="password"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Endereço:
          </label>
          <input
            name="endereco"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            CPF:
          </label>
          <input
            minLength={11}
            maxLength={11}
            name="cpf"
            type="text"
            className="form-control"
            required
          />
          <p>CPF deve ser somente números</p>
        </div>

        <button type="submit" class="btn btn-primary mb-4">
          Cadastrar
        </button>
      </form>

      <Link to="/">Voltar para login</Link>
    </main>
  );
}
