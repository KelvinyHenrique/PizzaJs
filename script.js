let cart = [];
let modalQt = 1;
let modalKey = 0;

const selectOne = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);

//Olha

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
        modalKey = key;
        modalQt = 1;

        selectOne('.pizzaBig img').src = pizzaJson[key].img;
        selectOne('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectOne('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selectOne('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        selectOne('.pizzaInfo--size.selected').classList.remove('selected');
        selectAll('.pizzaInfo--size').forEach((size, sizeindex) => {
            if (sizeindex == 2) {
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
    setTimeout(() => {
        selectOne('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

selectAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

selectOne('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    selectOne('.pizzaInfo--qt').innerHTML = modalQt;
});

selectOne('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        selectOne('.pizzaInfo--qt').innerHTML = modalQt;
    } else {
        closeModal();
    }
});


selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        selectOne('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});


selectOne('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(selectOne('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});

selectOne('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0) {
        selectOne('aside').style.left = '0';
    }
});

selectOne('.menu-closer').addEventListener('click', ()=>{
    selectOne('aside').style.left = '100vw';
});

function updateCart() {

    selectOne('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        selectOne('aside').classList.add('show');
        selectOne('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;
            let cartItem = selectOne('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "P"
                    break;
                case 1:
                    pizzaSizeName = "M"
                    break;
                case 2:
                    pizzaSizeName = "G"
                    break;

                default:
                    break;
            }
            desconto = subtotal * 0.1;
            total = subtotal - desconto;

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            selectOne('.cart').append(cartItem);
        }

        selectOne('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selectOne('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        selectOne('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        selectOne('aside').classList.remove('show');
        selectOne('aside').style.left = '100vw';
    }

}