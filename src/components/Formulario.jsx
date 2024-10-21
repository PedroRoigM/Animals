import { useState } from 'react';

export default function Formulario( { animales, recibeData }){
    const [data, setData] = useState({
        nombre:"",
        mail:"",
        telefono:""
    });
    const errorFields = Array.from(document.getElementsByClassName('Error'));
    const handlerChange = (e, field) =>{
        setData({...data, [field]: e.target.value});
    }
    const enviarFiltro = (e) => {
        animales(e.target.value);
    }
    const enviarData = () => {
        
        errorFields.forEach(element => {
            element.style.display = 'none';
        });
        
        if (data.nombre && data.mail && data.telefono){
            recibeData(data);
            setData({
                nombre:"",
                mail:"",
                telefono:""
            });

            resetInputs();
        }else{
            if(!data.nombre)
                errorFields[0].style.display = 'block';
            if(!data.mail)
                errorFields[1].style.display = 'block';
            if(!data.telefono)
                errorFields[2].style.display = 'block';
        }
    }
    const resetInputs = () => {
        document.getElementById('Nombre').value = '';
        document.getElementById('Mail').value = '';
        document.getElementById('Telefono').value = '';
    }
    return <div>
        <h1>Formulario</h1>
        <p>Ingrese los datos solicitados</p>
        <p><input placeholder='Nombre'id='Nombre' onChange={e => handlerChange(e, "nombre")}></input></p>
        <p className='Error'>Debe ingresar un nombre</p>
        <p><input placeholder='Mail' id="Mail" onChange={e => handlerChange(e, "mail")}></input></p>
        <p className='Error'>Debe ingresar un correo</p>
        <p><input placeholder='Telefono' id="Telefono" onChange={e => handlerChange(e, "telefono")}></input></p>
        <p className='Error'>Debe ingresar un Telefono</p>
        <button onClick={() => enviarData()}>Enviar</button>

        <h1>Busqueda</h1>
        <select name="animal" onChange={e => enviarFiltro(e)}>
            <option value="Todos">Todos</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
        </select>
    </div>
}