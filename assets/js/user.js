//crud user
function funUser(id , option){

    if(option=="delete"){
       var answer=window.confirm(`Are you sure you want to delete ? id : ${id}`);
       if(answer){
           var index=users.findIndex((obj)=>obj.id===id);
           users.splice(index,1);
           reset();
       }  
    }
   
    if(option=="create"){

       let form=`
         <div style="border:1px solid; padding: 10px; border-radius:10px;">
           <div class="form-group" >
               <label for="exampleInputEmail1">Name</label>
               <input id="cname" type="text" class="form-control" id="name" aria-describedby="emailHelp">
           </div>
           <div class="form-group">
               <label for="exampleInputPassword1">User Name</label>
               <input id="cuname" type="text" class="form-control" id="uname" >
           </div>
           <div class="form-group">
               <label for="exampleInputPassword1">Email</label>
               <input id="cemail" type="email" class="form-control" id="email" >
           </div>
           <button class="btn btn-success my-1" onclick="registerUser()"><i class="bi bi-arrow-counterclockwise"></i>
           &nbsp; Register User</button>
         </div>
       `;
       document.getElementById("form-div").innerHTML=form;
       document.getElementById("form-div").scrollIntoView();
       document.getElementById("form-crud").innerHTML=``;
    }
   
    if(option=="update"){
       let manDetails=getOneUser(id);
       let form=``;
       console.log(manDetails);
   
       // alert(`${id} is updated Succesfully...`);
     for(let man of manDetails){ 
       form +=
       `<div style="border:1px solid; padding: 10px; border-radius:10px;">
           <div class="form-group" >
               <label for="exampleInputEmail1">Name</label>
               <input type="text" class="form-control" id="cname" value='${man.name}' aria-describedby="emailHelp">
           </div>
           <div class="form-group">
               <label for="exampleInputPassword1">User Name</label>
               <input type="text" class="form-control" id="cuname" value='${man.username}' >
           </div>
           <div class="form-group">
               <label for="exampleInputPassword1">Email</label>
               <input type="text" class="form-control" id="cemail" value='${man.email}' >
           </div>
           <button onclick="updateUser(${id})"  class="btn btn-success my-1"><i class="bi bi-arrow-counterclockwise" 
           ></i>
           &nbsp; Update</button>
       </div>
       `}
       document.getElementById("form-div").innerHTML=form;
       document.getElementById("form-div").scrollIntoView();
    }
   
   }
   
   function registerUser(){
       var nameVal=document.getElementById("cname").value;
       var usernameVal=document.getElementById("cuname").value;
       var emailVal=document.getElementById("cemail").value;
       var lastUser=users[users.length-1];
   
       var index=lastUser.id;
   
       let cobject={
           id:index+1,
           name: nameVal,
           username:usernameVal,
           email:emailVal
       }
       users.push(cobject);
       reset();
       
   }
   
   function updateUser(id){
       var nameVal=document.getElementById("cname").value;
       var usernameVal=document.getElementById("cuname").value;
       var emailVal=document.getElementById("cemail").value;
       users.map(obj=>{
           if(obj.id==id){
               obj.name=nameVal;
               obj.username=usernameVal;
               obj.email=emailVal;
           }
       })
       reset();
   }

   function showUsers(users) {
    let userTabel =
        `<tr>
          <th>User ID</th>
          <th>Name</th>
          <th>User Name </th>
          <th>Email</th>
          <th>Options</th>
         </tr>`;
   
    // Loop to access all rows
    for (let user of users) {
        userTabel += `<tr>
        <td>${user.id} </td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td> 
        <td>
        <button type="button" style="border:1px solid;" class="btn btn-light btn-sm" onclick="selectUser(${user.id})">
        <i class="bi bi-eye"></i> &nbsp; view
        </button>
        <button type="button" style="border:1px solid black;" class="btn btn-danger btn-sm" onclick="funUser(${user.id} , 'delete')">
        <i class="bi bi-trash"></i>
        </button>
        </td>
        `;
    }
    // Setting innerHTML as tab variable
    document.getElementById("user-lists").innerHTML = userTabel;
}

//select user by id and show user posts
function selectUser(id){
    displayUser(id);
    displayUserPosts(id);
}

// get one user details and return 
function getOneUser(id){
let manDetails=users.filter(man=>man.id==id);
return manDetails;
}

//display selected user details
function displayUser(id){
let manDetails=getOneUser(id);
let details=``;

for(let man of manDetails){
   details += `<p>
    <b>ID-</b> ${man.id} &nbsp; 
    <b>Name-</b> ${man.name} &nbsp;
    <b>Username-</b> ${man.username} &nbsp; 
    <b>Email-</b><i> <a href="">${man.email}</a></i> &nbsp;
    <p>`;
}

details +=`
<button type="button" class="btn btn-info"
onclick="funUser(${id} , 'update')" >
Click to change User Details &nbsp; 
<i class="bi bi-bar-chart-fill"></i>
</button>
`;

document.getElementById("user-details").innerHTML=details;
document.getElementById("form-div").innerHTML=``;
document.getElementById("selected-user").scrollIntoView();
}