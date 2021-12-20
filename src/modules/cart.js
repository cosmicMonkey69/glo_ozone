import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
    const cartBtn = document.getElementById('cart'),
    cartModal = document.querySelector('.cart'),
    cartCloseBtn = cartModal.querySelector('.cart-close'),
    goodsWrapper = document.querySelector('.goods'),
    cartTotal = cartModal.querySelector('.cart-total > span'),
    cartWrapper = cartModal.querySelector('.cart-wrapper'),
    cartSendBtn = cartModal.querySelector('.cart-confirm'),
    counterProducts = document.querySelector('header .counter')

const openCard = () => {
    const cart = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []
    
    renderCart(cart)
    
    cartModal.style.display = 'flex';
    cartTotal.textContent = cart.reduce((sum, item)=>{
        return sum + item.price
    }, 0)
}

const closeCart = () => {
    cartModal.style.display = '';
}

cartBtn.addEventListener('click', openCard);
cartCloseBtn.addEventListener('click', closeCart);

goodsWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-primary')) {
        const card = e.target.closest('.card')
        const key = card.dataset.key
        const goods = JSON.parse(localStorage.getItem('goods')) 
        const cart = localStorage.getItem('cart') ? 
                JSON.parse(localStorage.getItem('cart')) : []
        
        const goodItem = goods.find((item)=>{
            return item.id == +key;
        })

        cart.push(goodItem)
        counterProducts.textContent = cart.length
        localStorage.setItem('cart', JSON.stringify(cart))
    }        
})

cartWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn-primary')) {
        const cart = localStorage.getItem('cart') ? 
                JSON.parse(localStorage.getItem('cart')) : []
        
        const card = e.target.closest('.card')
        const key = card.dataset.key

        for(let obj of cart) {
            if(obj.id == key) {
                cart.splice(obj, 1)
                break;
            }
        }

        counterProducts.textContent = cart.length
        localStorage.setItem('cart', JSON.stringify(cart))

        renderCart(cart)
        
        cartTotal.textContent = cart.reduce((sum, item)=>{
            return sum + item.price
        }, 0)
    }
})

cartSendBtn.addEventListener('click', () => {
    const cart = localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : []

    postData(cart).then(()=>{
        localStorage.removeItem('cart')
        renderCart([])
        cartTotal.textContent = '0'
    })
})
}

export default cart;