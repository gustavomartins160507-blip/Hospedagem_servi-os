
import "../App.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState('')


    async function verificarLogin(event) {
        event.preventDefault();

        try {

            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: password
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {

                setMensagem(
                    dados.mensagem ||
                    dados.message ||
                    'Erro ao tentar fazer o login'
                );

                return;
            }

            localStorage.setItem("token", dados.token);

            setMensagem('Login realizado com sucesso');
            
            navigate('/');

        } catch (error) {

            console.error(error);
            setMensagem('Não foi possível se conectar ao servidor');
            
        }
    }



    return (
        <>
        <div>
        <h1>Login</h1>

            <form onSubmit={(event) => {
                    verificarLogin(event);
                    redirecionar();
            }}>
            <div>
                <label htmlFor="email">E-mail</label>

                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="senha">Senha</label>

                <input
                    type="password"
                    id="senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required

                />
            </div>

            <button type="submit">Entrar</button>
        </form>

        <p id="mensagem-form">{mensagem}</p>

        <Link to={'/esqueceu-senha'} id="Link">esqueceu a senha?</Link>

    </div>
        </>
    )
}

export default Login
