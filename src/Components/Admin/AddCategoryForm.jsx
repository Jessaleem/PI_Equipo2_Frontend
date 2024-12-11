import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { uploadImage } from '../../provider/uploadImg/uploadImage';
import { postCategory } from '../../provider/category/categoryProvider';

const AddCategoryForm = ({dataCategory}) => {
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
        trigger,
        } = useForm();
    
    // Seleccionar imagen, previsualización y modificación de imagen
    
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((preview, i) => i !== index));
    };

    const [dragged, setDragged] = useState(false);

    const handleDragOver = (e) => {
    e.preventDefault();
    setDragged(true);
    };
    
    const handleDragLeave = () => {
    setDragged(false);
    };

    const handleDrop = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
    const newPreviews = newImages.map((image) => URL.createObjectURL(image));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    setDragged(false);
    };

    const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...newImages]);
    const newPreviews = newImages.map((image) => URL.createObjectURL(image));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    // subir imagen
    
    let urlObtenida = ""
    
    const handleUploadImages = async () => {
        try {
            const uploadedImages = await Promise.all(images.map((image) => uploadImage(image)));
            console.log("Imágenes subidas:", uploadedImages);      
            urlObtenida = String(uploadedImages[0][0].url)
            console.log(urlObtenida)
            return urlObtenida          
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron subir las imágenes. Intente nuevamente.",
                confirmButtonText: "Aceptar",
            });
        }
    };
    
    const onSubmit = async (formData) => {    
        try {
            const newCategoryName = formData.name.trim().toLowerCase();    
            // Verificar si la categoria ya existe en la lista (ignorando mayúsculas y espacios)
            if (dataCategory.some){
            const existingCategory = dataCategory.some(        
                (category) => category.name.trim().toLowerCase() === newCategoryName
            );
            if (existingCategory) {
                Swal.fire({
                icon: "error",
                title: "Error",
                text: "La categoría ya existe. Por favor, elija otro nombre.",
                confirmButtonText: "Aceptar",
                });
                return;
            }  
            }  
            
            // Subir imagen a S3 y retornar url
            if (images.length === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "Debe seleccionar al menos una imagen.",
                    confirmButtonText: "Aceptar",
                });
                return;            
            }
            else if (images.length > 1){
                Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Solo se debe seleccionar una imagen.",
                confirmButtonText: "Aceptar",
                });
                return;
            }
            const urlImg = await handleUploadImages();
    
            const categoryData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                image: urlImg,
            };

            console.log(categoryData)
                
            await postCategory(categoryData);
    
            Swal.fire({
                icon: "success",
                title: "¡Categoría creada exitosamente!",
                text: "Se agregó correctamente la nueva categoría.",
                confirmButtonText: "Aceptar",
            });
    
            reset();
            setImages([]);
            setPreviews([]);

            } catch (error) {
            console.error("Error al agregar la categoría:", error.response?.data || error);
        
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al crear la categoría. Por favor intente nuevamente.",
                confirmButtonText: "Aceptar",
            });
            }
        };
    
        return (
        <div className="w-100 d-flex justify-content-center">
            <form
                className="w-75 bg-light p-4 rounded shadow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-3">
                <label className="form-label fs-5" htmlFor="nombre">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="nombre"
                    {...register("name", { required: "El nombre es obligatorio" })}
                    className="form-control"
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
        
                <div className="mb-3">
                <label className="form-label fs-5" htmlFor="descripcion">
                    Descripción:
                </label>
                <textarea
                    id="descripcion"
                    {...register("description", {
                    required: "La descripción es obligatoria",
                    })}
                    className="form-control"
                />
                {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                )}
                </div>
                
                <div className="mb-3">
                <label className="form-label fs-5" htmlFor="imagen">
                    Imagen:
                </label>
                
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                }}>
        
            
                <div
                    style={{
                    backgroundColor: dragged ? '#ccc' : '#ddd',
                    border: '2px dashed #aaa',
                    borderRadius: '8px',
                    width: '-webkit-fill-available',
                    height: 'min-content',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight:'600',
                    color:'#0b4040',
                    padding:'15px'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => {
                    const input = document.getElementById('file-input');
                    if (input) {
                        input.click();
                    }
                    }}
                >
                    {previews.length === 0 ? 'Arrastra y suelta la imagen aquí o haz click para seleccionar' : (
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {previews.map((preview, index) => (              
                        <div key={index} style={{
                            position: 'relative'
                        }}
                        className="imgPreGroup"
                        >
                            <img src={preview} alt="Image preview" 
                            style={{
                            width: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                            }}
                            />
                            <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}                  
                            >
                            <button
                            onClick={(e) => {
                                handleDeleteImage(index);
                                e.stopPropagation()}}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                backgroundColor: '#ff0000',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0px',
                                fontSize:'20px',           
                            }}                  
                            type="button"
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#cc0000';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#ff0000';
                            }}
                            >
                            X
                            </button>
                            </div>
                            <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            padding: '5px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            fontSize: '12px',
                            textAlign: 'center',
                            borderRadius: '0px 0px 10px 10px'
                            }}>
                            Imagen {index + 1}
                            </div>
                        </div>             
                        ))}
                    </div>
                    )}
                </div>
        
                <input
                    id="file-input"
                    type="file"
                    multiple
                    style={{
                    display: 'none'
                    }}
                    onChange={handleFileChange}
                />
                </div>
        
                </div>
        
                <button className="btn btn-success w-100" type="submit">
                Crear categoría
                </button>
            </form>
        </div>
        );
}

export default AddCategoryForm