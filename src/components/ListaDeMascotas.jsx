import { useState, useEffect } from 'react';

export default function ListaDeMascotas({ filtro }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://huachitos.cl/api/animales')
            .then(response => response.json())
            .then(data => {
                setData(data.data);
            })
            .catch(err => console.error(err));
    }, []);


    const renderRows = () => {
        const filteredData = data.filter(element => {
            if (filtro === "todos") return true;
            return element.tipo.toLowerCase() === filtro.toLowerCase();
        });

        const rows = [];
        for (let i = 0; i < filteredData.length; i += 3) {
            rows.push(
                <div className="row" key={i}>
                    {filteredData.slice(i, i + 3).map((element, index) => (
                        <div className="animal" key={index}>
                            <img src={element.imagen} alt={element.nombre} width="100" />
                            <p>Nombre: {element.nombre}</p>
                            <p>Tipo: {element.tipo}</p>
                            <p>Edad: {element.edad}</p>
                            <p>Estado: {element.estado}</p>
                            <p>Genero: {element.genero}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div id="animalsDiv">
            <h1>Lista de mascotas</h1>
            <div id='animalsList'>
                {renderRows()}
            </div>
        </div>
    );
}