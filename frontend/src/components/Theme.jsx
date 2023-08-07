import { createTheme } from '@mui/material';

const MainTheme = createTheme({
  palette: {
    primary: {
      main: '#333', // Серый цвет для основных элементов (например, кнопок)
    },
    background: {
      default: '#FFF', // Белый цвет для фона
    },
  },
});

export default MainTheme;