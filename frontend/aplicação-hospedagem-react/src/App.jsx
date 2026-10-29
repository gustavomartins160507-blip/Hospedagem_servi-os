import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/indexPage'
import LoadApi from './pages/Carregarapi'
import Cadastro from './pages/cadastro'
import Login from './pages/login'
import ForgotPassword from './pages/esqueceuSenha'
function App() {
    return (

        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/api" element={<LoadApi />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/esqueceu-senha' element={<ForgotPassword />}/>
            <Route path='/cadastro' element={<Cadastro />}/>
        </Routes>
        
    )
}

export default App
