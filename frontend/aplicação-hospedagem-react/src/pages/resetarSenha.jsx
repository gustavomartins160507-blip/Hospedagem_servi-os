
import "../app.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

    const ResetPassword = () => {

        const [senha, setSenha] = useState('')
        const [confirmar, setConfirmar] = useState('')
        const [mensagem, setMensagem] = useState('')
        const [sucesso, setSucesso] = useState(false)


        async function resetarSenha(event){
            event.preventDefault()
            const parametros = new URLSearchParams(window.location.search)
            const token = parametros.get('token')

            if(!token){
                setMensagem('token nao encontrado')
                return
            }

            try{
            
                const resposta = await fetch('http://localhost:3000/resetar-senha', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({
                    token: token,
                    senha: senha,
                    confirmar: confirmar

                })

            })

            const dados = await resposta.json()

            if(!resposta.ok){

                setMensagem(dados.mensagem || "Erro ao tentar redefinir a senha")
                return

            }

            setSucesso(true)
            setMensagem(dados.message);

            }catch(erro){

            console.erro(erro)
            setMensagem('Erro ao tentar conectar ao servidor')

            }

    }

    return (  
        
        <main>
            <form className="card" id="form-resetar" onSubmit={resetarSenha}>
                <h1>Redefinir senha</h1>
                <p className="subtitle">Digite sua nova senha abaixo.</p>

                <label htmlFor="novaSenha">Nova senha</label>
                <input
                    type="password"
                    id="novaSenha"
                    name="novaSenha"
                    placeholder="••••••••"
                    required
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />

                <label htmlFor="repetirSenha">Repetir senha</label>

                <input
                    type="password"
                    id="repetirSenha"
                    name="repetirSenha"
                    placeholder="••••••••"
                    required
                    value={confirmar}
                    onChange={(event) => setConfirmar(event.target.value)}

                />

                
                    <p

                    id="mensagem"
                    className="mensagem"
                    style={{ color: sucesso ? "green" : "red" }}
                >
                    {mensagem}
                </p>

                <button type="submit">Alterar senha</button>

                <Link to="/login" className="btn-voltar">

                    Voltar para o login

                </Link>
            </form>
        </main>
    );
};

export default ResetPassword;
