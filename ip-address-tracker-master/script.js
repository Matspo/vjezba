var mymap = L.map('mapid').setView([50.11552, 8.68417], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BvbWF0IiwiYSI6ImNrcm0wN2NoZTQybTcyd3A4Zndqd28xanMifQ.0V0ZBetF3n99P7XfSd9__w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});
var marker = L.marker([50.11552, 8.68417], {icon: myIcon}).addTo(mymap);


  



const searchBtn = document.getElementById('button-addon2')
const input = document.getElementById('input')
const ipAddressHeader = document.getElementById('ip_header')
const locationHeader = document.getElementById('location_header')
const timezoneHeader = document.getElementById('timezone_header')
const ispHeader = document.getElementById('isp_header')



  

searchBtn.addEventListener('click', () => {

  const loadData = async (input) => {
    try{
        const url = `https://geo.ipify.org/api/v1?apiKey=at_iEmwaoEaxKHwO1sPTB2yVODOUuQjI&domain=${input}`;
        const res = await fetch(url);
        if(res.ok){ 
          const data = await res.json();
          ipAddressHeader.innerText = `${data.ip}`
          locationHeader.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
          timezoneHeader.innerText = `UTC ${data.location.timezone}`
          ispHeader.innerText = `${data.isp}`
          buildMap(data.location.lat, data.location.lng)
        } else {
          console.log(res.status); // 404
        }
    } catch(err) {
      console.log(err)
    }
  };


  loadData(input.value) 

})   

function buildMap(lat,lon)  {
  document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
  osmLayer = new L.TileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BvbWF0IiwiYSI6ImNrcm0wN2NoZTQybTcyd3A4Zndqd28xanMifQ.0V0ZBetF3n99P7XfSd9__w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
});
  var map = new L.Map('map');
  map.setView(new L.LatLng(lat,lon), 9 );
  map.addLayer(osmLayer);
  var newMarker = new L.marker([lat, lon], {icon: myIcon}).addTo(map);
}  



