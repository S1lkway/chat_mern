import { Box, TextField } from '@mui/material';

function Messages() {
  return (
    <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1.5 }}>
      </Box>

      <Box sx={{ position: 'sticky', bottom: 0, p: 1.5 }}>
        <TextField size="small" label="Введите сообщение" variant="outlined" sx={{ width: '100%' }} />
      </Box>
    </Box>
  )
}

export default Messages