import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGeneralContext } from '../../../context/useGeneralContext';
import AddCategoryForm from '../../../Components/Admin/AddCategoryForm';
import { useQuery } from '@tanstack/react-query';

const AddCategory = () => {
    
    const navigate = useNavigate();
	const { state } = useGeneralContext();
	const loggedUser = state.isLoggedIn;
	const userInformation = state.userData;

	useEffect(() => {
		if (!loggedUser) {
			navigate("/");
		} else if (userInformation.type === 3) {
			navigate("/");
		}
	}, [userInformation, loggedUser]);

	const { data } = useQuery({
		queryKey: ["category"],
		queryFn: () => getCategory(),
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	if (loggedUser && userInformation.type != 3) {
		return (
			<div className="w-max-1280">
				<h2 className="" style={{ marginTop: "70px" }}>
					AGREGAR CATEGORÍA
				</h2>
				<div className="py-5">
					<AddCategoryForm dataCategory={data} />
				</div>
			</div>
		);
	}
    
    
}

export default AddCategory