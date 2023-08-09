// import { useState } from 'react'
//- MUI
import { Box, TextField, Typography } from '@mui/material';

function AddContact() {
  // const [searchList, setSearchList] = useState([])
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
          mt: 2
        }}
      >
        <TextField
          size='small'
          label="Name"
          name="name"
          variant="outlined"
          color="primary"
          // margin="normal"
          // value={password}
          // onChange={onChange}
          sx={{ width: '100%' }}
        />
        <TextField
          size='small'
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          color="primary"
          // margin="normal"
          // value={email}
          // onChange={onChange}
          sx={{ width: '100%', mt: 1 }}
        />
      </Box>
      {/* {searchList.length > 0 ? (
        <Box>sdsdsf</Box>
      ) : ( */}
      <Typography
        variant='span'
        sx={{ textAlign: 'center', mt: 1, color: '#787878' }}>Start to fill name or email to see a list of potencial contacts</Typography>
      {/* )} */}
    </>
  )
}

export default AddContact