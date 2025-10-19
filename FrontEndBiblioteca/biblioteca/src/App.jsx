import './App.css'
import Index from './pages/Login/index'
import Register from './pages/Cadastro/cadastro'
import Home from './pages/home/index'
import ListarLivro from './pages/listar/index'
import Admin from './pages/admin/index'
import Novidade from './pages/novidade/index'
import Configuracoes from './pages/Configuracoes/Index'
import NaoAchou from './pages/not-found/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🎯 IMPORTANTE: Importe Routes e Route do react-router-dom
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        {/* Rota de Login: Acessada via / (raiz) */}
        <Route path="/" element={<Index />} />
        
        {/* Rota de Cadastro: Acessada via /registrar */}
        <Route path="/registrar" element={<Register />} />
        
        {/* 🎯 Rota de Dashboard: Use 'Home' ou 'Admin' aqui, não 'Index' novamente */}
        <Route path="/dashboard" element={<Home />} />
        
        {/* Rota de Listagem de Livros */}
        <Route path="/livros" element={<ListarLivro />} />

        {/* Rota da Área Administrativa */}
        <Route path="/admin" element={<Admin />} />

        <Route path="/novidades" element={<Novidade />} />

        <Route path="/config" element={<Configuracoes/>} />

        {/* Rota 404 (Não Encontrada): Use o path="*" */}
        <Route path="*" element={<NaoAchou />} />

      </Routes>
      
      {/* O ToastContainer deve ser renderizado fora das Routes */}
      <ToastContainer /> 
    </>
  );
}

export default App;