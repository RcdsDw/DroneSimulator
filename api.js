// API Open Meteo

export async function SearchCity(city) {
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    if (response.ok) {
       return await response.json()
    } else {
        return false;
    }
}
