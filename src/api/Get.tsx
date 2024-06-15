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


interface  HttpProps {
  header: string;
  id?: string;
 // method: 'GET' | 'POST';
}

 export default function getData({ header, id}: HttpProps){  
  const newHeader = id?`${header}/${id}`:header;
  console.log('::from api/get.tsx::  newHeader:', newHeader);
  return axios.get('http://localhost:3000/' + newHeader).then((response) => response.data);
 }