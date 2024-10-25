import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer";
import TourDetail from "./Pages/TourDetail/TourDetail";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path='/detail/:id' element={<TourDetail />} /> */}
			</Routes>
			<Footer />
		</>
	);
}

export default App;
