import {Link} from 'react-router-dom'

const AuthLinks = () =>{

    return(

        <div>
            <Link to="/cadastro">
                Cadastre-se
            </Link>
            
            <Link to="/login">
            Entrar
            </Link>
        </div>
    )
}

export default AuthLinks