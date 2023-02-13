//  Shoop pagination

const menue_for_shop=document.querySelector('.menue_for_shop');
const page_div=document.querySelector('.page_div')
let dataCount=0
let limit=10;
window.addEventListener('resize',()=>{
    location.reload()
    getDataWithPage(1,limit)
});

function getDataWithPage(page=1,limit){
menue_for_shop.innerHTML=""
fetch(`https://retoolapi.dev/yT0KID/data?_page=${page}&_limit=${limit}`)
 .then(response=>response.json())
 .then(data=>data.forEach(item=>{
    let div=document.createElement('div');
    div.className="shoop_box";
    div.innerHTML=` 
                    <img class="s8" src="${item.C}" alt="Товар" title="Товар">
                    <h2>${item.fullName}</h2>
                    <p>${item.D}</p>
                    <div class="run_box">
                        <div class="cost">${item.B}</div>
                        <div class="count">
                            <div class="minuss"><img src="/img/minus.png" alt=""></div>
                            <div class="count_number">1</div>
                            <div class="add"><img src="./img/+.png" alt=""></div>
                            
                        </div>
                        <div class="icon">
                            <img src="./img/Vector (1).png" alt="">
                        </div>
                    </div>
                `
   
   menue_for_shop.append(div)
 }))
}
function resize(){
    if(window.innerWidth<=700){
        limit=4
   }else if(window.innerWidth<=1024){
         limit=6
   }else if(window.innerWidth<=1360){
       limit=8
   }else{
        limit = 10
   }
}
window.onload=()=>{
    
    resize();
   getDataWithPage(1,limit)
}


 async function request () { 
     let data= await  fetch('https://retoolapi.dev/yT0KID/data')
     const dataResp=await data.json();
     dataCount=dataResp.length
  }

  async function pagination(){
      await  request ();
      let num= Math.ceil(dataCount/limit)
      menue_for_shop.innerHTML=''

    for(let i=1;i<=num;i++){
        
        let span=document.createElement('a');
        span.href="#filter_block";
        
        
        if(i == 1){
            span.classList.add("active")
        }
        

        span.innerText=i;
        span.addEventListener('click',(e)=>{
        getDataWithPage(i,limit);

        
       
        
    });

        
        page_div.append(span);
       
    }
    
    let spans = [...page_div.querySelectorAll("a")]
    document.addEventListener("click",(e)=>{
        let index;
       
        if(spans.includes(e.target)){
            spans.forEach(span=>{
                span.className=""
            })
            index= e.target.innerText;
            spans[index-1].classList.add("active")
            
        }
    })
    

  }



 pagination();

//slider
const sliderImg=[
`./img/anvadox.svg`,
`./img/maxxis-235-70-r16-ht-770.jpg`,
`./img/maxxis-235-50-r19-hp-m3.jpg`,
'./img/maxxis-7-00-16-m8090.jpg',
'./img/6381vaae0ccf0.jpg',
`./img/117126_FTR.webp`,
`./img/federal-himalaya-kattura-large.jpg`,
`./img/big_1_1__2_5.png`

]
const main = document.querySelector("main");
const mainCatalogBlogImg = main.querySelector(".main_catalog-block img");
const large = main.querySelector(".large");
const left = main.querySelector(".left");
const right = main.querySelector(".right");




function slaider(){
    let aggr = 0;
    let aggrForNumber = 1;
    let interval = setInterval(()=>{
        if(aggr === sliderImg.length){
            aggr = 0
        }else if(aggr < 0){
            aggr = 8
        }
        if(aggrForNumber > 8){
            aggrForNumber = 1
        }else if(aggrForNumber < 1){
            aggrForNumber = 8
        }
       
        mainCatalogBlogImg.src=`${sliderImg[aggr++]}`
        large.innerText=`${aggrForNumber++}`
    },3000)
    document.addEventListener("click",(e)=>{
        
        if(e.target == left || e.target == left.firstElementChild){
            
            clearInterval(interval);
            if(aggr === sliderImg.length){
                aggr = 0
            }else if(aggr < 0){
                aggr = 7
            }
            if(aggrForNumber > 8){
                aggrForNumber = 1
            }else if(aggrForNumber < 1){
                aggrForNumber = 8
            }
            mainCatalogBlogImg.src=`${sliderImg[aggr--]}`
            large.innerText=`${aggrForNumber--}`
            
    
        }else if(e.target == right || e.target == right.firstElementChild){
            clearInterval(interval);
            if(aggr === sliderImg.length){
                aggr = 0
            }else if(aggr < 0){
                aggr = 7
            }
            if(aggrForNumber > 8){
                aggrForNumber = 1
            }else if(aggrForNumber < 1){
                aggrForNumber = 8
            }
            mainCatalogBlogImg.src=`${sliderImg[aggr++]}`
            large.innerText=`${aggrForNumber++}`
        }
        
    })


}
slaider();




