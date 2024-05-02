import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            senha: ""
        }

        this.login = this.login.bind(this);
    }

    async login(){
        const mensagem = document.getElementById("mensagem")

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
        .then(()=>{
            mensagem.innerHTML = "Acessando..."
            window.location.href = "./principal";
        })
        .catch((e)=>{
            console.log(e.message)
            if(e.message === "The email address is badly formatted."){
                mensagem.innerHTML = "Erro ao logar, revise seu e-mail!"
              }
              else if (e.message === "The password is invalid or the user does not have a password."){
                mensagem.innerHTML = "Erro ao logar, a senha é inválida"
        
              }
        })
    }

    render(){
        return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>
                    <h1>Acessar</h1>
                    <div style={inputContainer}>
                <label>Email:</label>
                    <input style={inputStyle} type="text" placeholder='E-mail' required onChange={(e) => this.setState({email:e.target.value})} />
                </div>
                <div style={inputContainer}>
                <label>Senha:</label>
                    <input style={inputStyle} type="password" placeholder='Senha' required onChange={(e) => this.setState({senha:e.target.value})} />
                </div>
                    <button style={primaryButton} onClick={this.login}>Acessar</button>
                    <Link to="/cadastro">
                        <button style={secondaryButton}>Cadastrar</button>
                    </Link>
                </div>
                <p id='mensagem'></p>
                <div>
                  
                </div>
            </div>

        )
    }

}


const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '5px 0px',
    width: '100%'
  };
  
  const primaryButton = {
    backgroundColor: '#FF7A5A',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };
  
  const secondaryButton = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px',
  };
  
  const inputContainer = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  };

export default Login;