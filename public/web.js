let BaseUrl="http://localhost:5500/Task_3"
let cardsDiv = document.querySelector(".products-container")
let addForm=document.querySelector(".add-form")
let nameInp=document.querySelector(".nameInp")
let descInp=document.querySelector(".descInp")

async function GetDatas() {
    let datas = await axios.get(BaseUrl)
    try {
        CreateCards(datas.data)
    } catch (error) {
        console.log(error);
    }
}


function CreateCards(cards) {
    cardsDiv.innerHTML=""
    cards.forEach(element => {
        cardsDiv.innerHTML+=
        `
        <div class="cardd">
          <div class="card-top">
             <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="" class="image">
           </div>
           <div class="card-bottom">
            <h3>${element.name}</h3>
            <div>${element.description}</div>
          <button class="del-btn" btn-id=${element._id}>Delete</button>
      </div>
  </div>
     `
     let delBtns = document.querySelectorAll(".del-btn")
     delBtns.forEach(btn => {
        btn.addEventListener("click", async function(){
            let id = btn.getAttribute("btn-id")
           await axios.delete(`${BaseUrl}/${id}`)
           GetDatas()
        })
    });

    }); 
}

addForm.addEventListener("submit",async function(event){
    event.preventDefault()
    let newPro = {
        name: nameInp.value,
        description: descInp.value
    } 
    await axios.post(`${BaseUrl}`, newPro)
     nameInp.value=""
    descInp.value=""
    GetDatas()
})


GetDatas()