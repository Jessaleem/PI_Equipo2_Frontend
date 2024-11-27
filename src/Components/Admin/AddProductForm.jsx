import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postTour } from "../../provider/category/categoryProvider";
import { getAllTours } from "../../provider/tours/toursProvider";
import { useQuery } from "@tanstack/react-query";
import { getAllCharacteristics } from "../../provider/characteristics/characteristicsProvider";
import { addCharacteristicsToTour } from "../../provider/tours/toursProvider";
const AddProductForm = ({ dataCategory }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    trigger,
  } = useForm();

  const [characteristicsError, setCharacteristicsError] = useState(false);

  const { data } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const characteristics = useQuery({
    queryKey: ["characteristic"],
    queryFn: () => getAllCharacteristics(),
  });

  const handleExperienceDateChange = (e) => {
    const inputDate = e.target.value;
    const isoDate = new Date(inputDate).toISOString();
    setValue("experienceDate", isoDate);
  };

  const onSubmit = async (formData) => {
    try {
      const selectedCharacteristics = Object.keys(
        formData.characteristics || {}
      )
        .filter((key) => formData.characteristics[key])
        .map(Number);

      if (selectedCharacteristics.length === 0) {
        // Set the characteristics error state
        setCharacteristicsError(true);
        return;
      }

      // Reset characteristics error if characteristics are selected
      setCharacteristicsError(false);

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
        name: formData.name.trim(),
        description: formData.description.trim(),
        recommendations: formData.recommendations.trim(),
        image: formData.image.trim(),
        estimatedTime: parseInt(formData.estimatedTime),
        country: formData.country.trim(),
        city: formData.city.trim(),
        suitableForChildren: formData.suitableForChildren === "si",
        experienceDate: baseDate.toISOString().split("T")[0],
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        price: parseFloat(formData.price),
        slots: parseInt(formData.slots, 10),
        categoryId: parseInt(formData.category_id, 10),
      };
      console.log("caracteristicas", characteristics.data);

      const createdTour = await postTour(tourData);

      if (createdTour.id) {
        await addCharacteristicsToTour(createdTour.id, selectedCharacteristics);
      }

      Swal.fire({
        icon: "success",
        title: "¡Tour creado exitosamente!",
        text: "El tour ha sido añadido correctamente.",
        confirmButtonText: "Aceptar",
      });

      reset();
    } catch (error) {
      console.error("Error al agregar el tour:", error.response?.data || error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el tour. Por favor intente nuevamente.",
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
          <label className="form-label fs-5" htmlFor="imagen">
            Imagen:
          </label>
          <input
            type="text"
            id="imagen"
            {...register("image", {
              required: "La URL de la imagen es obligatoria",
            })}
            className="form-control"
          />
          {errors.image && (
            <p className="text-danger">{errors.image.message}</p>
          )}
        </div>

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
            className="form-select"
          >
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
            className="form-select"
          >
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

        <div className="mb-3">
          <p className="form-label fs-5 pb-3">Características:</p>
          <div className="d-flex flex-wrap justify-content-between gap-3">
            {characteristics.data?.map((characteristic) => (
              <div
                key={characteristic.id}
                className="d-flex justify-content-start gap-3 w-25"
              >
                <input
                  type="checkbox"
                  id={characteristic.name}
                  {...register(`characteristics.${characteristic.id}`)}
                  className="form-check-input"
                  value={characteristic.id}
                />
                <label
                  htmlFor={characteristic.name}
                  className="form-check-label text-start fs-6"
                >
                  {characteristic.name}
                </label>
              </div>
            ))}
          </div>
          {characteristicsError && (
            <p className="text-danger">
              Debe seleccionar al menos una característica
            </p>
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
