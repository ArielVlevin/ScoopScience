//import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'

import logo_l from '../../assets/logo-black.png'

import { Divider,Box, AppBar, Toolbar, Stack, Button } from '@mui/material'


/*

            <Box       sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            '& svg': {
               m: 2,
            },
            '& hr': {
               mx: 0.5,
            },
            }}>
               <li className='active'>         // active mean this is the current page 
               <NavLink to='/' >Home</NavLink>
               </li>
               <Divider orientation="vertical" flexItem />
               <li>
                  <NavLink to='/products' >Products</NavLink>
               </li>
               <Divider orientation="vertical" flexItem />
               <li>
                  Home
               </li>
            </Box>
            <Divider orientation="vertical" flexItem />
            <div className='search-box'>
               <input type='text' placeholder='Search' />
               <img src={search_l} alt=''/>
            </div>

            <img src={heart} alt='' className='like'/>
            <img src='' alt='' className='profile'/>

*/

const Navbar = () => {

   const pagesNav = [
      { text: 'Home', href: '/' },
      { text: 'Recipes', href: '/recipes' },
      { text: 'Products', href: '/products' },
    ]

  return (
      <AppBar position="static"  sx={{maxHeight: '64px', bgcolor:'#2C2929'}}>
         <Toolbar>

            <Link to='/'>
               <Box component='img' sx={{maxHeight: '42px', paddingRight: '10px'}} alt='logo' src={logo_l} />
            </Link>
            <Divider orientation="vertical" flexItem sx={{bgcolor:'gray'}} />

            <Stack direction='row' sx={{height: '64px', paddingBlock: "15px"}}>

               {pagesNav.map((map)=>(<>
                  <Button color='inherit'>
                     <NavLink to={map.href} style={{color:'white' ,textDecoration: "none" }}>{map.text}</NavLink>
                  </Button>
                  <Divider orientation="vertical" flexItem sx={{bgcolor:'gray'}} />
                  </>
               ))}
            </Stack>

      </Toolbar>
   </AppBar>

   /*if(is special page){
      <Navbarlow />

      other option: add the nav bar low to navbar file
   }*/

  )
}

export default Navbar