import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Box, CardActionArea, Grid, Rating, Stack } from '@mui/material';

import exampleimg from "../../assets/icecream-example.jpeg";
import { useState } from 'react';
import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RecipeData } from './recipeType';




export default function RecipeReviewCard({recipeId, recipeName, recipeIngredient, recipeRating}:RecipeData) {

   const navigate = useNavigate();
   const [ isHovered, setIsHovered ] = useState(false); 

   function handleMouseOver() {
      setIsHovered(true);
  }

  function handleMouseOut() {
      setIsHovered(false);
  }

  function clickHandle(){
   navigate("/recipes/" + recipeId);
  }

  return (

    <Card elevation={0} sx={{ Width: 350,  Height: 500}}>

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
  );
};


/*

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>




 <Box
      sx={{
        position: 'absolute',
        bottom: '200px',
        left: '0px',
        width: '5px',
      }}
    >  
    <CardActions>   <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  </CardActions>
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: '200px',
        left: '40px',
        width: '5px',
      }}
    >  
    <CardActions>   <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  </CardActions>
    </Box>      <Box
      sx={{
        position: 'absolute',
        bottom: '200px',
        left: '80px',
        width: '5px',
      }}
    >  
    <CardActions>   <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  </CardActions>
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: '200px',
        left: '120px',
        width: '5px',
      }}
    >  
    <CardActions>   <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  </CardActions>
    </Box>
    




      <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
        color: 'white',
        padding: '10px',
      }}
    >
      <Typography variant="h6">{recipeName}</Typography>
      <Typography variant="body2">{kind}</Typography>
    </Box>




*/