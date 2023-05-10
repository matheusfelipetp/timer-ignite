import { ListBullets, Timer } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import { HeaderStyled } from './styles';

export default function Header() {
  return (
    <HeaderStyled>
      <img src={Logo} alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={32} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <ListBullets size={32} />
        </NavLink>
      </nav>
    </HeaderStyled>
  );
}
