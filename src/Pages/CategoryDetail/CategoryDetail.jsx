import React from 'react'
import { useParams } from 'react-router-dom';
import CategorySection from '../../Components/CategorySection';

const CategoryDetail = () => {
    const { id } = useParams();
    return (
        <div className=''>
            <CategorySection id={id} />
        </div>
    )
}

export default CategoryDetail