import React, { Component } from 'react';
import firebase from '../../firebase';

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

      this.gravar = this.gravar.bind(this);
  }

  
  async gravar(){

    await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .then( async (retorno) => {
        
        await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            nascimento: this.state.nascimento
        });
    });

    // firebase.firestore().collection("usuario").add({
    //     nome: this.state.nome,
    //     sobrenome: this.state.sobrenome
    // });
}


render(){
        return (
           <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Cadastre-se</h1>
            <form  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={inputContainer}>
                        <label>Email:</label>
                        <input style={inputStyle} type="text" placeholder="E-mail" onChange={(e) => this.setState({email:e.target.value})}/>
                    </div>
                    <div style={inputContainer}>
                        <label>Senha:</label>
                        <input style={inputStyle} type="password" placeholder="Senha" onChange={(e) => this.setState({senha:e.target.value})} />
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
                        <input style={inputStyle}  type="text" placeholder="Data de Nascimento" onChange={(e) => this.setState({nascimento:e.target.value})}/>
                    </div>
                    <button onClick={this.gravar}>Gravar Cadastro</button>
                </form>
           </div>
        );
    }
}


const inputContainer = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  margin: '5px 0px'
};

const buttonStyle = {
  backgroundColor: '#FF7A5A',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};



export default Cadastro;