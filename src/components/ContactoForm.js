import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ContactoForm = ({ onSubmit, initialData = null }) => {
    const { t } = useTranslation();
    const [contacto, setContacto] = useState({
        saludo: '',
        nombre_completo: '',
        numero_identificacion: '',
        correo_electronico: '',
        numero_telefono: '',
        fotografia: null
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setContacto(initialData);
            setPreview(initialData.fotografia || null);
        } else {
            setContacto({
                saludo: '',
                nombre_completo: '',
                numero_identificacion: '',
                correo_electronico: '',
                numero_telefono: '',
                fotografia: null
            });
            setPreview(null);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && files[0]) {
            const file = files[0];
            setContacto({ ...contacto, [name]: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setContacto({ ...contacto, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!contacto.saludo || !contacto.nombre_completo || !contacto.numero_identificacion || !contacto.correo_electronico || !contacto.numero_telefono) {
            alert(t('contactForm.fillAllFields'));
            return;
        }
        onSubmit(contacto);
        setContacto({
            saludo: '',
            nombre_completo: '',
            numero_identificacion: '',
            correo_electronico: '',
            numero_telefono: '',
            fotografia: null
        });
        setPreview(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="saludo" className="form-label">{t('contactForm.greeting')}</label>
                <select className="form-control" id="saludo" name="saludo" value={contacto.saludo}
                        onChange={handleChange} required placeholder={t('contactForm.select')}>
                    <option value="">{t('contactForm.select')}</option>
                    <option value="Sr.">{t('contactForm.mr')}</option>
                    <option value="Sra.">{t('contactForm.mrs')}</option>
                    <option value="Dr.">{t('contactForm.dr')}</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="nombre_completo" className="form-label">{t('contactForm.fullName')}</label>
                <input type="text" className="form-control" id="nombre_completo" name="nombre_completo"
                       value={contacto.nombre_completo} onChange={handleChange} required placeholder={t('contactForm.placeholderFullName')}/>
            </div>

            <div className="mb-3">
                <label htmlFor="numero_identificacion" className="form-label">{t('contactForm.idNumber')}</label>
                <input type="text" className="form-control" id="numero_identificacion" name="numero_identificacion"
                       value={contacto.numero_identificacion} onChange={handleChange} required placeholder={t('contactForm.placeholderIDNumber')}/>
            </div>

            <div className="mb-3">
                <label htmlFor="correo_electronico" className="form-label">{t('contactForm.email')}</label>
                <input type="email" className="form-control" id="correo_electronico" name="correo_electronico"
                       value={contacto.correo_electronico} onChange={handleChange} required placeholder={t('contactForm.placeholderEmail')}/>
            </div>

            <div className="mb-3">
                <label htmlFor="numero_telefono" className="form-label">{t('contactForm.phoneNumber')}</label>
                <input type="text" className="form-control" id="numero_telefono" name="numero_telefono"
                       value={contacto.numero_telefono} onChange={handleChange} required placeholder={t('contactForm.placeholderPhoneNumber')}/>
            </div>

            <div className="mb-3">
                <label htmlFor="fotografia" className="form-label">{t('contactForm.photo')}</label>
                <input type="file" className="form-control" id="fotografia" name="fotografia" accept="image/*"
                       aria-describedby="photoHelp" onChange={handleChange} placeholder={t('contactForm.placeholderPhoto')}/>
                <small id="photoHelp" className="form-text text-muted">{t('contactForm.photoHelp')}</small>
            </div>

            {preview && (
                <div className="mb-3">
                    <img src={preview} alt={t('contactForm.preview')} className="img-thumbnail" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                </div>
            )}

            <button type="submit" className="btn btn-primary">
                {initialData ? t('contactForm.update') : t('contactForm.submit')}
            </button>
        </form>
    );
};

export default ContactoForm;
