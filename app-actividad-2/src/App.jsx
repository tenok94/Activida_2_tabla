//import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';

import { mockData } from './mockData';

export default function App() {
    const [data, setData] = useState([]); // Estado para los datos de la tabla
    const [loading, setLoading] = useState(true); // Estado de carga
    const [formValues, setFormValues] = useState({ nombre: '', precio: '', categoria: '' }); // Estado del formulario

    // Simular carga inicial de datos
    useEffect(() => {
        const timeout = setTimeout(() => {
            setData(mockData);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.nombre && formValues.precio && formValues.categoria) {
            const newProduct = {
                id: data.length + 1,
                ...formValues,
                precio: parseFloat(formValues.precio),
            };
            setData([...data, newProduct]);
            setFormValues({ nombre: '', precio: '', categoria: '' }); // Limpiar formulario
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Gestión de Productos</h1>

            {/* Spinner */}
            {loading ? (
                <div>
                    <div className="spinner" />
                    <p>Cargando datos...</p>
                </div>
            ) : (
                <>
                    {/* Tabla */}
                    <table style={{ margin: '0 auto', border: '1px solid black', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Nombre</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Precio</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.nombre}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>${item.precio}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.categoria}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <input
                            type="text"
                            name="nombre"
                            value={formValues.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            style={{ marginRight: '10px', padding: '8px' }}
                        />
                        <input
                            type="number"
                            name="precio"
                            value={formValues.precio}
                            onChange={handleInputChange}
                            placeholder="Precio"
                            style={{ marginRight: '10px', padding: '8px' }}
                        />
                        <input
                            type="text"
                            name="categoria"
                            value={formValues.categoria}
                            onChange={handleInputChange}
                            placeholder="Categoría"
                            style={{ marginRight: '10px', padding: '8px' }}
                        />
                        <button type="submit" style={{ padding: '10px 20px' }}>Agregar</button>
                    </form>
                </>
            )}
        </div>
    );
}
