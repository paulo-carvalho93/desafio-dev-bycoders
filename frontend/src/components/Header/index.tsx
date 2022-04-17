import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/logo_bycoders.svg';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ size }: HeaderProps) => {
  const location = useLocation();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="Bycoders" />
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Listagem
          </Link>
          <Link
            to="/import"
            className={location.pathname === '/import' ? 'active' : ''}
          >
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

Header.defaultProps = {
  size: 'large',
};

export default Header;
