import { useState } from "react";
import { postTour } from "../provider/category/categoryProvider";
import { checkTourByName } from "../provider/tours/checkTourByName"; // Suponiendo que esta función hace la consulta

const AddProductForm = ({ data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [image, setImage] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [aptoNinos, setAptoNinos] = useState("no");
  const [experienceDate, setExperienceDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [precio, setPrice] = useState("");
  const [cupos, setSlots] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recommendations: "",
    image: "",
    estimatedTime: "",
    country: "",
    city: "",
    suitableForChildren: "si",
    experienceDate: "",
    startTime: "",
    endTime: "",
    price: "",
    slots: "",
    category_id: "",
  });

  const handleExperienceDateChange = (e) => {
    const inputDate = e.target.value;
    const isoDate = new Date(inputDate).toISOString();
    setExperienceDate(isoDate);
  };

  const commonClasses = {
    label: "fs-5",
    input: "bg-white form-input mt-2 mb-5 text-black py-2 rounded-3",
    textarea: "bg-white form-textarea mt-2 mb-5 text-black py-2 rounded-3",
    select: "form-select mt-2 mb-5 text-black bg-white py-2 rounded-3",
    button: "form-submit-btn mt-2 mb-5",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verifica si el tour ya existe
      const existingTour = await checkTourByName(name);
      console.log("Existing Tour:", existingTour); // Agregar log para depurar

      //   if (existingTour) {
      //     setPopupMessage("Ese tour ya existe");
      //     return; // Detiene el envío si el nombre ya existe
      //   }

      const timeFormatRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
      if (!timeFormatRegex.test(estimatedTime)) {
        alert("El tiempo estimado debe tener el formato hh:mm:ss.");
        return;
      }

      const suitableForChildrenValue = aptoNinos === "si";

      const tourData = {
        name,
        description,
        recommendations,
        image,
        estimatedTime,
        country,
        city,
        suitableForChildren: suitableForChildrenValue,
        experienceDate: new Date(experienceDate).toISOString(),
        startTime,
        endTime,
        price: parseFloat(precio),
        slots: parseInt(cupos, 10),
        categoryId: parseInt(formData.category_id, 10),
      };

      await postTour(tourData); // Envía los datos del tour a la API
      alert("Tour creado exitosamente!");
    } catch (error) {
      console.error("Error al agregar el tour:", error.response?.data || error);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      {/* {popupMessage && (
        <div className="popup">
          <h2>{popupMessage}</h2>
          <button onClick={() => setPopupMessage(null)}>Cerrar</button>
        </div>
      )} */}
      <form className="w-50" onSubmit={handleSubmit}>
        <label className={commonClasses.label} htmlFor="nombre">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="name"
          className={commonClasses.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="descripcion">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          className={commonClasses.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="recomendacion">
          Recomendación:
        </label>
        <textarea
          id="recomendacion"
          name="recommendations"
          className={commonClasses.textarea}
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="imagen">
          Imagen:
        </label>
        <input
          type="text"
          id="imagen"
          name="image"
          className={commonClasses.input}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="duracion">
          Tiempo estimado de duración (horas):
        </label>
        <input
          type="text"
          id="duracion"
          name="estimatedTime"
          className={commonClasses.input}
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="pais">
          País:
        </label>
        <input
          type="text"
          id="pais"
          name="country"
          className={commonClasses.input}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="ciudad">
          Ciudad:
        </label>
        <input
          type="text"
          id="ciudad"
          name="city"
          className={commonClasses.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="aptoNinos">
          Apto para niños:
        </label>
        <select
          id="aptoNinos"
          name="suitableForChildren"
          className={commonClasses.select}
          value={aptoNinos}
          onChange={(e) => setAptoNinos(e.target.value)}
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <label className={commonClasses.label} htmlFor="fecha">
          Fecha:
        </label>
        <input
          type="date"
          value={experienceDate ? experienceDate.split("T")[0] : ""}
          onChange={handleExperienceDateChange}
        />

        <label className={commonClasses.label} htmlFor="horaInicio">
          Hora de inicio:
        </label>
        <input
          type="time"
          id="horaInicio"
          name="startTime"
          className={commonClasses.input}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="horaFin">
          Hora de finalización:
        </label>
        <input
          type="time"
          id="horaFin"
          name="endTime"
          className={commonClasses.input}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="precio">
          Precio:
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          className={commonClasses.input}
          min="0"
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="cupos">
          Cupos:
        </label>
        <input
          type="number"
          id="cupos"
          name="cupos"
          className={commonClasses.input}
          min="1"
          onChange={(e) => setSlots(e.target.value)}
        />

        <label className={commonClasses.label} htmlFor="category">
          Categoría:
        </label>
        <select
          id="category"
          name="category_id"
          className={commonClasses.select}
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Seleccione categoría</option>
          {data?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className={commonClasses.button} type="submit">
          Crear tour
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
