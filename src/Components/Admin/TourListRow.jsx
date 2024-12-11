import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  updateTourCategory,
  deleteTour,
} from "../../provider/tours/toursProvider";
import { getCategory } from "../../provider/category/categoryProvider";
import Swal from "sweetalert2";

const TourListRow = ({ tour }) => {
  const [tourId, setTourId] = useState();
  const [categoryId, setCategoryId] = useState();
  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour"] });

      Swal.fire({
        icon: "success",
        title: "Tour Eliminado",
        text: `El tour "${tour.name}" ha sido eliminado exitosamente.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || `No se pudo eliminar el tour "${tour.name}".`,
        confirmButtonColor: "#d33",
        confirmButtonText: "Cerrar",
      });
    },
    retry: 0,
  });

  const handleDeleteTour = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar el tour "${tour.name}". No podrás revertir esta acción.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(tour.id);
      }
    });
  };

  return (
    <tr key={tour.id}>
      <td scope="row">{tour.name}</td>
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
      <td className="d-flex gap-3 justify-content-center">
        <button
          style={{
            backgroundColor: `${mutation.isPending ? "white" : "#136060"}`,
            width: "110px",
            border: "2px solid #136060",
          }}
          onClick={() => {
            mutation.mutate({ tourId, categoryId });
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
          className="bg-danger"
          style={{ width: "110px" }}
          onClick={handleDeleteTour}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TourListRow;
