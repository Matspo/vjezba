const questions = document.querySelectorAll('.question')
const hiddens = document.querySelectorAll('.hidden')
const icons = document.querySelectorAll('.fa-plus-square')
let arr = Array.from(questions)

arr.forEach(item => {
    item.addEventListener('click', (e) => {
        idx = arr.indexOf(item)
        hiddens[idx].classList.toggle('hidden')
        hiddens[idx].classList.toggle('active')
        icons[idx].classList.toggle('fa-plus-square')
        icons[idx].classList.toggle('fa-minus-square')
    })
})