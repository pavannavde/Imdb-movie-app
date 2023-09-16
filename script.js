 const searchbtn = document.getElementById("btn")
 const apikey= document.getElementById("apikey")
 const search= document.getElementById("search")
 const cardsDiv = document.getElementById("M-cards")
 const loader = document.getElementById("loader");
 const msg = document.getElementById("errorMsg")
 const moreDetails= document.getElementById("moreDetails")
 const details=document.getElementById("details")
 
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
            details.innerHTML="";
            msg.style.display="block";
            msg.innerHTML=`${data.Error}`
          }
          else{
            RenderData(data.Search);
          }
    }
    catch(error){
        loader.style="display:none";
        details.innerHTML="";
        console.error(error);
    }

}
 function RenderData(data){
    cardsDiv.innerHTML="";
    details.innerHTML="";
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
             <p>Release Year : ${item.Year}</p>
             <p>Type : ${item.Type}</p>
             <p id="moreDetails">More Details ><p>
         </div>`
         count++;
         cardsDiv.appendChild(card);

        card.addEventListener("click",()=>renderDetails(item.imdbID));

    });
      
 }


 async function renderDetails(Id){
    cardsDiv.innerHTML="";
    details.innerHTML="";
    const response= await fetch(`https://www.omdbapi.com/?i=${Id}&apikey=${apikey.value}`)
    const data = await response.json();
          if(data.Error){
            loader.style="display:none";
            msg.style.display="block";
            msg.innerHTML=`${data.Error}`
          }
          else{
           const cardDe= document.createElement("div")
           cardDe.className="detailsCard";
           cardDe.innerHTML=`<img src="${data.Poster}" alt="poster">
           <div>
              <p>Title : ${data.Title}</p>
              <p>Type : ${data.Type}</p>
              <p>Release Date : ${data.Released}</p>
              <p>Genre : ${data.Genre}</p>
              <p>Director : ${data.Director}</p>
              <p>Actors : ${data.Actors} </p>
              <p>imdb Rating : ${data.imdbRating}</p>
              <p>imdb Votes :${data.imdbVotes}</p>
           </div>`
            details.appendChild(cardDe);

          }

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