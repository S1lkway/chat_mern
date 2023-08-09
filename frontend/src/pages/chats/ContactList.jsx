import { Box, TextField } from '@mui/material';

function ContactList() {
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ position: 'sticky', top: 0 }}>
        <TextField size="small" label="Search contact" variant="outlined" sx={{ width: '100%' }} />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>

      </Box>
    </Box>
  )
}

export default ContactList