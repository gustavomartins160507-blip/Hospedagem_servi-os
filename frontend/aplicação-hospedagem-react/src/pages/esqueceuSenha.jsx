
import "../app.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [mensagem, setMensagem] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    async function recuperarSenha(event) {
        event.preventDefault();

        try {
            const resposta = await fetch(

                "http://localhost:3000/esqueci-senha",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(dados.message);
                setCorMensagem("red");
                return;
        }

            setMensagem(dados.message);

        } catch (erro) {
            console.error(erro);
            setMensagem("Erro ao conectar com o servidor");
        }
    }

    return (

        <form onSubmit={recuperarSenha}>
            
            <h1 className="recuperarSenha">Esqueceu sua senha?</h1>
            <p className="recuperarSenha">Informe seu e-mail para continuar.</p>

            <label htmlFor="forgot-email">E-mail</label>

            <input
                id="forgot-email"
                name="email"
                type="email"
                placeholder="voce@exemplo.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <button type="submit">
                Enviar instruções
            </button>

            <p id="mensagem_token">{mensagem}</p>

        </form>
    );
};

export default ForgotPassword;
