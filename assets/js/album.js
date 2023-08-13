//crud  album
function funAlbum(id ,albumId , option){
    if(option=="delete"){
        var answer=window.confirm(`Are you sure you want to delete ? user : ${id} album :${albumId}`);
        if(answer){
            var index=albums.findIndex((obj)=>obj.id===albumId && obj.userId===id);
            albums.splice(index,1);
            reset();
            displayUser(id);
            displayUserAlbums(id);
        }  
     }
     if(option=="create"){
        // alert(`${id} is updated Succesfully...`);
        let form=`
          <div style="border:1px solid; padding: 10px; border-radius:10px;">
            <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input id="atitle" type="email" class="form-control" id="email" >
            </div>
            <button class="btn btn-success my-1" onclick="createAlbum(${id})"><i class="bi bi-arrow-counterclockwise"></i>
            &nbsp; Create Album</button>
          </div>
        `;
        document.getElementById("form-div").innerHTML=``;
        document.getElementById("form-crud").innerHTML=form;
        document.getElementById("form-crud").scrollIntoView();
     }
     if(option=="update"){
        let albumDetails=albums.filter(album=>album.id==albumId);
        let form=``;
        console.log("Test");
        console.log(albumDetails);
    
        // alert(`${id} is updated Succesfully...`);
      for(let album of albumDetails){ 
        form +=
        `
        <div style="border:1px solid; padding: 10px; border-radius:10px;">
          <div class="form-group">
              <label for="exampleInputPassword1">Title</label>
              <input id="atitle" type="text" class="form-control" value='${album.title}' >
          </div>
          <button class="btn btn-success my-1" onclick="updateAlbum(${id} ,${albumId})"><i class="bi bi-arrow-counterclockwise"></i>
          &nbsp; Update Album</button>
        </div>
      `}
      document.getElementById("form-div").innerHTML=``;
      document.getElementById("form-crud").innerHTML=form;
      document.getElementById("form-crud").scrollIntoView();
     }
}

function createAlbum(userId){
    let Albums=albums.filter(man=>man.userId==userId);
    let lastAlbum=Albums[Albums.length-1];
    let lastAlbumId=lastAlbum.id;
    let index=albums.findIndex(item=>item.id==lastAlbumId);

    let atitle= document.getElementById("atitle").value;
    let aobject={
        "userId": userId,
        "id": lastAlbumId+1,
        "title": atitle,
      };
    albums.splice(index+1,0,aobject);
    alert(userId+' , '+lastAlbumId + ' , '+index);
    reset();
    selectUser(userId);
    displayUserAlbums(userId);
}

function updateAlbum(id , albumId){
    var titleVal=document.getElementById("atitle").value;
    albums.map(obj=>{
        if(obj.id==albumId){
            obj.title=titleVal;
        }
    })
    reset();
    selectUser(id);
    displayUserAlbums(id); 
}
//display selected user albums
function displayUserAlbums(id){
    let singleUserAlbums=albums.filter(man=>man.userId==id);
    let card=`
    <nav class="navbar navbar-light bg-light" style="margin:10px 60px 10px 40px; padding:10px; border-radius:10px">
    <form class="form-inline">
      <button class="btn btn-sm btn-outline-secondary" " onclick="displayUserPosts(${id})" type="button">Posts</button>
      <button class="btn btn-outline-success onclick="displayUserAlbums(${id})" type="button">Albums</button>
    </form>
    </nav>
    <button style="margin:10px 40px 10px 40px;" type="button" class="btn btn-secondary btn-sm"
    onclick="funAlbum(${id},'', 'create')">
    + crate new album</button>
    <div id="form-crud" class="form-div"></div> 
    `;
    for(album of singleUserAlbums){
        card +=`
        <div class="card" style="width: auto; margin:10px 40px 40px 40px; ">
            <div class="card-body">
                <h5 class="card-title"><b>${album.title}</b> &nbsp; albumid :[${album.id}]</h5>
                <!--<a href="#" class="btn btn-secondary btn-sm">see more</a> --!>
                <button type="button" style="border:1px solid black;" class="btn btn-danger btn-sm" "
                onclick="funAlbum(${album.userId} ,${album.id}, 'delete')">
                    <i class="bi bi-trash"></i> album
                </button>
                <button type="button" style="border:1px solid black;" class="btn btn-info btn-sm" "
                onclick="funAlbum(${album.userId} ,${album.id}, 'update')">
                <i class="bi bi-pencil"></i> edit
                </button>
            </div>
            </div>
        `
    }
    document.getElementById("selected-user").innerHTML = card;
    // hideTable();
}
