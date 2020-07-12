let cart = [];
let modalQt = 1;

const selectOne = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);


//Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = selectOne('.models .pizza-item').cloneNode(true);
    //Preencher as informações em pizza item
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;

        selectOne('.pizzaBig img').src = pizzaJson[key].img;
        selectOne('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectOne('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;  
        selectOne('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`; 
        selectOne('.pizzaInfo--size.selected').classList.remove('selected');
        selectAll('.pizzaInfo--size').forEach((size, sizeindex) =>{
            if(sizeindex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeindex];
        });

        selectOne('.pizzaInfo--qt').innerHTML = modalQt;
        selectOne('.pizzaWindowArea').style.opacity = 0;
        selectOne('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            selectOne('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    selectOne('.pizza-area').append(pizzaItem);
});

//Eventos do Modal

function closeModal() {
    selectOne('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        selectOne('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

selectAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

selectOne('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    selectOne('.pizzaInfo--qt').innerHTML = modalQt;
});

selectOne('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt>1){
         modalQt--;
         selectOne('.pizzaInfo--qt').innerHTML = modalQt;
    } else {
        closeModal();
    }
});


selectAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        selectOne('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});


selectOne('.pizzaInfo--addButton').addEventListener('click', ()=>{

});