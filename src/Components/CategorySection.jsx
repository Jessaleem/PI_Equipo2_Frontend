import React from 'react'
import { getTourByCategory } from '../provider/tours/toursProvider';
import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '../provider/category/categoryProvider';
import TourCardN from './TourCardN';

const CategorySection = ({ id }) => {
    
    const { data: dataTours, isLoading: loadingTours, isError: errorTours } = useQuery({
        queryKey: ["tour", id],
        queryFn: () => getTourByCategory(id),
    });

    // Consulta para obtener la información de la categoría
    const { data: dataCat, isLoading: loadingCategory, isError: errorCategory } = useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
    });

    return (
        <section className='category-section'>
            <div class="category-container">
                <h1 className='category-section-title'>{dataCat?.name ? dataCat.name : "Nombre de categoría no disponible"}</h1>
        
        {Array.isArray(dataTours) && dataTours.length > 0? (
            <div class="category-grid">            
                {dataTours?.map((tour) => (
                <div key={tour.id} className='tour-card-c'>
                <TourCardN
                    key={tour.id}  
                    tour = {tour}
                />
                </div>
                    ))}
                </div> 
                ) : (
            <p style={{ padding: 10, color: 'red', fontSize: '20px' }}>
            No se encontraron tours registrados en la categoría seleccionada.
            </p>
        )}
        </div>
        </section>
    )
}

export default CategorySection