import React, { Component } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      nascimento: "",
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        var uid = usuario.uid;

        await firebase
          .firestore()
          .collection("usuario")
          .doc(uid)
          .get()
          .then((retorno) => {
            this.setState({
              nome: retorno.data().nome,
              sobrenome: retorno.data().sobrenome,
              nascimento: retorno.data().nascimento,
            });
          });
      }
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Dados do Usuário:</h1>{" "}
        <div style={inputContainer}>
          <label>Nome:</label>
          <input
            style={inputStyle}
            type="text"
        
            value={this.state.nome}
          />
        </div>
        <div style={inputContainer}>
          <label>Sobrenome:</label>
          <input
            style={inputStyle}
            type="text"
        
            value={this.state.sobrenome}
          />
        </div>
        <div style={inputContainer}>
          <label>Nascimento:</label>
          <input
            style={inputStyle}
            type="text"
        
            value={this.state.nascimento}
          />
        </div>
        <div>
               <Link to="/">
                        <button style={secondaryButton}>Voltar</button>
                    </Link>
        </div>
             
      </div>
    );
  }
}

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "300px",
  margin: "5px 0px",
};

const secondaryButton = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginLeft: "10px",
};

const inputContainer = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};

export default Principal;
