
const imagesTR = [
    {
        'src': './Pictures/slider-image-1.jpg',
        'index': '1'
    },
    {
        'src': './Pictures/slider-image-2.jpg',
        'index': '2'
    },
    {
        'src': './Pictures/slider-image-3.jpg',
        'index': '3'
    },
    {
        'src': './Pictures/slider-image-4.jpg',
        'index': '4'
    },
    {
        'src': './Pictures/slider-image-5.jpg',
        'index': '5'
    },
    {
        'src': './Pictures/slider-image-6.jpg',
        'index': '6'
    },

]

const imagesBR = [
    {
        'src': './Pictures/slider-image-7.jpg',
        'index': '7'
    },
    {
        'src': './Pictures/slider-image-8.jpg',
        'index': '8'
    },
    {
        'src': './Pictures/slider-image-9.jpg',
        'index': '9'
    }
]


const topRow = document.querySelector('.top-row')
const botRow = document.querySelector('.bottom-row')
const btnBlue = document.querySelector('.btn-blue')
const btnGray = document.querySelector('.btn-gray')


const sliderUI = () => {
    imagesTR.forEach(img => {
    const image = document.createElement('img')
    image.src = img.src
    image.className = `img img-top-row`
    image.dataset.id = `${img.index}`
    topRow.appendChild(image)
})
imagesBR.forEach(img => {
    const image = document.createElement('img')
    image.src = img.src
    image.className = `img img-bot-row`
    image.dataset.id = `${img.index}`
    botRow.appendChild(image)
})
}
sliderUI()



btnBlue.addEventListener('click', () => {
    removeStyle(topRow, botRow)
    imagesTR.unshift(imagesTR.pop())
    imagesBR.unshift(imagesBR.pop())
    sliderUI()
    setTimeout(addStyle, 100)
}) 

btnGray.addEventListener('click', () => {
    removeStyle()
    imagesTR.push(imagesTR.shift())
    imagesBR.push(imagesBR.shift())
    sliderUI()
    setTimeout(addStyle, 100)
})

function removeStyle() {
    topRow.style.opacity = '0.5'
    botRow.style.opacity = '0.5'
    topRow.innerHTML = ''
    botRow.innerHTML = ''
}


function addStyle() {
    topRow.style.opacity = '1'
    botRow.style.opacity = '1'
}







 

   
