import axios from "axios";


/*
export const Http = async ({ header, id , method}: HttpProps): Promise<any> =>  {
  
   id = id?`/${id}`:'';

   const httpAdress = `http://localhost:3000/${header}${id}`;

   console.log('httpAdress:', httpAdress);
   
   const response = await fetch(`http://localhost:3000/${header}${id}`, {
     method: method,
     headers: {
       'Content-Type': 'application/json',
     },
     //method==='POST'? {body: JSON.stringify({})}:{}
   });
 
   if (!response.ok) {
     throw new Error('Failed to fetch ingredient');
   }
 
   return response.json();
 };

*/


export type getProps = {
  header: string;
  id?: string;
};

 export default function getData({ header, id}: getProps){  
  const newHeader = id?`${header}/${id}`:header;
  console.log('::from api/get.tsx::  newHeader:', newHeader);
  return axios.get('http://localhost:3000/get/' + newHeader).then((response) => response.data);
 }