import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const BreadcrumbNavigation = () => {
  const { pathname } = useLocation();

  // Function to generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    const parts = pathname.split('/').filter(part => part !== ''); // Split the pathname and remove empty parts
    const breadcrumbs = parts.map((part, index) => {
      const route = `/${parts.slice(0, index + 1).join('/')}`; // Build the route for each breadcrumb
      return (
        <React.Fragment key={index}>
          <Link to={route} style={{  textDecoration: 'none', color: '#000' }}>{part}</Link>
          {index !== parts.length - 1 && <span style={{ fontSize: '20px', margin: '0 5px' }}> / </span>} 
        </React.Fragment>
      );
    });

    // Prepend the homepage link
    breadcrumbs.unshift(
      <React.Fragment key="home" >
        <Link to="/" style={{ textDecoration: 'none', color: '#000', marginLeft:12 }} >home</Link>
        {' '}
        <span style={{fontSize: '20px', margin: '0 5px' }}> / </span>
      </React.Fragment>
    );

    return breadcrumbs;
  };
  const shouldDisplayBreadcrumb = pathname !== '/';

  return shouldDisplayBreadcrumb ? (
   <Typography variant="body1" sx={{ margin: '10px 0' }}>
     {generateBreadcrumbs()}
   </Typography>
 ) : null;
};

export default BreadcrumbNavigation;