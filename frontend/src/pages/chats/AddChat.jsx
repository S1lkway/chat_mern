//- MUI
import { Box, TextField } from '@mui/material';

function AddChat() {
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        // onSubmit={onSubmit}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 1
        }}
      >
        <TextField
          size='small'
          label="Search user by email"
          type="email"
          name="email"
          variant="outlined"
          color="primary"
          title="Type email to find a user and create a new chat"
          // margin="normal"
          // value={email}
          // onChange={onChange}
          sx={{ width: '100%', mt: 1 }}
        />
      </Box>
    </>
  )
}

export default AddChat