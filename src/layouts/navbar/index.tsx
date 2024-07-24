//import React from 'react'
import {Link} from 'react-router-dom'
import React, { useState } from 'react'

import ModeToggle from './themeReverse'







export default function Navbar(){

   const [open, setOpen] = useState<boolean>(false);

   const pagesNav = [
      { text: 'Home', href: '/' },
      { text: 'Creation', href: '/Creation' },
      { text: 'Recipes', href: '/recipes' },
      { text: 'new Recipe', href: '/recipes/new' },
      { text: 'Ingredients', href: '/Ingredients' },
    ];


    function onClickHander(){
      setOpen(!open);
    };

  return (
      <div className="navbar bg-base-100">

        <div className="flex-1">
        <Link to='/' className='btn btn-ghost text-xl'>SCOOP SCIENCE</Link>
        </div>


     <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li>
          <Link to='/recipes' ><a>Recipes</a></Link>
            <ul className="p-2">
            <Link to='/recipes' ><li><a>Submenu 1</a></li></Link>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
     </div>

          <div className="navbar-center hidden lg:flex">
          <ul className=" menu menu-horizontal px-2 ">
            <li><a>Item 1</a></li>
            <li>
              <details open={open}>
                <summary onClick={onClickHander}>Recipes</summary>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li onClick={onClickHander}><Link to='/recipes/new' ><a>New Recipe</a></Link></li>
                <li onClick={onClickHander}><Link to='/recipes' ><a>Search Recipe</a></Link></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>


    <div className="navbar-end flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
      </div>
      <div>
    <ModeToggle />
    </div>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
      
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}





/*
old:
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
 

   <HideOnScroll {...props}>
      <AppBar position="sticky" elevation={0} sx={{ maxHeight: '64px', bgcolor:'#C3712A'}}>
         <Toolbar>


            <Link to='/'>
               <Box component='img' sx={{maxHeight: '42px', paddingRight: '10px'}} alt='logo' src={logo_l} />
            </Link>
         
            <Divider orientation="vertical" flexItem sx={{bgcolor:'gray'}} />

            <Stack direction='row' sx={{height: '64px', paddingBlock: "15px"}}>

            {pagesNav.map((map, index) => (
               <React.Fragment key={index}>
               <Button color='inherit'>
                  <NavLink to={map.href} style={{ color: 'white', textDecoration: "none",  }}>{map.text}</NavLink>
               </Button>
               <Divider orientation="vertical" flexItem sx={{ bgcolor: 'gray' }} />
               </React.Fragment>
          ))}
            </Stack>
      </Toolbar>
   </AppBar>
   </HideOnScroll>
   */

/*css:



body, html {
   margin: 0;
   padding: 0;
   width: 100%;
 }
 
 #root {
   width: 100%;
   background-color: #ebcab1;
 }

 
 */