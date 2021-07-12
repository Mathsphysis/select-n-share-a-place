import axios from 'axios';


type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat:number, lng:number}}}[];
    status: 'OK' | 'ZERO_RESULTS',
}

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const key = process.env.API_KEY;

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${key}`)
    .then(response => {
        if (response.data.status !== 'OK'){
            throw new Error(response.data.status);
        }
        const coordinates = response.data.results[0].geometry.location;

        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 8
          });
        
          new google.maps.Marker({
            position: coordinates,
            map: map,
          });
        

    }).catch(e => console.log(e));
}

form.addEventListener('submit', searchAddressHandler);