const toggleBtn = document.querySelector('.nav-toggle')
const links = document.querySelector('.links')
const orderBtn = document.getElementById('order-button')
const cart = document.querySelector('.cart')
const btnCloseCart = document.querySelector('.close-cart-btn')

toggleBtn.addEventListener('click', () => {
    links.classList.toggle('show-links')
})

orderBtn.addEventListener('click', () => {
	cart.classList.remove('hidecart')
	cart.classList.add('showcart')
})

btnCloseCart.addEventListener('click', () => {
	cart.classList.remove('showcart')
	cart.classList.add('hidecart')
	setTimeout(function(){ cart.classList.remove('hidecart'); }, 1000);
})



    