import Banner from "../../Components/Banner";
import Categorias from "../../Components/Categorias";
import Experiencias from "../../Components/Experiencias";
import ToursDestacados from "../../Components/ToursDestacados";

const Home = () => (
  <section>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <Banner />
    <ToursDestacados />
    <Categorias />
    <Experiencias />
  </section>
);

export default Home;
