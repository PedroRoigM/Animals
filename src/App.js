import logo from './logo.svg';
import './App.css';
import Formulario from './components/Formulario';
import ListaDeMascotas from './components/ListaDeMascotas';
import { useState } from 'react';
function App() {
  const [option, setOption] = useState('todos');
  const [data, setData] = useState({
    nombre:"",
    mail:"",
    telefono:""
  });
  const getAnimales = (option) => {
    setOption(option);
  }
  const getData = (data) => {
    alert(data)
    setData({"nombre": data.nombre, "mail": data.mail, "telefono": data.telefono}); 
    sendData();
  }
  const sendData = () => {
    // AQUI SE ENVIARÍA LA DATA AL BACKEND // 
    console.log(data.nombre, data.mail, data.telefono);
  }
  return (
    <div className="App">
      <Formulario animales = {getAnimales} recibeData={getData}/>
      <ListaDeMascotas filtro={option}/>
    </div>
  );
}

export default App;
