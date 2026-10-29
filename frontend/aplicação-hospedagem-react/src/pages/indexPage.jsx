
import "../app.css";
import { useState, useEffect } from "react";

const IndexPage = () => {
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        telefone: ""

    });

    useEffect(() => {
        async function buscarApi() {
            
            try {

                const token = localStorage.getItem("token");

                const resposta = await fetch("http://localhost:3000/perfil", {

                    headers: {

                        authorization: `Bearer ${token}`
                        
                    }
                    
                });

                const dados = await resposta.json();

                if (!resposta.ok) {

                    console.log(dados);
                    return;

                }

                if(!token){
                    
                        console.log("Nenhum token encontrado. Faça login novamente.");
                        return;

                }

                setUsuario(dados);

            } catch (error) {

                console.error("Erro ao buscar perfil:", error);
            }
        }

        buscarApi();

    }, []);

    return (
        <div>

            <h1>Meu perfil</h1>
            <p>Nome: {usuario.nome}</p>
            <p>E-mail: {usuario.email}</p>
            <p>Telefone: {usuario.telefone}</p>

        </div>
    );
};

export default IndexPage;
