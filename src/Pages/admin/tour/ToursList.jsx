import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../../../context/useGeneralContext";
import { getAllTours } from "../../../provider/tours/toursProvider";
import { useQuery } from "@tanstack/react-query";
import TourListRow from "../../../Components/Admin/TourListRow";

const ToursList = () => {
  const navigate = useNavigate();
  const { state } = useGeneralContext();
  const loggedUser = state.isLoggedIn;
  const userInformation = state.userData;
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  useEffect(() => {
    if (!loggedUser) {
      navigate("/");
    } else if (userInformation.type === 3) {
      navigate("/");
    }
  }, [userInformation, loggedUser]);

  if (loggedUser && userInformation.type != 3)
    return (
      <div className="min-vh-100 p-2">
        <div className="container" style={{ marginTop: 50 }}>
          <button className="btn btn-primary mb-3" onClick={refetch}>
            Recargar Información
          </button>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <table className="table table-bordered" style={{ maxWidth: "" }}>
              <thead>
                <tr>
                  <th scope="col">Nombre de Tour</th>
                  <th scope="col">Pais</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data
                  ?.sort((a, b) => a.id - b.id)
                  .map((tour) => (
                    <TourListRow tour={tour} key={tour.id} />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
};

export default ToursList;
