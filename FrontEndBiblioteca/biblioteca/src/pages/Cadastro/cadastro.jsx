import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import api from "../../services/api.js"; 
import './Cadastro.css'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeUser, setTyperUser] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const payload = {name, email, password, typeUser};
            const {data} = await api.post('/user', payload);

            console.log(data);

            toast.success('Login efetuado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });

            navigate('/'); 
            
        } catch(err) {
         
            alert(err.response?.data?.response || "Erro ao efetuar Cadastro.");
        }

    }
    return (
        <div className="pagina-login">
            <div className="item-right">
                <form className="form-login" onSubmit={handleRegister}>
                    <h2>Alpha Livraria</h2>

                    <label>Tipo de Usuario:
                        <input 
                            type="text"
                            placeholder='Informe seu tipo de usuário'
                            value={typeUser}
                            onChange={(e) => setTyperUser(e.target.value)}
                        />
                    </label>
                    
                    <label>Nome:
                        <input 
                            type="text"    
                            placeholder="Seu nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>Email:
                        <input 
                            type="email"    
                            placeholder="Seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>Senha:
                        <input 
                            type="password"
                            placeholder="Crie uma senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    
                    <button type="submit" className="botao-primario">
                        Criar Conta
                    </button>

                    <p className="sign-up">
                        Já tem conta?
                        {/* Link de volta para a tela de Login (raiz) */}
                        <Link to="/" style={{marginLeft: 5}}>
                            Faça login.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Register;