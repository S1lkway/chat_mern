import { createTheme } from '@mui/material';

const MainTheme = createTheme({
  palette: {
    primary: {
      main: '#333333', // Серый цвет для основных элементов (например, кнопок)
    },
    background: {
      default: '#FFFFFF', // Белый цвет для фона
    },
  },
});

export default MainTheme;