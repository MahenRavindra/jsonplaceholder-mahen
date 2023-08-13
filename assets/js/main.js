//api url
const apiUrl="https://jsonplaceholder.typicode.com/";
let users;
let posts;
let albums;
let hide=true;

//fetch all data firstly
getApi("users");
getApi("posts");
getApi("albums");

//fetch function for all data
async function getApi(value) {
    try{
        const response = await fetch(apiUrl+value);
        var data = await response.json();
        console.log(data);
        if(value=="users"){
            users=data;
            showUsers(users);
            displayError(false); 
        }
        if(value=="posts"){
            posts=data;
            displayError(false); 
        }
        if(value=="albums"){
            albums=data;
            displayError(false); 
        }
    }
    catch(error){
        displayError(true);
    }
}

//display seleced user posts

//disply error message
function displayError(logic){
    if(logic==true){
    // alert("server is  not responding , please check your internet connection....");
    let display_error=`<h3 style="color:red;"> server is not responding , please check your internet connection.... </h3>`;
    document.getElementById("error-div").innerHTML =display_error;
    }
    else{
        document.getElementById("error-div").hidden=true;
    } 
}

//hide and show user table
function hideTable(){
    var table= document.getElementById("user-lists");
    var btnText=document.getElementById("user-table-btn");
    if(hide){
        table.style.display="none";
        btnText.innerHTML="Show Users";
        hide= !hide;
    }
    else {
        table.style.display="block";
        table.style.marginLeft="auto";
        table.style.marginRight="auto";
        table.style.width="50%";
        btnText.innerHTML="Hide Users";
        hide=!hide;
    }
   
}

//reset function after crud
function reset(){
    showUsers(users);
    blurMe();
    document.getElementById("selected-user").innerHTML=``; 
    document.getElementById("form-div").innerHTML=``; 
    document.getElementById("user-details").innerHTML=
    `<p>Select User in Table to manupulate data...</p>`; 
    setTimeout(blurMe,500);
}

//blur all the page with loading animation
function blurMe() {
    let spinner = document.querySelector("#loader_parent")
    if (spinner.classList.contains("blurred")) {
        spinner.classList.remove("blurred");
    } else {
    spinner.classList.add("blurred")
    }
};

//sort users
function sortAlbumPost(){

}

//pagination
function pagination(){

}

























