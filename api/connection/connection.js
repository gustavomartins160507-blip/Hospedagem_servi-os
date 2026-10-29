const { Sequelize, DataTypes, DATE,} = require('sequelize');
require('dotenv').config()


const connection = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
    
})

const Usuarios = connection.define("usuarios", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reset_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expire_token: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

connection.sync()
module.exports = {
    connection,
    Usuarios
}