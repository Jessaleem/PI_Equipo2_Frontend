import React from "react";
import { useLocation } from "react-router-dom";
import logo from '@assets/logo_with_text.svg'

const Footer = () => {
  const location = useLocation();
  
  return (
    <div
      className={`footer  ${
        location.pathname === "/register" ? "d-none" : ""
      }`}
    >
      <section className="footer-section">
        <div >
          <img
               src={logo}
            className="footer-img"
          />
         {/*   <span>© 2024 ViveVibes - Todos los derechos reservados</span>*/}
          {/* <p className="mt-2">
              <a href="#" className="hover:underline">Política de privacidad</a> · 
              <a href="#" className="hover:underline ml-2">Términos y condiciones</a> · 
              <a href="#" className="hover:underline ml-2">Mapa de sitio</a>
          </p> */}
        </div>

        <div className="footer-right">
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          {/* <a href="" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
            </a> */}
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
