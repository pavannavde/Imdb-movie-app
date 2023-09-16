 const searchbtn = document.getElementById("btn")
 const apikey= document.getElementById("apikey")
 const search= document.getElementById("search")
 const cardsDiv = document.getElementById("M-cards")
 const loader = document.getElementById("loader");
 const msg = document.getElementById("errorMsg")
 
  searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    loader.style.display="block";
    msg.style.display="none";
    cardsDiv.innerHTML="";
    let key = apikey.value;
    let searchValue=search.value;
    if(!key || !searchValue)
    {
        msg.style.display="block";
        msg.innerHTML="Please provide api_key and Movie title!"
        loader.style.display="none";

    }
    else{
        fethDetails(key,searchValue)
    }
  })
 
async function fethDetails(key ,searchValue){
    try{
        const response = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${key}`)
        // .then(res=>{
        //     if(!res.ok)
        //     {
        //        throw new Error("Invalid Api Key")
        //     }
        //     return res.json()
        // })
          const data = await response.json();
          if(data.Error){
            loader.style="display:none";
            msg.style.display="block";
            msg.innerHTML=`${data.Error}`
          }
          else{
            RenderData(data.Search);
          }
    }
    catch(error){
        loader.style="display:none";
        console.error(error);
    }

}
 function RenderData(data){
    cardsDiv.innerHTML="";
     let count=1;
     msg.style.display="none";
     loader.style="display:none";
    data.forEach((item)=>{
        let card = document.createElement("div")
        card.className="card";
        card.innerHTML=` <img src="${item.Poster}" alt="N/A">
        <div>
         <p class="num">${count}</p>
         <div class="details">
             <p>${item.Title}</p>
             <p>Release Year :${item.Year}</p>
             <p>Type:${item.Type}</p>
         </div>`
         count++;
         cardsDiv.appendChild(card);
    });
      
 }


//  fethDetails();
 
// Search : 
// Array(10)
// 0: 
// Poster:  "https://m.media-amazon.com/images/M/MV5BZjM2MjE4NWYtOTc1MC00ZDliLWIzYmYtNzNjMTU2Yzg4ODNlXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_SX300.jpg"
// Title :"Jawan"
// Type: "movie"
// Year: "2023"
// imdbID: "tt15354916"