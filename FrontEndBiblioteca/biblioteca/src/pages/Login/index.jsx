import capa from "../../assets/biblioteca.jpg";
import "../Login/Login.css";
import { useState } from "react";
import api from "../../services/api.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; 

function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate(); 

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const payload = {email, password};
            const {data} = await api.post('/login', payload);
            sessionStorage.setItem("tokenJwt", data.token)

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

            sessionStorage.setItem("tokenJwt", data.token);
            
            navigate('/dashboard'); 
            
        } catch(err) {
         
            alert(err.response?.data?.response || "Erro ao efetuar login.");
        }

    }
    return (
          <>
            <div className="pagina-login">
                <div className="item-left">
                    <h2>Bem-vindo à Biblioteca Digital</h2>
                    <p>
                        Explore um vasto acervo de livros e documentos. 
                        Acesse seus títulos favoritos a qualquer momento e de qualquer lugar.
                        Sua jornada de conhecimento começa aqui.
                    </p>
                </div>

                <div className="item-right">
                    <form className="form-login" onSubmit={handleLogin}>
                        <label>Email:
                            <input 
                                type="email"    
                                placeholder="Informe seu email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </label>

                        <label>Senha:
                            <input 
                                type="password"
                                placeholder="Informe sua senha"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </label>
                        
                        <button 
                            type="submit" 
                            className="botao-primario"
                        >
                            Acessar
                        </button>

                        <p className="sign-up">
                            Não tem conta?
                            <Link to="/registrar" style={{marginLeft: 5}}>
                                Cadastre-se.
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Index;