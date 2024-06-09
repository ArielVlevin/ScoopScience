import { Ingredient } from "../../../../../Types/ingredient";


export const PostIngredient = async (ingredient: any): Promise<any> => {
  const response = await fetch('http://localhost:3000/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error('Failed to post ingredient');
  }

  return response.json();
};


export const GetIngredient = async (id: string): Promise<Ingredient> => {
   const header:string = 'ingredients';

   const response = await fetch(`http://localhost:3000/${header}/${id}`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
   });
 
   if (!response.ok) {
     throw new Error('Failed to fetch ingredient');
   }
 
   return response.json();
 };


 interface  GetRecipeProps {
   header: string;
   id?: string;
   method: 'GET' | 'POST';
}

export const Http = async ({ header, id , method }: GetRecipeProps): Promise<any> =>  {
  
   id = id?`/${id}`:'';
   const response = await fetch(`http://localhost:3000/${header}${id}`, {
     method: method,
     headers: {
       'Content-Type': 'application/json',
     },
   });
 
   if (!response.ok) {
     throw new Error('Failed to fetch ingredient');
   }
 
   return response.json();
 };
