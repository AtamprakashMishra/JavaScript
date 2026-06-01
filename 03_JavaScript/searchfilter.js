let users =[
{
    name:"captian jack",
    pic:"https://i.pinimg.com/474x/0e/65/cf/0e65cff5242979bbcbaafd58eaf4230b.jpg",
    bio:"silent chose in a loun world , not for everyone"
},
{
name:"bilo rani",
pic:"https://i1-e.pinimg.com/736x/8f/c9/dd/8fc9ddc58f537f7866c952b33b0f2fdb.jpg",
bio:"attitute is everything",
},
{
    name:"bmw",
    pic:"https://i1-e.pinimg.com/1200x/d2/ea/5c/d2ea5c9823e0e77274952b2ec1f57808.jpg",
    bio:"never give up .."
},
{
    name:"jacksparrow",
    pic:"https://i1-e.pinimg.com/736x/d1/ba/25/d1ba25ff776cc1ba6f23a145445e86ed.jpg",
    bio:"chal nikal yrr.."
},
];
 

function showUsers(arr){
    arr.forEach(function(user){
    //create outer card div
const card = document.createElement("div");
card.classList.add("card");


// create img
const img = document.createElement("img");
img.src = user.pic;
img.classList.add("bg-img");

//create blured layerd div

const blurredLayer =document.createElement("div");
blurredLayer.style.backgroundImage= `url(${user.pic})`;
blurredLayer.classList.add("blurred-layer");

//cretae content div 
const content = document.createElement("div");
content.classList.add("content");

//create h3 and paragraph
const heading = document.createElement("h3");
heading.textContent = user.name;

const para = document.createElement("p");
para.textContent = user.bio;

//append heading and paragraph to content
content.appendChild(heading);
content.appendChild(para);

// append all to card
card.appendChild(img);
card.appendChild(blurredLayer);
card.appendChild(content);

// finally , append card to the body or any continer
document.querySelector(".cards").appendChild(card);
});
}


showUsers(users);

const noUserDiv =document.getElementById("no-user");
let inp = document.querySelector(".inp");

inp.addEventListener("input" , function(){
   let newUsers= users.filter((user) => {
        return user.name.toLocaleLowerCase().startsWith(inp.value.toLocaleLowerCase());
    })
    document.querySelector(".cards").innerHTML="";
    if(newUsers.length>0){
        noUserDiv.style.display = "none";
         showUsers(newUsers);
    } else{
        noUserDiv.style.display="block";
    }

   
})