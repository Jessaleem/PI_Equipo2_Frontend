import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postTour } from "../../provider/category/categoryProvider";
import { getAllTours } from "../../provider/tours/toursProvider";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const AddProductForm = ({ dataCategory }) => {
	
	// const images = [
	// 	{ file: File, previewUrl: 'data:image/jpeg;base64,...' }
	// ];
	const [selectedImages, setSelectedImages] = useState([]); // [{ file, previewUrl }]

	const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const imagesWithPreviews = files.map((file) => ({
    file,
      previewUrl: URL.createObjectURL(file), // Genera una URL para previsualización
    }));

    setSelectedImages((prevImages) => [...prevImages, ...imagesWithPreviews]);
    };

	const handleRemoveImage = (index) => {
		setSelectedImages((prevImages) =>
		  prevImages.filter((_, i) => i !== index) // Elimina la imagen seleccionada
		);
	};

	useEffect(() => {
		return () => {selectedImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
		};
	}, [selectedImages]);
	
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const { data } = useQuery({
		queryKey: ["tour"],
		queryFn: () => getAllTours(),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
	let toursAlreadyExist = data.map((d) => d.name);

	const handleExperienceDateChange = (e) => {
		const inputDate = e.target.value;
		const isoDate = new Date(inputDate).toISOString();
		setValue("experienceDate", isoDate);
	};

	const onSubmit = async (formData) => {
	try {
		console.log ("Datos a enviar",formData)
		const newTourName = formData.name.trim().toLowerCase();
			// Verificar si el tour ya existe en la lista (ignorando mayúsculas y espacios)
			const existingTour = data.some(
				(tour) => tour.name.trim().toLowerCase() === newTourName
			);
			if (existingTour) {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "El tour ya existe. Por favor, elija otro nombre.",
					confirmButtonText: "Aceptar",
				});
				return;
			}

		const formDataToSend = new FormData();
		// Agregar datos del tour al FormData
		
		formDataToSend.append("name", formData.name.trim());
		formDataToSend.append("description", formData.description.trim());
		formDataToSend.append("recommendations", formData.recommendations.trim());
		formDataToSend.append("estimatedTime", formData.estimatedTime);
		formDataToSend.append("country", formData.country.trim());
		formDataToSend.append("city", formData.city.trim());
		formDataToSend.append(
		"suitableForChildren",
		formData.suitableForChildren === "si"
		);
		formDataToSend.append("experienceDate", formData.experienceDate);
		formDataToSend.append("startTime", formData.startTime);
		formDataToSend.append("endTime", formData.endTime);
		formDataToSend.append("price", formData.price);
		formDataToSend.append("slots", formData.slots);
		formDataToSend.append("categoryId", formData.category_id);
	
		// Agregar imágenes al FormData
		selectedImages.forEach((image, index) => {
		formDataToSend.append(`images`, image.file);
		});
	
		// Enviar la solicitud al backend
		await postTour(formDataToSend);
	
		Swal.fire({
		icon: "success",
		title: "¡Tour creado exitosamente!",
		text: "El tour ha sido añadido correctamente.",
		confirmButtonText: "Aceptar",
		});
	
		reset();
		setSelectedImages([]); // Limpiar las imágenes seleccionadas
	} catch (error) {
		console.error("Error al agregar el tour:", error);
	
		Swal.fire({
		icon: "error",
		title: "Error",
		text: "Hubo un problema al crear el tour. Por favor intente nuevamente.",
		confirmButtonText: "Aceptar",
		});
		}
    };

	// const onSubmit = async (formData) => {
	// 	try {
	// 		const newTourName = formData.name.trim().toLowerCase();

	// 		// Verificar si el tour ya existe en la lista (ignorando mayúsculas y espacios)
	// 		const existingTour = data.some(
	// 			(tour) => tour.name.trim().toLowerCase() === newTourName
	// 		);

	// 		if (existingTour) {
	// 			Swal.fire({
	// 				icon: "error",
	// 				title: "Error",
	// 				text: "El tour ya existe. Por favor, elija otro nombre.",
	// 				confirmButtonText: "Aceptar",
	// 			});
	// 			return;
	// 		}

	// 		// Convertir experienceDate a formato ISO
	// 		const baseDate = new Date(formData.experienceDate);

	// 		// Crear fechas completas para startTime y endTime
	// 		const startDateTime = new Date(baseDate);
	// 		const [startHours, startMinutes] = formData.startTime.split(":");
	// 		startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);

	// 		const endDateTime = new Date(baseDate);
	// 		const [endHours, endMinutes] = formData.endTime.split(":");
	// 		endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);

	// 		const tourData = {
	// 			name: formData.name.trim(),
	// 			description: formData.description.trim(),
	// 			recommendations: formData.recommendations.trim(),
	// 			image: formData.image.trim(),
	// 			estimatedTime: parseInt(formData.estimatedTime),
	// 			country: formData.country.trim(),
	// 			city: formData.city.trim(),
	// 			suitableForChildren: formData.suitableForChildren === "si",
	// 			experienceDate: baseDate.toISOString().split("T")[0],
	// 			startTime: startDateTime.toISOString(),
	// 			endTime: endDateTime.toISOString(),
	// 			price: parseFloat(formData.price),
	// 			slots: parseInt(formData.slots, 10),
	// 			categoryId: parseInt(formData.category_id, 10),
	// 		};

	// 		await postTour(tourData);

	// 		Swal.fire({
	// 			icon: "success",
	// 			title: "¡Tour creado exitosamente!",
	// 			text: "El tour ha sido añadido correctamente.",
	// 			confirmButtonText: "Aceptar",
	// 		});

	// 		reset();
	// 	} catch (error) {
	// 		console.error("Error al agregar el tour:", error.response?.data || error);

	// 		Swal.fire({
	// 			icon: "error",
	// 			title: "Error",
	// 			text: "Hubo un problema al crear el tour. Por favor intente nuevamente.",
	// 			confirmButtonText: "Aceptar",
	// 		});
	// 	}
	// };

	return (
		<div className="w-100 d-flex justify-content-center">
			<form
				className="w-75 bg-light p-4 rounded shadow"
				onSubmit={handleSubmit(onSubmit)}>
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
					<label className="form-label fs-5" htmlFor="recomendacion">
						Recomendación:
					</label>
					<textarea
						id="recomendacion"
						{...register("recommendations", {
							required: "Las recomendaciones son obligatorias",
						})}
						className="form-control"
					/>
					{errors.recommendations && (
						<p className="text-danger">{errors.recommendations.message}</p>
					)}
				</div>
				
				<div className="mb-3">
				{/* Botón para seleccionar imágenes */}
				<label className="form-label fs-5" htmlFor="images">
					Imágenes:
				</label>
				<input
					type="file"
					id="images"
					accept="image/*"
					multiple
					onChange={handleImageChange} // Maneja la selección de imágenes
					className="form-control"
				/>

				{/* Contenedor para las previsualizaciones */}
				{selectedImages.length > 0 && (
					<div className="mt-3">
					<h5>Previsualización de imágenes:</h5>
					<div className="d-flex flex-wrap">
						{selectedImages.map((img, index) => (
						<div
							key={index}
							className="image-preview"
							style={{
							marginRight: "10px",
							position: "relative",
							display: "inline-block",
							}}
						>
							{/* Imagen previsualizada */}
							<img
							src={img.previewUrl}
							alt={`Preview ${index}`}
							style={{ width: "150px", height: "150px", objectFit: "cover" }}
							/>

							{/* Botón para eliminar la imagen */}
							<button
							type="button"
							onClick={() => handleRemoveImage(index)}
							style={{
								position: "absolute",
								top: "5px",
								right: "5px",
								background: "white",
								color: "white",
								border: "1px, solid, gray",
								borderRadius: "50%",
								width: "20px",
								height: "20px",
								cursor: "pointer",
								color: "black",
								padding: "0px",
								display: "flex",
								justifyContent: "center",
								alignItems: "flex-end",
							}}
							>
							x
							</button>
						</div>
						))}
					</div>
					</div>
				)}
				</div>

{/*
				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="imagen">
						Imagen:
					</label>
					<input
						type="file"
						id="imagen"
						// {...register("image", {
						// 	required: "La URL de la imagen es obligatoria",
						// })}
						className="form-control"
					/>
					{/* {errors.image && (
						<p className="text-danger">{errors.image.message}</p>
					)} 
				</div>
*/}

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="duracion">
						Tiempo estimado de duración (horas):
					</label>
					<input
						type="number"
						id="duracion"
						{...register("estimatedTime", {
							required: "El tiempo estimado es obligatorio",
						})}
						className="form-control"
					/>
					{errors.estimatedTime && (
						<p className="text-danger">{errors.estimatedTime.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="pais">
						País:
					</label>
					<input
						type="text"
						id="pais"
						{...register("country", { required: "El país es obligatorio" })}
						className="form-control"
					/>
					{errors.country && (
						<p className="text-danger">{errors.country.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="ciudad">
						Ciudad:
					</label>
					<input
						type="text"
						id="ciudad"
						{...register("city", { required: "La ciudad es obligatoria" })}
						className="form-control"
					/>
					{errors.city && <p className="text-danger">{errors.city.message}</p>}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="aptoNinos">
						Apto para niños:
					</label>
					<select
						id="aptoNinos"
						{...register("suitableForChildren")}
						className="form-select">
						<option value="si">Sí</option>
						<option value="no">No</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="fecha">
						Fecha:
					</label>
					<input
						type="date"
						value={watch("experienceDate")?.split("T")[0] || ""}
						onChange={handleExperienceDateChange}
						{...register("experienceDate", {
							required: "La fecha es obligatoria",
						})}
						className="form-control"
					/>
					{errors.experienceDate && (
						<p className="text-danger">{errors.experienceDate.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="horaInicio">
						Hora de inicio:
					</label>
					<input
						type="time"
						id="horaInicio"
						{...register("startTime", {
							required: "La hora de inicio es obligatoria",
						})}
						className="form-control"
					/>
					{errors.startTime && (
						<p className="text-danger">{errors.startTime.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="horaFin">
						Hora de finalización:
					</label>
					<input
						type="time"
						id="horaFin"
						{...register("endTime", {
							required: "La hora de finalización es obligatoria",
						})}
						className="form-control"
					/>
					{errors.endTime && (
						<p className="text-danger">{errors.endTime.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="precio">
						Precio:
					</label>
					<input
						type="number"
						id="precio"
						{...register("price", { required: "El precio es obligatorio" })}
						min="0"
						step="0.01"
						className="form-control"
					/>
					{errors.price && (
						<p className="text-danger">{errors.price.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="cupos">
						Cupos:
					</label>
					<input
						type="number"
						id="cupos"
						{...register("slots", {
							required: "El número de cupos es obligatorio",
						})}
						min="1"
						className="form-control"
					/>
					{errors.slots && (
						<p className="text-danger">{errors.slots.message}</p>
					)}
				</div>

				<div className="mb-3">
					<label className="form-label fs-5" htmlFor="category">
						Categoría:
					</label>
					<select
						id="category"
						{...register("category_id", {
							required: "La categoría es obligatoria",
						})}
						className="form-select">
						<option value="">Seleccione categoría</option>
						{dataCategory?.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
					{errors.category_id && (
						<p className="text-danger">{errors.category_id.message}</p>
					)}
				</div>

				<button className="btn btn-success w-100" type="submit">
					Crear tour
				</button>
			</form>
		</div>
	);
};

export default AddProductForm;
