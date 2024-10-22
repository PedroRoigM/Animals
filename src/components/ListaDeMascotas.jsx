import { useState, useEffect } from 'react';

export default function ListaDeMascotas({ filtro }) {
    const [data, setData] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null); // Estado para el animal seleccionado

    useEffect(() => {
        fetch('https://huachitos.cl/api/animales')
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(err => console.error(err));
    }, []);

    const renderRows = () => {
        const filteredData = data.filter(element => {
            if (filtro === "Todos") return true;
            return element.tipo.toLowerCase() === filtro.toLowerCase();
        });

        const rows = [];
        for (let i = 0; i < filteredData.length; i += 5) {
            rows.push(
                <div className="row" key={i}>
                    {filteredData.slice(i, i + 5).map((element, index) => (
                        <div className="animal" key={index} onClick={() => setSelectedAnimal(element)}>

                            <img src={element.imagen} alt={element.nombre}  width={200} height={200}/>
                            
                            <p>Nombre: {element.nombre}</p>
                            <p>Tipo: {element.tipo}</p>
                            <p>Edad: {element.edad}</p>
                            <p>Estado: {element.estado}</p>
                            <p>Género: {element.genero}</p>
                            
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };
    const mostrarRespuesta = (booleano) => {
        if (booleano){
            return 'Si';
        }else{
            return 'No';
        }
    }
    const cleanHTML = (htmlString) => {
        // Expresión regular para quitar todas las etiquetas <p> y </p>
        return htmlString.replace(/<\/?p>/g, '');
    };
    
    return (
        <div id="animalsDiv">
            <h1>Lista de mascotas</h1>
            <div id='animalsList'>
                {renderRows()}
            </div>
            {selectedAnimal && (
                <div className="animal-details">
                    <div className="overlay" onClick={() => setSelectedAnimal(null)}></div>
                    <div className="content">
                        <h2>{selectedAnimal.nombre}</h2>
                        <div>
                            <img src={selectedAnimal.imagen} alt={selectedAnimal.nombre} />
                        </div>
                        <p>Tipo: {selectedAnimal.tipo}</p>
                        <p>Edad: {selectedAnimal.edad}</p>
                        <p>Estado: {selectedAnimal.estado}</p>
                        <p>Género: {selectedAnimal.genero}</p>
                        <p>Personalidad: { selectedAnimal.desc_personalidad}</p>
                        <p>Adicional: {selectedAnimal.desc_adicional}</p>
                        <p>Esterilizado: {mostrarRespuesta(selectedAnimal.esterilizado)}</p>
                        <p>Vacunas: {mostrarRespuesta(selectedAnimal.vacunas)}</p>
                        <p>Región: {selectedAnimal.region}</p>
                        <p>Comuna: {selectedAnimal.comuna}</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
}