const { Usuarios, connection } = require('../connection/connection');
const { parsePhoneNumberFromString } = require('libphonenumber-js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({

    service: 'gmail',

    auth: {

        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS

    }

})

function validarNumero(numero){

    const telefone = parsePhoneNumberFromString(numero, 'BR')

    if (!telefone || !telefone.isValid()) {

        return false

    }
    

    return "Telefone valido"


}


function validarcpf(cpf) {

    cpf = cpf.replace(/\D/g, '')

    if (cpf.length != 11) {

        return "CPF inválido, menos que 11 números"

    }

    const proximoDigitoVerificador = (cpfIncompleto) => {
       
        let somatoria = 0

        for (let i = 0; i < cpfIncompleto.length; i++) {

            let digitoAtual = cpfIncompleto.charAt(i)

            let constante = cpfIncompleto.length + 1 - i

            somatoria += Number(digitoAtual) * constante
        }

        const resto = somatoria % 11

        return resto < 2 ? "0" : (11 - resto).toString()
    }

    let primeiroDigitoVerificador =
        proximoDigitoVerificador(cpf.substring(0, 9))

    let segundoDigitoVerificador =
        proximoDigitoVerificador(
            cpf.substring(0, 9) + primeiroDigitoVerificador
        )

    let cpfCorreto =

        cpf.substring(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador

    if (cpf != cpfCorreto) {
        return "CPF inválido, dígitos verificadores não conferem"
    }

    return "CPF válido"

}



function validarusuario(dados) {

    const { email, senha, confirmar, cpf, telefone } = dados

    const cpfNumeros = String(cpf || '').replace(/\D/g, '')

    if (!email || email.indexOf("@gmail.com") == -1) {

        return "email inválido"
    }

    if (!senha || senha.length < 8) {

        return "senha inválida"
    }

    if (confirmar != senha) {

        return "campo confirmar senha diferente"

    }

    if (cpf) {

        const resultadoCpf = validarcpf(cpfNumeros)

        if (resultadoCpf != "CPF válido") {

            return resultadoCpf

        }
    }

    if (telefone) {

        const resultadoNumero = validarNumero(telefone)

        if (resultadoNumero != "Telefone valido") {

            return "telefone inválido"

        }

    }

}


class Usuarioscontroller {

async novousuario(request, response) {

    try {
        const erro = validarusuario(request.body);

        if (erro) {
            return response.status(400).json({
                message: erro
            });
        }

        const { confirmar, ...dadosUsuario } = request.body;

        dadosUsuario.senha = await bcrypt.hash(

            dadosUsuario.senha,

            10
        );

        const usuarios = await Usuarios.create(dadosUsuario);

        const token = jwt.sign(
            {
                id: usuarios.id,
                email: usuarios.email
            },

            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return response.status(201).json({
            
            message: "Usuário cadastrado com sucesso",
            token: token
        });

    } catch (error) {
        console.error(error);

        return response.status(400).json({
            message: 'Erro ao cadastrar',
            detalhe: error.message
        });
    }
}

    async listarusuarios(request, response) {

        try {

            const dados = await Usuarios.findAll()

            return response.json(dados)

        } catch(error) {

            return response.status(500).json({

                mensagem: 'Erro ao listar',
                detalhe: error.message

            })
        }
    }

    async apagarusuario(request,response){

        try {

            const dados = await Usuarios.findByPk(request.params.id)

            if(!dados){

                return response.json({
                    message:"Usuario nao encontrado"

                })

            }

            await dados.destroy()
            
            return response.status(204).send()

        }
        
        catch(error){
            
            console.log('Erro ao listar')

        }
    }


    async login(request,response){

    try{

        const {email, senha} = request.body

        const usuario = await Usuarios.findOne({

            where: {
                email:email
            }

        })

        if(!usuario){

            return response.status(401).json({

                message:"Email ou senha invalidos"

            })
        }

        const senhaCorreta = await bcrypt.compare(

            senha, usuario.senha

        )
        
        if(!senhaCorreta){

            return response.status(401).json({

                message:"Email ou senha invalidos"

            })
        }

        const token = jwt.sign({
            id:usuario.id,
            email:usuario.email
        },process.env.JWT_SECRET,{

            expiresIn:'1h'

        }

        )
        
        return response.status(200).json({
            message:"Login realizado com sucesso",
            token:token
        })
    }

    catch(error){

        console.error(error)

        return response.status(400).json({

            message:"Nao foi possivel realizar o login"

        })
    }

    }

    async perfil(request, response) {

        try {
    
            const usuario = await Usuarios.findByPk(
                request.usuario.id
            );
    
            if (!usuario) {
                return response.status(404).json({
                    message: "Usuario nao encontrado"

                });
            }
    
            return response.status(200).json({

                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone

            });
    
        } catch(error) {
    
            console.error(error);
    
            return response.status(500).json({

                message: "Nao foi possivel buscar o perfil"

            });
        }
        
    }

    async esqueceu_senha(request, response){
        
        try{

            const {email} = request.body

            const usuario = await Usuarios.findOne({

                where:{
                    email:email
                }

            })

            if(!usuario){
                return response.status(400).json({
                    message:"usuario nao encontrado"
                })
            }

            const token = crypto.randomBytes(32).toString('hex')

            const expiracao = Date.now() + 15 * 60 * 1000

            const timestamp = Date.now()

            const datahora = new Date(timestamp).toLocaleString('pt-BR', {

                dateStyle: 'short',
                timeStyle: 'short'
                
              });

            usuario.reset_token = token
            usuario.expire_token = expiracao

            await usuario.save()

            const link = `http://localhost:5173/resetar-senha?token=${token}`;

            await transport.sendMail({

                from:process.env.EMAIL_USER,

                to:usuario.email,

                subject: 'Redefinição de senha',
                

                html: `<h1> Redefinição de senha </h1>

                        <p>você solicitou a redefinição de senha</p>

                        <a href="${link}">
                        Redefinir minha senha
                        </a>


                        <p>Esse link expira em 15 minutos...data atual: ${datahora}</p>
                `
            })

            return response.status(200).json({

                message: "token enviado com sucesso, verificar email"

            })

        } catch(error){

            return response.status(400).json({

                message:"Problema ao enviar o token"

            })
        }
    }


    async resetar_senha(request, response) {

        try {
    
            const { token, senha, confirmar } = request.body
    
            if (!token || !senha || !confirmar) {
                return response.status(400).json({
                    message: "Insira todos os campos"
                })
            }
    
            if (senha !== confirmar) {
                return response.status(400).json({
                    message: "As senhas nao sao iguais"
                })
            }
    
            if (senha.length < 8) {

                return response.status(400).json({

                    message: "A senha tem menos que 8 caracteres"

                })

            }
    
            const usuario = await Usuarios.findOne({
                where: {
                    reset_token: token
                }
            })
    
            if (!usuario) {
                return response.status(400).json({
                    message: "Token invalido"
                })
            }
    
            if (Date.now() > usuario.expire_token) {
    
                return response.status(400).json({ 

                    message: "Token expirado"
                    
                })
            }
    
            const novoHash = await bcrypt.hash(senha, 10)
    
            usuario.senha = novoHash
            usuario.reset_token = null
            usuario.expire_token = null
    
            await usuario.save()
    
            return response.status(200).json({
                message: "Senha redefinida com sucesso"
            })
    
        } catch (error) {
    
            console.error(error)
    
            return response.status(400).json({

                message: "Problema ao resetar"

            })
        }
    }
}

module.exports = new Usuarioscontroller