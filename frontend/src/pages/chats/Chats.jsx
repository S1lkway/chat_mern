import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import ContactList from './ContactList';
import AddContact from './AddContact';
import Messages from './Messages';
//-MUI
import { Box, IconButton, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Chats() {
  // const navigate = useNavigate()
  // Contacts part content
  const [contactsContent, setContactsContent] = useState('contactList')

  const changeContactsContent = (content) => {
    setContactsContent(content)
  }

  return (

    <Box sx={{ display: 'flex', }}>
      {/* LEFT PART */}
      <Box sx={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', p: 1.5 }}>
        <Box display="flex" justifyContent="center">
          <IconButton
            size="small"
            aria-label="main"
            color={contactsContent === 'contactList' ? "#333" : "inherit"}
            onClick={() => changeContactsContent('addContact')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
                backgroundColor: 'transparent',
              },
            }}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>Add Contact</Typography>
          </IconButton>

          <IconButton
            size="small"
            aria-label="main"
            color={contactsContent === 'contactList' ? "inherit" : "#333"}
            onClick={() => changeContactsContent('contactList')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
                backgroundColor: 'transparent',
              },
            }}
          >
            <PeopleAltIcon sx={{ mr: 1 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>Contact list</Typography>
          </IconButton>
        </Box>

        {/* Contants content */}
        {contactsContent === 'contactList' ? <ContactList /> : <AddContact />}
      </Box>

      {/* RIGHT PART */}
      <Messages />
    </Box>
  )
}

export default Chats