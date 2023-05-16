import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CyclesProvider } from './context/CyclesContext';
import Router from './routes';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
