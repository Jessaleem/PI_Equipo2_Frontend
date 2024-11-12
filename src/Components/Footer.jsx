import React from "react";
const Footer = () =>(
    <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="footer-left">
                <img src="https://s3-alpha-sig.figma.com/img/4a37/3a79/a43d8cb48103b9db7636f424d9ebddc1?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W4FdLKjnJcKmBKrsLsghBmIJ8ugCv7ganYK6vuStUQJUCVP5FpKBlLZSfyhfnUlA-GnItlT-zh1c8bxtH7PWG9vxkviQhgw2mleRG4RvQyY-t6TI7bTLjr~TCe4dKOzzp9yZ5PxiLKsXBcswQTKarqgJF7hRxw9K0rNQLJglEFX0vIZvsz9CVSNwHyr2G-9xur2RbU1r5gt3WZL2Ihh~hAKTjuOi0Buy8fUnm9Cna9mCJQ1ZjQVhma1vEpM57lMQMm5wWR-TvXpRd5Lz5LSl-OcB~SRT6d4XVPhj2B2DA0-qx8p3NXi3jryvo4JQJxzMnpplCF2OHYCjwJC61S2hyg__" 
                alt="ViveVibes" className="footer-img mx-auto" ></img>
                <span>© 2024 ViveVibes - Todos los derechos reservados</span>
                {/* <p className="mt-2">
                    <a href="#" className="hover:underline">Política de privacidad</a> · 
                    <a href="#" className="hover:underline ml-2">Términos y condiciones</a> · 
                    <a href="#" className="hover:underline ml-2">Mapa de sitio</a>
                </p> */}
            </div>
            
            <div className="footer-right">
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-facebook-f"></i>
                </a>
                {/* <a href="" class="me-4 text-reset">
                    <i class="fab fa-twitter"></i>
                </a> */}
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-instagram"></i>
                </a>                
            </div>
        </section>

    </div>
    


)

export default Footer;