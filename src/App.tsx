import { useRoutes } from 'react-router-dom';
import routes from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AppProvider } from './AppProvider';
import i18next from 'i18next';

function App() {
  i18next.changeLanguage('ja');
  // const existedUserSession = JSON.parse(
  //   localStorage.getItem('accessToken') || 'null'
  // );
  const existedUserSession = true;
  const content = useRoutes(routes(Boolean(existedUserSession)));

  return (
    <ThemeProvider>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;
