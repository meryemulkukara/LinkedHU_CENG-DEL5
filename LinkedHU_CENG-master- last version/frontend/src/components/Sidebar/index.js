
import {Drawer,Container, Box, IconButton, Button, TextField} from '@mui/material';
import { Close} from '@mui/icons-material';

const Sidebar = () => {

    return (
      
      <Drawer
      variant="persistent"
      open={true}
      sx={{
       
        color: '#fff',
        position: 'relative',
        top: 0,
        left: 0,
        border: 'none'
      }}
      >
      <Container maxWidth="sm" style={{ backgroundColor: '#141932'}}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            edge="end"
            color="default"
            aria-label="delete"
          >
            <Close />
          </IconButton>
        </Box>
        <TextField autoFocus fullWidth={true} label="Slug" />
        <Box  paddingTop={4} display="flex" justifyContent="flex-end">
          <Button edge="end" variant="outlined">Save</Button>
        </Box>
      </Container>
    </Drawer>
    );
  }

export default Sidebar;