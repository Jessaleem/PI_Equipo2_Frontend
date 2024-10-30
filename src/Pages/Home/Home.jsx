import Banner from "../../Components/Banner";
import Categorias from "../../Components/Categorias";
import Experiencias from "../../Components/Experiencias";
import ProductCard from "../../Components/ProductCard";
import ToursDestacados from "../../Components/ToursDestacados";

const Home = () => (
  <section>
    <Banner />
    <ToursDestacados />
    <Categorias />
    <Experiencias />
  </section>
);

export default Home;
