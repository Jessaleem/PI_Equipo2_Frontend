import React from "react";
import { getCategory } from "../../../provider/category/categoryProvider";
import { useQuery } from "@tanstack/react-query";
import AddProductForm from "../../../Components/Admin/AddProductForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../../../context/useGeneralContext";

const AddProduct = () => {
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
					PANEL PARA AÑADIR PRODUCTO
				</h2>
				<div className="py-5">
					<AddProductForm dataCategory={data} />
				</div>
			</div>
		);
	}
};

export default AddProduct;
