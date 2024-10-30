import { Link } from 'react-router-dom';
import { Button } from './Button';
const Header = () => (
  <header className='fixed-top'>
    <nav
      className='navbar navbar-light px-5'
      style={{ backgroundColor: '#0B4040' }}
    >
      <div className='container-fluid'>
        <Link to={`/`}>
          <img
            src='https://s3-alpha-sig.figma.com/img/1027/fefe/087e522e2d2b6a6e8d1c875796b5854f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gA~vOqhxFrR7PWYVdJeBhC1r~BwWwKi061V2sEhKake9SLWI6533mDXaS-SA9u9wxgjmzlKAKXuJfxpz6l9JlQcRg2Dwxq~9K5lUzg3L33I~3vRc30b3x-YycYF5Xs4RcngblkuuuIudNdRNSMLTVC9U-ttmAeMQzQMLzjuLiitSkwtZYI86k~FFLINkN~T64LA9FcN0LcKcTLzvt3K2Dz1prVHQhphKI2Hawqhv-2yJvxXcG6q3sda65DZmxrfjcGQjSSoFyTmaisKfriv-8MKc8Xt-ptbcdZlJhfOJdbjXnyDEQt7kKYDQF8n~~MnLXnEJGOCivdtd9aJZz-zlTg__'
            alt='logo'
            width='180'
            height='90'
          />
        </Link>
        <section>
          <Button
            backgroundColor='#ACF2EB'
            value='Registrarse'
          />
          <Button
            backgroundColor='#A7F2CF'
            value='Iniciar Sesión'
          />
        </section>
      </div>
    </nav>
  </header>
);

export default Header;
