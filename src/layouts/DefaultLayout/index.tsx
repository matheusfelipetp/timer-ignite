import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { LayoutStyled } from './styles';

export default function DefaultLayout() {
  return (
    <LayoutStyled>
      <Header />
      <Outlet />
    </LayoutStyled>
  );
}
