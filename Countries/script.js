const img = document.querySelector('.card-img-top')
const input = document.getElementById('input')
let cardsArray = []
const row = document.querySelector('.cards-div')
const wrapper = document.querySelector('.wrapper')
const backBtn = document.getElementById('back-btn')
const cardInfo = document.getElementById('cardInfo')


cardInfo.style.display = 'none'

var mymap = L.map('mapid').setView([51.505, -0.09], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BvbWF0IiwiYSI6ImNrcm0wN2NoZTQybTcyd3A4Zndqd28xanMifQ.0V0ZBetF3n99P7XfSd9__w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);


const loadData = async () => {
    try {
        const url = 'https://restcountries.eu/rest/v2/all';
        const res = await fetch(url);
        if (res.ok) {
            data = await res.json();
            clickCard(data)
        } else {
            console.log(res.status); // 404
        }
    } catch (err) {
        console.log(err)
    }
};

loadData()




function createCards(data) {
    data.forEach(item => {
        const col = document.createElement('div')
        col.className = 'col-md-3 card px-0 border-0 shadow-lg mb-5 mx-5'
        col.id = lowercaseFirstLetter(item.name)
        col.setAttribute('data-region', `${item.region}`);
        col.style.width = '13.5rem'
        col.innerHTML = `
    <img src="${item.flag}" class="card-img-top p-0 m-0" alt="Flag">
    <div class="card-body py-3d d-flex align-items-center">
      <h4 class="card-title fw-bold">${item.name}</h4>
    </div>
    <ul class="list-group list-group-flush pb-3">
      <li class="list-group-item border-0"><span class="fw-bold">Population:</span> ${numberWithCommas(item.population)}</li>
      <li class="list-group-item border-0"><span class="fw-bold">Region:</span> ${item.region}</li>
      <li class="list-group-item"><span class="fw-bold">Capital:</span> ${item.capital}</li>
    </ul>
    `
        row.appendChild(col)
    });

    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        cardsArray.push(card)
    })
}

input.addEventListener('input', (e) => {
    const searchInput = e.target.value
    cardsArray.forEach(card => {
        if (card.id.includes(`${searchInput}`)) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    })
})

const listItems = document.querySelectorAll('.dropdown-item')
listItems.forEach(item => {
    item.addEventListener('click', () => {
        cardsArray.forEach(card => {
            if (card.dataset.region === item.innerText) {
                card.style.display = 'block'
            } else {
                card.style.display = 'none'
            }
        })
    })
})

// wrapper.style.display = 'none'
let infoDiv = ''
let btnsArr = []
function clickCard(data) {
    createCards(data)
    cardsArray.forEach(card => {
        card.addEventListener('click', (e) => {
            wrapper.style.display = 'none'
            const foundCard = data.find(item => item.name === uppercaseFirstLetter(card.id))
            console.log(foundCard)
            createInfo(foundCard)

        })
    })


}


function createInfo(foundCard) {
    cardInfo.style.display = 'block'
    buildMap(`${foundCard.latlng[0]}`, `${foundCard.latlng[1]}`)
    const container = document.getElementById('country-container')
    const div = document.createElement('div')
    div.className = 'col-md-6 py-5 ps-5 info-div'
    div.innerHTML = `
            <h1 class="fw-bold mb-5">${foundCard.name}</h1>
                <div class="country-info d-flex justify-content-start">
                    <div class="leftside-info">
                        <ul class="list-group">
                            <li class="list-group-item lg-item"><span class="fw-bold">Native name: </span>${foundCard.nativeName}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Population: </span>${numberWithCommas(foundCard.population)}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Region: </span>${foundCard.region}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Sub region: </span>${foundCard.subregion}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Capital: </span>${foundCard.capital}</li>
                          </ul>
                    </div>
                    <div class="rightside-info ms-5">
                        <ul class="list-group">
                            <li class="list-group-item lg-item"><span class="fw-bold">Top Level Domain: </span>${foundCard.topLevelDomain[0]}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Currencies: </span>${foundCard.currencies[0].name}</li>
                            <li class="list-group-item lg-item"><span class="fw-bold">Languages: </span>${foundCard.languages[0].name}</li>
                          </ul>
                    </div>
                </div>
                <div class="border-countries d-flex justify-content-start align-items-center pt-5">
                    <div class="border-countries-bold">
                        <li class="list-group-item fw-bold px-0 border-0">Border Countries: </li>
                    </div>
                    <div class="border-countries-btns ms-5">
                        <div class="btn-group d-flex flex-wrap justify-content-between" role="group" aria-label="Basic outlined example">
                          </div>
                    </div>
                </div>
            `
    container.appendChild(div)
    const btngroup = document.querySelector('.btn-group')
    const borderCountries = foundCard.borders
    borderCountries.forEach(country => {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.className = 'btn btn-outline-secondary border-btn rounded-1 me-2 my-2'
        button.innerText = `${country}`
        btngroup.appendChild(button)
    })

    infoDiv = document.querySelector('.info-div')
    let btns = document.querySelectorAll('.border-btn')
    btns.forEach(btn => {
        btnsArr.push(btn)
    })
    btnsArr.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.innerText
            const found = data.find(item => item.alpha3Code === index)
            infoDiv.remove()
            createInfo(found)
        })
    })
}

backBtn.addEventListener('click', () => {
    wrapper.style.display = 'block'
    infoDiv.remove()
})




function buildMap(lat, lon) {
    console.log(lat, lon)
    document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    osmLayer = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BvbWF0IiwiYSI6ImNrcm0wN2NoZTQybTcyd3A4Zndqd28xanMifQ.0V0ZBetF3n99P7XfSd9__w', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    })
    var map = new L.map('map')
    map.setView(new L.LatLng(lat, lon), 6);
    map.addLayer(osmLayer);
    var marker = new L.marker([lat, lon]).addTo(map);
}


function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    /*  The regex uses 2 lookahead assertions:
        - a positive one to look for any point in the string that has a multiple of 3 digits in a row after it,
        - a negative assertion to make sure that point only has exactly a multiple of 3 digits. The replacement expression puts a comma there. */
}






