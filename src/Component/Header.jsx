import React from 'react';
import { Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { MessageSquare, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../Context/ContextProvider';

export default function Header() {
  const {state:{isLogin , currentUser} , dispatch } = useValue();
  console.log(isLogin);
  const navigate = useNavigate();
   const  handleLogin = ()=>{
    navigate('/login')
   }
   const handalLogout = ()=>{
    localStorage.removeItem('currentUser')
    dispatch({type:'CLOSE_LOGIN'})
   }
  return (
    <AppBar position="sticky" style={{ background: '#fff', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton style={{ backgroundColor: '#007bff', padding: '8px', borderRadius: '8px' }}>
            <MessageSquare className="h-6 w-6 text-white" />
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: '8px', fontWeight: 'bold', color: '#007bff' }}>
            Support Center
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <HelpCircle className="h-5 w-5" />
          </IconButton>
          {isLogin?(<Button variant="contained" color="primary" style={{ marginLeft: '12px' }} onClick={handalLogout}> 
            Logout
          </Button>):(<Button variant="contained" color="primary" style={{ marginLeft: '12px' }} onClick={handleLogin} >
            Login
          </Button>)}
 
        </div>
      </Toolbar>
    </AppBar>
  );
}
