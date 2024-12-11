import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteTour, updateTourCategory } from "../../provider/tours/toursProvider";
import { getCategory } from "../../provider/category/categoryProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const TourListRow = ({ tour, refreshTours }) => {
  const [tourId, setTourId] = useState();
  const [categoryId, setCategoryId] = useState();

  const handleTypeChange = (tourId, selectCategoryId) => {
    setTourId(tourId);
    setCategoryId(selectCategoryId);
    
  };

  const { data: categoryData } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const mutation = useMutation({
    mutationFn: updateTourCategory,
  });

  // const navigate = useNavigate();
  // const linkTour = (tourID) => {
  //   navigate('/register');
  // };

  const handleDeleteTour = async (tourId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el tour de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    console.log(tourId)
    
    if (result.isConfirmed) {
      try {
        await deleteTour(tourId);
        console.log(`Eliminando tour con ID: ${tourId}`);
        // Simulación de éxito
        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "El tour ha sido eliminado correctamente.",
          confirmButtonText: "Aceptar",
        });
        refreshTours();

      } catch (error) {
        // Manejo de errores
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al intentar eliminar el tour.",
          confirmButtonText: "Aceptar",
        });
        console.error("Error:", error);
      }
    }

  };

  return (
    <tr key={tour.id} style={{verticalAlign:'middle'}}>
      <td scope="row">
        <span className="tour-list-item">
        <Link to={`/tour/${tour.id}`}>        
          {tour.name}
        </Link>  
        </span>      
        </td>
      <td>{tour.country}</td>
      <td>{tour.city}</td>
      <td>
        <select
          className="form-select"
          aria-label="Select Category"
          id={tour.id}
          value={categoryId ?? tour.categoryId}
          onChange={(e) => handleTypeChange(tour.id, e.target.value)}
        >
          {categoryData?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          style={{
            backgroundColor: `${mutation.isPending ? "white" : "#136060"}`,
            width: "110px",
            border: "2px solid #136060",
          }}
          onClick={() => {
            mutation.mutate({ tourId, categoryId });
            refreshTours();
          }}
        >
          {mutation.isPending ? (
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            "Actualizar"
          )}
        </button>
        <button
        style={{
          backgroundColor: "black",
          width: "110px",
          border: "2px solid black",          
        }}
        onClick={() => handleDeleteTour(tour.id)} 
        >Eliminar</button>
      </td>
    </tr>
  );
};

export default TourListRow;
