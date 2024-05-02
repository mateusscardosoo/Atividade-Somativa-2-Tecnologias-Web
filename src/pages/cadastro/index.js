import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

class Cadastro extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            senha: "",
            nome: "",
            sobrenome: "",
            nascimento: ""
        }

        this.cadastrar = this.cadastrar.bind(this);
    }

    async cadastrar(){
      const mensagem = document.getElementById("mensagem");
try{

  await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
  .then( async (retorno) => {
    
    await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      nascimento: this.state.nascimento
            });
        });
        mensagem.innerHTML = "Cadastrado com sucesso"

        // Criar Collection
        //  firebase.firestore().collection("usuario").add({
        //         nome: this.state.nome,
        //         sobrenome: this.state.sobrenome
        //     });
          
    }catch(e){
      console.log(e.message)
      if(e.message === "The email address is badly formatted."){
        mensagem.innerHTML = "Erro ao cadastrar, revise seu e-mail!"
      }
      else if (e.message === "The password must be 6 characters long or more." || e.message === "Password should be at least 6 characters"){
        mensagem.innerHTML = "Erro ao cadastrar, a senha deve ter pelo menos 6 caracteres"

      } 
      else if (e.message === "The email address is already in use by another account."){
        mensagem.innerHTML = "O e-mail já está sendo usado por outra conta"
      }
      else{
        mensagem.innerHTML = "Erro ao cadastrar, revise suas informações preenchidas."
      }
    }
    }

      
      
    render(){
        return(
         <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>Tela de Cadastro</h1>
              <div style={inputContainer}>
                <label>Email:</label>
              <input style={inputStyle} type="email" placeholder="E-mail" required onChange={(e) => this.setState({email:e.target.value})} />
              </div>
              <div style={inputContainer}>
                        <label>Senha:</label>
              <input style={inputStyle} type="password" placeholder="Senha" min={6} required onChange={(e) => this.setState({senha:e.target.value})} />
              </div>
              <div style={inputContainer}>
                        <label>Nome:</label>
              <input style={inputStyle} type="text" placeholder="Nome" onChange={(e) => this.setState({nome:e.target.value})} />
              </div>
              <div style={inputContainer}>
                        <label>Sobrenome:</label>
              <input style={inputStyle} type="text" placeholder="Sobrenome" onChange={(e) => this.setState({sobrenome:e.target.value})} />
              </div>
              <div style={inputContainer}>
                        <label>Data de Nascimento:</label>
              <input style={inputStyle} type="date" placeholder="Data de Nascimento" onChange={(e) => this.setState({nascimento:e.target.value})} />
              </div>
              <div>

              <button  style={primaryButton} onClick={this.cadastrar}>Cadastrar</button>
               <Link to="/">
                        <button style={secondaryButton}>Login</button>
                    </Link>
              </div>
              <p id='mensagem'></p>
          </div>
    
        </>
        );
    }

}

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  margin: '5px 0px'
};

const primaryButton = {
  backgroundColor: '#FF7A5A',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
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



export default Cadastro;