
import "../app.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cadastro = () =>{
    const Navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [termos, setTermos] = useState(false);

    async function verificarCep(valor){
        const cepLimpo = valor.replace(/\D/g, '');

        setCep(cepLimpo)
    
        if(cepLimpo.length !==8){
            return
        }

        try{

            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            
            const dadosCEP = await resposta.json()

            if (dadosCEP.erro) {

                setEndereco('');
                setBairro('');
                setCidade('');
                setUf('');
                return;
            }

            setEndereco(dadosCEP.logradouro || '')
            setBairro(dadosCEP.bairro || '')
            setCidade(dadosCEP.localidade || '')
            setUf(dadosCEP.uf || '')

        }
        catch(error){

            console.error(error)
        }
    }

    async function enviarback(event){
        event.preventDefault();

        const dados = {
            
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            senha: senha,
            confirmar: confirmar,
            cep: cep,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf

        };

        try{

            const resposta = await fetch('http://localhost:3000/cadastrar', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(dados)
            })

            const resultado = await resposta.json()

            console.log(resultado)
    
            if (!resposta.ok) {
                alert(
                    resultado.mensagem ||
                    resultado.message ||
                    'Erro ao cadastrar'
                );

                return;
                console
            } 

            alert('Usuário cadastrado com sucesso');

            setNome('');
            setEmail('');
            setCpf('');
            setTelefone('');
            setSenha('');
            setConfirmar('');
            setCep('');
            setEndereco('');
            setNumero('');
            setBairro('');
            setCidade('');
            setUf('');
            setTermos(false);


            localStorage.setItem("token",resultado.token)

            Navigate('/')

        }

        catch(error){
            console.error(error)
            alert('Não foi possível conectar ao servidor');
        }
    }

    return(
        
    <form onSubmit={enviarback}>
        <h1>Cadastro</h1>

        <label htmlFor="nome">Nome</label>
        <input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
        />

        <label htmlFor="email">E-mail</label>
        <input
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />

        <label htmlFor="cpf">CPF</label>
        <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
        />

        <label htmlFor="telefone">Telefone</label>
        <input
            id="telefone"
            type="tel"
            placeholder="+55 85 99999-9999"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
        />

        <label htmlFor="senha">Senha</label>
        <input
            id="senha"
            type="password"
            placeholder="Mínimo de 8 caracteres"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            minLength={8}
            required
        />

        <label htmlFor="confirmar">Confirmar senha</label>
        <input
            id="confirmar"
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmar}
            onChange={(event) => setConfirmar(event.target.value)}
            minLength={8}
            required
        />

        <label htmlFor="cep">CEP</label>
        <input
            id="cep"
            type="text"
            placeholder="00000000"
            value={cep}
            onChange={(event) => verificarCep(event.target.value)}
            maxLength={8}
            required
        />

        <label htmlFor="endereco">Endereço</label>

        <input
            id="endereco"
            type="text"
            placeholder="Rua ou avenida"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
        />

        <label htmlFor="numero">Número</label>
        <input
            id="numero"
            type="text"
            placeholder="Número da residência"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
            required
        />

        <label htmlFor="bairro">Bairro</label>
        <input
            id="bairro"
            type="text"
            placeholder="Digite seu bairro"
            value={bairro}
            onChange={(event) => setBairro(event.target.value)}
            required
        />

        <label htmlFor="cidade">Cidade</label>
        <input
            id="cidade"
            type="text"
            placeholder="Digite sua cidade"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
            required
        />

        <label htmlFor="uf">UF</label>
        <input
            id="uf"
            type="text"
            placeholder="CE"
            value={uf}
            onChange={(event) => setUf(event.target.value)}
            maxLength={2}
            required
        />

        <label>
            <input
            type="checkbox"
            checked={termos}
            onChange={(event) => setTermos(event.target.checked)}
            required
            />
            Aceito os termos
        </label>

        <button type="submit">Cadastrar</button>
    </form>

    );
}

export default Cadastro;
