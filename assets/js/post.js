//crud post
function funPost(id ,postId , option){
    if(option=="delete"){
        var answer=window.confirm(`Are you sure you want to delete ? user : ${id} post :${postId}`);
        if(answer){
            var index=posts.findIndex((obj)=>obj.id===postId && obj.userId===id);
            posts.splice(index,1);
            reset();
            displayUserPosts(id);
            displayUser(id);
        }  
     }
     if(option=="create"){
        // alert(`${id} is updated Succesfully...`);
        let form=`
          <div style="border:1px solid; padding: 10px; border-radius:10px;">
            <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input id="ptitle" type="text" class="form-control"  >
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Body</label>
                <input id="pbody" type="email" class="form-control" >
            </div>
            <button class="btn btn-success my-1" onclick="createPost(${id})"><i class="bi bi-arrow-counterclockwise"></i>
            &nbsp; Create Post</button>
          </div>
        `;
        document.getElementById("form-div").innerHTML=``;
        document.getElementById("form-crud").innerHTML=form;
        document.getElementById("form-crud").scrollIntoView();
     }
    
     if(option=="update"){
        let postDetails=posts.filter(post=>post.id==postId);
        let form=``;
        console.log("Test");
        console.log(postDetails);
    
        // alert(`${id} is updated Succesfully...`);
      for(let post of postDetails){ 
        form +=
        `
        <div style="border:1px solid; padding: 10px; border-radius:10px;">
          <div class="form-group">
              <label for="exampleInputPassword1">Title</label>
              <input id="ptitle" type="text" class="form-control" value='${post.title}' >
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Body</label>
              <textarea class="form-control" name="message" id="pbody" rows="5" style="width:100%;" >${post.body}</textarea>
          </div>
          <button class="btn btn-success my-1" onclick="updatePost(${id} ,${postId})"><i class="bi bi-arrow-counterclockwise"></i>
          &nbsp; Update Post</button>
        </div>
      `}
      document.getElementById("form-div").innerHTML=``;
      document.getElementById("form-crud").innerHTML=form;
      document.getElementById("form-crud").scrollIntoView();
     }
}

function createPost(userId){
    let Posts=posts.filter(man=>man.userId==userId);
    let lastPost=Posts[Posts.length-1];
    let lastPostId=lastPost.id;
    let index=posts.findIndex(item=>item.id==lastPostId);

    let ptitle= document.getElementById("ptitle").value;
    let pbody= document.getElementById("pbody").value;
    let pobject={
        "userId": userId,
        "id": lastPostId+1,
        "title": ptitle,
        "body": pbody
      };
    posts.splice(index+1,0,pobject);
    alert(userId+' , '+lastPostId + ' , '+index);
    reset();
    selectUser(userId);
}

function updatePost(userId , postId){
    var titleVal=document.getElementById("ptitle").value;
    var bodyVal=document.getElementById("pbody").value;
    posts.map(obj=>{
        if(obj.id==postId){
            obj.title=titleVal;
            obj.body=bodyVal;
        }
    })
    reset();
    selectUser();
}

function displayUserPosts(id){
    let singleUserPosts=posts.filter(man=>man.userId==id);
    let card=`
    <nav class="navbar navbar-light bg-light" style="margin:10px 60px 10px 40px; padding:10px; border-radius:10px">
    <form class="form-inline">
      <button class="btn btn-outline-success" onclick="displayUserPosts(${id})" type="button">Posts</button>
      <button class="btn btn-sm btn-outline-secondary" onclick="displayUserAlbums(${id})" type="button">Albums</button>
    </form>
    </nav>
    <button style="margin:10px 40px 10px 40px;" type="button" 
    onclick="funPost(${id},'', 'create')" class="btn btn-secondary btn-sm">
    + crate new post</button>
    
    <div id="form-crud" class="form-div"></div>
    `;
    for(post of singleUserPosts){
        card +=`
        <div class="card" style="width: auto; margin:10px 40px 40px 40px; ">
            <div class="card-body">
                <h5 class="card-title"><b>${post.title}</b> &nbsp; postid :[${post.id}]</h5>
                <p class="card-text">${post.body}</p>
                <!--<a href="#" class="btn btn-secondary btn-sm">see more</a> --!>
                <button type="button" style="border:1px solid black;" class="btn btn-danger btn-sm" "
                onclick="funPost(${post.userId} ,${post.id}, 'delete')">
                    <i class="bi bi-trash"></i> post
                </button>
                <button type="button" style="border:1px solid black;" class="btn btn-info btn-sm" "
                onclick="funPost(${post.userId} ,${post.id}, 'update')">
                <i class="bi bi-pencil"></i> edit
                </button>
            </div>
            </div>
        `
    }
    document.getElementById("selected-user").innerHTML = card;
}