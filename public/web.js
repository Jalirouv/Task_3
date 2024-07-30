let BaseUrl = "http://localhost:7070/csdatabase.csdatabase/";
let cardsDiv = document.querySelector(".products-container");

async function GetDatas() {
    try {
        let response = await axios.get(BaseUrl);
        console.log(response.data);
        CreateCards(response.data);
        AddDeleteEventListeners();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    GetDatas();
});

function CreateCards(cards) {
    cardsDiv.innerHTML = ''; // Clear existing cards
    cards.forEach(element => {
        cardsDiv.innerHTML +=
        `
        <div class="card product-card">
            <button class="delete-btn">X</button>
            <div class="card-top">
                <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="" class="image">
            </div>
            <div class="card-bottom product-details">
                <h3>${element.name}</h3>
                <span>${element.description}</span>
                <button>View</button>
            </div>
        </div>
        `;
    });
}

function AddDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            let card = button.closest('.product-card');
            let id = card.dataset.id;

            try {
                await axios.delete(`${BaseUrl}${id}`);
                card.remove();
            } catch (error) {
                console.log(error);
            }
        });
    });
}
