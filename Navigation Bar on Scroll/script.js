const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')
const navLinks = document.querySelectorAll('.nav-link')
const topBtn = document.querySelector('.top-button')

hamburger.addEventListener('click', mobileMenu)

function mobileMenu() {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
}

navLinks.forEach(n => n.addEventListener('click', closeMenu))

function closeMenu() {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
}


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        const id = e.currentTarget.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        let position = element.offsetTop
        window.scrollTo({
            left:0, top: position - 60,
        })
    })
})

topBtn.addEventListener('click', () => {
    window.scrollTo({
        left:0, top:0,
    })
})