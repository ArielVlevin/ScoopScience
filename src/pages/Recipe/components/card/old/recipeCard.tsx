import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import ShareIcon from '@mui/icons-material/Share';
import { Box, CardActionArea, Grid, Rating, Toolbar } from '@mui/material';

import exampleimg from "../../../../../assets/icecream-example.jpeg";
import { useState } from 'react';
//import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RecipeData } from '../../../../../Types/recipe';


[  { isActive: true, name: "hi1" },
   { isActive: false, name: "hi2" },
   { isActive: true, name: "hi3" },
   { isActive: true, name: "hi4" },
   { isActive: true, name: "hi6" },
   { isActive: true, name: "hi7" },
] 

export default function RecipeReviewCard({id, recipeName, recipeIngredient, recipeRating}:RecipeData) {

   const navigate = useNavigate();
   const [ isHovered, setIsHovered ] = useState(false); 

   function handleMouseOver() {
      setIsHovered(true);
  }

  function handleMouseOut() {
      setIsHovered(false);
  }

  function clickHandle(){
   navigate("/recipes/" + id);
  }

  return (
<Box sx={{width: '100%'}}>
   <Card elevation={0} sx={{ minHeight: '20s0px',maxHeight: '250px', backgroundColor:'#AD825F'}}>
   <CardActionArea  onClick={clickHandle}
         onMouseOver={ handleMouseOver }
         onMouseOut={ handleMouseOut }
      >
   <Toolbar sx={{height: '100%'}}>      
         
      <CardMedia component="img"  sx={{padding: '2px', maxWidth: '25%', maxHeight: '25%'}} loading='lazy' image={exampleimg} alt={recipeName}/>

      <Grid container height={'100%  50px'} justifyContent={'space-between'} alignSelf={'start'}>

      <CardContent sx={{width: '100%'}} >
      <Typography variant="body2" color="text.secondary">{recipeIngredient.kind}</Typography>
      <Typography variant="body1" sx={{fontSize:'20px', fontWeight: 'bold' }}>{recipeName}</Typography>
      <Grid container justifyContent="flex-end">
      <Rating name="half-rating-read" value={recipeRating.ratingValue} defaultValue={5} precision={0.5} readOnly />
      </Grid>
      </CardContent> 


      </Grid>
      </Toolbar>
      </CardActionArea>
   </Card>
    </Box>

  );
}












/*



  return (
<Box>
      <Card elevation={0} sx={{ Width: 850,  Height: 500, backgroundColor:'#AD825F'}}>

<CardActionArea onClick={clickHandle}>
      <Box sx={{position: 'relative'}}>
      <CardActionArea
                onMouseOver={ handleMouseOver }
                onMouseOut={ handleMouseOut }
            >
               { isHovered?<>
            <CardMedia component="img" height="350" loading='lazy' image={exampleimg} alt={recipeName}/>
            <CardActionArea>

            <IconButton
          aria-label="Like"
          sx={{
            color: 'red',
            position: 'absolute',
            bottom: '20px',
            left: '1rem',

            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>


            <Stack   direction='row'   sx={{
              position: 'absolute',
              zIndex: 4,
              borderRadius: '80%',
              bottom: 0,
              right: '1rem',
            }}>
               <IconButton aria-label="share" sx={{color: 'darkgreen',}}>
                  <ShareIcon />
               </IconButton>         
               <IconButton aria-label="share" sx={{color: 'navy',}}>
                  <ShareIcon />
               </IconButton>
               <IconButton aria-label="share" sx={{color: 'darkred',}}>
                  <ShareIcon />
               </IconButton>
               <IconButton aria-label="share" sx={{color: 'darkblue',}}>
                  <ShareIcon />
               </IconButton>
               <IconButton aria-label="share" sx={{color: 'darkorange',}}>
                  <ShareIcon />
               </IconButton>
      
            </Stack>
           
          </CardActionArea></>
      :
      <CardMedia component="img" height="350" loading='lazy' image={exampleimg} alt={recipeName}/>
               }
      </ CardActionArea>
      

      </Box>
      
      <CardContent>
      <Typography variant="body2" color="text.secondary">{recipeIngredient.kind}</Typography>
      <Typography variant="body1" sx={{fontSize:'14px', fontWeight: 'bold' }}>{recipeName}</Typography>
      <Grid container justifyContent="flex-end">
      <Rating name="half-rating-read" value={recipeRating.ratingValue} defaultValue={5} precision={0.5} readOnly />
      </Grid>
      </CardContent>
      
      
      </CardActionArea>
      
      
    </Card>
    </Box>

  );
}; 
*/