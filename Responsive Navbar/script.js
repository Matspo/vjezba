const toggleBtn = document.querySelector('.nav-toggle')
const links = document.querySelector('.links')
const orderBtn = document.getElementById('order-button')
const cart = document.querySelector('.cart')
const btnCloseCart = document.querySelector('.close-cart-btn')
const icons = document.querySelectorAll('.icon-btn')
const orderedList = document.querySelector('.ordered-list')
const arrIcons = Array.from(icons)
const totalPrice = document.querySelector('.total-input')





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
    setTimeout(function () {
        cart.classList.remove('hidecart');
    }, 500);
})


arrIcons.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        e.target.classList.toggle('icon-hover')
        e.target.classList.toggle('icon-btn')
        addElemToCart(e)
        incDecCounter(e)
        
    })
})

function incDecCounter(e) {
    
    let countZero = 0
    let countOne = 0
    let countTwo = 0
    let countThree = 0
    let counters = document.querySelectorAll('.ol-li-counter')
    let incBtns = document.querySelectorAll('.btn-inc')
    let decBtns = document.querySelectorAll('.btn-dec')

    
    incBtns[0].addEventListener('click', () => {
        countZero++
        counters[0].value = `${countZero}`
    })
    decBtns[0].addEventListener('click', () => {
        if (countZero < 1) {
            countZero = 1
        }
        countZero--
        counters[0].value = `${countZero}`
    })
   
    

    incBtns[1].addEventListener('click', () => {
        countOne++
        counters[1].value = `${countOne}`
    })

    decBtns[1].addEventListener('click', () => {
        if (countOne < 1) {
            countOne = 1
        }
        countOne--
        counters[1].value = `${countOne}`
    })



    incBtns[2].addEventListener('click', () => {
        countTwo++
        counters[2].value = `${countTwo}`
    })

    decBtns[2].addEventListener('click', () => {
        if (countTwo < 1) {
            countTwo = 1
        }
        countTwo--
        counters[2].value = `${countTwo}`
    })

    incBtns[3].addEventListener('click', () => {
        countThree++
        counters[3].value = `${countThree}`
    })
    decBtns[3].addEventListener('click', () => {
        if (countThree < 1) {
            countThree = 1
        }
        countThree--
        counters[3].value = `${countThree}`
    })

}
    

        
function addElemToCart(e) {
    let elem = ''
    let elemId = e.target.id
        if(e.target.classList.contains('icon-hover') && !e.target.classList.contains('icon-btn')) {
            elem = `<div class="ordered-list-first ol-li">
                              <p>${elemId} (kg)</p>
                              <div class="ol-li-div">
                              <button class="ol-li-btn btn-dec"><i class="fas fa-minus"></i></button>
                              <input class="ol-li-counter first-counter" value="0" readonly></input><button class="ol-li-btn btn-inc"><i
                              class="fas fa-plus"></i></button>
                              </div>
                              </div>`
                orderedList.insertAdjacentHTML('beforeend', elem)
        } else {
            orderedList.childNodes[1].remove()
        }

}





