import React, { useState, useEffect } from 'react';

const ContactoForm = ({ onSubmit, initialData = null }) => {
    const [contacto, setContacto] = useState({
        saludo: '',
        nombre_completo: '',
        numero_identificacion: '',
        correo_electronico: '',
        numero_telefono: '',
        fotografia: null,
    });

    const [preview, setPreview] = useState(null); // Previsualización de la imagen

    // Actualizar el formulario con datos iniciales si hay cambios en `initialData`
    useEffect(() => {
        if (initialData) {
            setContacto(initialData);
            if (initialData.fotografia) {
                setPreview(initialData.fotografia); // Mostrar la foto actual como previsualización
            } else {
                setPreview(null);
            }
        } else {
            setContacto({
                saludo: '',
                nombre_completo: '',
                numero_identificacion: '',
                correo_electronico: '',
                numero_telefono: '',
                fotografia: null,
            });
            setPreview(null);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            setContacto({ ...contacto, [name]: file });

            // Generar URL de previsualización para la imagen seleccionada
            if (file) {
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
            } else {
                setPreview(null);
            }
        } else {
            setContacto({ ...contacto, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !contacto.saludo ||
            !contacto.nombre_completo ||
            !contacto.numero_identificacion ||
            !contacto.correo_electronico ||
            !contacto.numero_telefono
        ) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        onSubmit(contacto); // Pasar los datos al controlador principal
        setContacto({
            saludo: '',
            nombre_completo: '',
            numero_identificacion: '',
            correo_electronico: '',
            numero_telefono: '',
            fotografia: null,
        }); // Resetea el formulario
        setPreview(null); // Limpia la previsualización
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Saludo</label>
                <select
                    className="form-control"
                    name="saludo"
                    value={contacto.saludo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione</option>
                    <option value="Sr.">Sr.</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Dr.">Dr.</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre_completo"
                    value={contacto.nombre_completo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Número de Identificación</label>
                <input
                    type="text"
                    className="form-control"
                    name="numero_identificacion"
                    value={contacto.numero_identificacion}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="correo_electronico"
                    value={contacto.correo_electronico}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Número de Teléfono</label>
                <input
                    type="text"
                    className="form-control"
                    name="numero_telefono"
                    value={contacto.numero_telefono}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Fotografía</label>
                <input
                    type="file"
                    className="form-control"
                    name="fotografia"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            {preview && (
                <div className="mb-3">
                    <img
                        src={preview}
                        alt="Previsualización"
                        className="img-thumbnail"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                </div>
            )}

            <button type="submit" className="btn btn-primary">
                {initialData ? 'Guardar Cambios' : 'Guardar Contacto'}
            </button>
        </form>
    );
};

export default ContactoForm;
