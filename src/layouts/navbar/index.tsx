//import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'
import { Divider,Box, AppBar, Toolbar, Stack, Button, useScrollTrigger, Slide } from '@mui/material'
import React from 'react'

import logo_l from '../../assets/logo-white.png'



interface Props {
   children: React.ReactElement;
 }
 
 function HideOnScroll(props: Props) {
   const { children } = props;
   const trigger = useScrollTrigger({});
 
   return (
     <Slide appear={false} direction="down" in={!trigger}>
       {children}
     </Slide>
   );
 }
 

export default function Navbar(props: Props){

   const pagesNav = [
      { text: 'Home', href: '/' },
      { text: 'Creation', href: '/Creation' },
      { text: 'Recipes', href: '/recipes' },
      { text: 'new Recipe', href: '/recipes/new' },
      { text: 'Ingredients', href: '/Ingredients' },
    ]


  return (
   <HideOnScroll {...props}>
      <AppBar position="sticky" elevation={0} sx={{ maxHeight: '64px', bgcolor:'#784B26'}}>
         <Toolbar>


            <Link to='/'>
               <Box component='img' sx={{maxHeight: '42px', paddingRight: '10px'}} alt='logo' src={logo_l} />
            </Link>
         
            <Divider orientation="vertical" flexItem sx={{bgcolor:'gray'}} />

            <Stack direction='row' sx={{height: '64px', paddingBlock: "15px"}}>

            {pagesNav.map((map, index) => (
               <React.Fragment key={index}>
               <Button color='inherit'>
                  <NavLink to={map.href} style={{ color: 'white', textDecoration: "none" }}>{map.text}</NavLink>
               </Button>
               <Divider orientation="vertical" flexItem sx={{ bgcolor: 'gray' }} />
               </React.Fragment>
          ))}
            </Stack>
      </Toolbar>
   </AppBar>
   </HideOnScroll>
   /*if(is special page){
      <Navbarlow />

      other option: add the nav bar low to navbar file
   }*/

  )
}

