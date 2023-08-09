import { useNavigate } from 'react-router-dom'
//-MUI
import { Box, IconButton, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Chats() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', }}>
      {/* LEFT PART */}
      <Box sx={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', }}>
        <Box display="flex" justifyContent="center" sx={{ pt: 1 }}>

          <IconButton
            size="small"
            aria-label="main"
            color="#333"
            onClick={() => navigate('/chats')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
                backgroundColor: 'transparent',
              },
            }}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            <Typography variant='caption'>Add contact</Typography>
          </IconButton>

          <IconButton
            size="small"
            aria-label="main"
            color="#333"
            onClick={() => navigate('/chats')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
                backgroundColor: 'transparent',
              },
            }}
          >
            <PeopleAltIcon sx={{ mr: 1 }} />
            <Typography variant='caption'>Contacts list</Typography>
          </IconButton>
        </Box>
        <Box sx={{ position: 'sticky', top: 0, p: 1.5, }}>
          <TextField size="small" label="Поиск контакта" variant="outlined" sx={{ width: '100%' }} />
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5 }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>Контакт 1</li>
            <li>Контакт 2</li>
            <li>Контакт 3</li>
            <li>Контакт 1</li>
            <li>Контакт 2</li>
            <li>Контакт 3</li>
            <li>Контакт 1</li>
            <li>Контакт 2</li>
          </ul>
        </Box>
      </Box>

      {/* RIGHT PART */}
      <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5 }}>
          <div>Сообщение 1</div>
          <div>Сообщение 2</div>
          <div>Сообщение 3</div>
          <div>Сообщение 1</div>
          <div>Сообщение 2</div>
        </Box>

        <Box sx={{ position: 'sticky', bottom: 0, p: 1.5 }}>
          <TextField size="small" label="Введите сообщение" variant="outlined" sx={{ width: '100%' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Chats