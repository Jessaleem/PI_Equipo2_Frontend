import { useForm } from "react-hook-form";
import { postTour } from "../provider/category/categoryProvider";
import { checkTourByName } from "../provider/tours/checkTourByName";

const AddProductForm = ({ data }) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm();

	const handleExperienceDateChange = (e) => {
		const inputDate = e.target.value;
		const isoDate = new Date(inputDate).toISOString();
		setValue("experienceDate", isoDate); // Actualizamos el valor de experienceDate
	};

	const onSubmit = async (formData) => {
		try {
			const existingTour = await checkTourByName(formData.name);
			console.log("Existing Tour:", existingTour);

			// Convertir experienceDate a formato ISO
			const baseDate = new Date(formData.experienceDate);

			// Crear fechas completas para startTime y endTime
			const startDateTime = new Date(baseDate);
			const [startHours, startMinutes] = formData.startTime.split(":");
			startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);

			const endDateTime = new Date(baseDate);
			const [endHours, endMinutes] = formData.endTime.split(":");
			endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);

			const tourData = {
				name: formData.name,
				description: formData.description,
				recommendations: formData.recommendations,
				image: formData.image,
				estimatedTime: parseInt(formData.estimatedTime),
				country: formData.country,
				city: formData.city,
				suitableForChildren: formData.suitableForChildren === "si",
				experienceDate: baseDate.toISOString().split("T")[0],
				startTime: startDateTime.toISOString(),
				endTime: endDateTime.toISOString(),
				price: parseFloat(formData.price),
				slots: parseInt(formData.slots, 10),
				categoryId: parseInt(formData.category_id, 10),
			};

			await postTour(tourData);
			alert("Tour creado exitosamente!");
		} catch (error) {
			console.error("Error al agregar el tour:", error.response?.data || error);
		}
	};

	return (
		<div className="w-100 d-flex justify-content-center">
			<form className="w-50" onSubmit={handleSubmit(onSubmit)}>
				<label className="fs-5" htmlFor="nombre">
					Nombre:
				</label>
				<input
					type="text"
					id="nombre"
					{...register("name", { required: "El nombre es obligatorio" })}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>
				{errors.name && <p>{errors.name.message}</p>}

				<label className="fs-5" htmlFor="descripcion">
					Descripción:
				</label>
				<textarea
					id="descripcion"
					{...register("description")}
					className="bg-white form-textarea mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="recomendacion">
					Recomendación:
				</label>
				<textarea
					id="recomendacion"
					{...register("recommendations")}
					className="bg-white form-textarea mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="imagen">
					Imagen:
				</label>
				<input
					type="text"
					id="imagen"
					{...register("image")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="duracion">
					Tiempo estimado de duración (horas):
				</label>
				<input
					type="number"
					id="duracion"
					{...register("estimatedTime")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="pais">
					País:
				</label>
				<input
					type="text"
					id="pais"
					{...register("country")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="ciudad">
					Ciudad:
				</label>
				<input
					type="text"
					id="ciudad"
					{...register("city")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="aptoNinos">
					Apto para niños:
				</label>
				<select
					id="aptoNinos"
					{...register("suitableForChildren")}
					className="form-select mt-2 mb-5 text-black bg-white py-2 rounded-3">
					<option value="si">Sí</option>
					<option value="no">No</option>
				</select>

				<label className="fs-5" htmlFor="fecha">
					Fecha:
				</label>
				<input
					type="date"
					value={watch("experienceDate")?.split("T")[0] || ""}
					onChange={handleExperienceDateChange}
					{...register("experienceDate")}
				/>

				<label className="fs-5" htmlFor="horaInicio">
					Hora de inicio:
				</label>
				<input
					type="time"
					id="horaInicio"
					{...register("startTime")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="horaFin">
					Hora de finalización:
				</label>
				<input
					type="time"
					id="horaFin"
					{...register("endTime")}
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="precio">
					Precio:
				</label>
				<input
					type="number"
					id="precio"
					{...register("price")}
					min="0"
					step="0.01"
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="cupos">
					Cupos:
				</label>
				<input
					type="number"
					id="cupos"
					{...register("slots")}
					min="1"
					className="bg-white form-input mt-2 mb-5 text-black py-2 rounded-3"
				/>

				<label className="fs-5" htmlFor="category">
					Categoría:
				</label>
				<select
					id="category"
					{...register("category_id")}
					className="form-select mt-2 mb-5 text-black bg-white py-2 rounded-3">
					<option value="">Seleccione categoría</option>
					{data?.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>

				<button className="form-submit-btn mt-2 mb-5" type="submit">
					Crear tour
				</button>
			</form>
		</div>
	);
};

export default AddProductForm;
