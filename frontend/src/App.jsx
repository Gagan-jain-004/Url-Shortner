import { useState } from "react"

import axios from 'axios';

function App() {
 
  const[originalUrl,setOriginalUrl] =useState('');
  const [shortUrl,setShortUrl] =useState('');


  const handleSubmit = ()=>{
    axios.post('https://url-shortner-dhwk.onrender.com/api/short',{originalUrl})
   .then((res)=>{
    setShortUrl(res.data)
    console.log("Api response",res.data)
   })
   .catch((err)=>console.log(err))
   
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
     <div className="bg-white  rounded-lg shadow-lg p-8 max-w-lg w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">SHORT URL</h1>
    
      <input type="text"
      placeholder="Enter URL to  shorten"
      onChange={(e)=> setOriginalUrl(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full mb-4"
      name="originalUrl" id='' />
    <div className="flex justify-center">

      <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white rounded-md  p-2 font-semibold hover:bg-blue-700">Shorten</button>
    </div>
     
     {
      shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-lg font-medium">Shortened URL:</p>
<a href={shortUrl.shortUrl}  
rel="noopener noreferrer"
className="text-blue-500 underline mt-2"
target="_blank">
{shortUrl?.shortUrl}
</a>  <div className="flex justify-center">

  {shortUrl && <img src= {shortUrl.qrCodeImg} alt="Generated QR Code"/>}
</div>
       </div>
  )
} 
    </div>
   </div>
   )
}

export default App
