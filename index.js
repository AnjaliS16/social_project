function handleFormSubmit(event) {
    event.preventDefault();
    const exp = event.target.exp.value;
    const des = event.target.des.value;
   

    const obj = {
        exp: exp,
        des: des,
        
    }

    //post detail on crud
    
      axios.post("http://localhost:3600/add-details", obj)
     .then((response)=>{
     console.log('posted data')
           // const data = await response.data.newuser;
            showUserOnScreen(response.data.newuser)
           // console.log()
            
            console.log(response)
          
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Oops! something went wrong</h4>"
            console.log(err)
        })
    
   // document.getElementById('exp').value = '';
   // document.getElementById('des').value = '';
  

}

//retrieve from crud
window.addEventListener("DOMContentLoaded", async() => {
    try{
   const response= await axios.get("http://localhost:3600/get-details")
   console.log('got our data')
        
            console.log(response)

            for (var i = 0; i < response.data.alluser.length; i++) {
                showUserOnScreen(response.data.alluser[i])
            }
        }
        catch(err)  {
            console.log(err)
        }
})

//print detail on screen
function showUserOnScreen(obj) {

    const parentNode = document.getElementById('listofitems');
    //const imageUrl=obj.exp;
    console.log('Image URL:', obj.exp);
   const childnode= `<li id=${obj.id}> 
                     <img src="${obj.exp}" alt="Expense Image" style="max-width: 100px; max-height: 100px;"> 
                     ${obj.des}
                     <button style="color:red" onclick="commentUser('${obj.id}')">comment</button>
                    
                 </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childnode
}




//delete from crud
async function commentUser(id) {
    
    const commentInput = prompt(`Add a comment for item with ID ${id}:`);

    if (commentInput !== null) {
        try {
            // Send an asynchronous request to the server to update the comment
            const res = await axios.put(`http://localhost:3600/update-comment/${id}`, {
                comment: commentInput
            });

            // Display the comment on the screen
            const commentElement = document.createElement('div');
            commentElement.textContent = `Comment: ${commentInput}`;
            
            // Append the comment element to the list item
            const listItem = document.getElementById(`${id}`);
            listItem.appendChild(commentElement);

            console.log('Updated successfully');
        } catch (err) {
            console.log(err);
            console.log('Unable to update comment on the server');
        }
    }
}


