import { useState } from 'react';

export default function WeatherButton({ label }: any) {
    const [temperature, setTemperature] = useState("");
    const [forecast, setForecast] = useState("");

    async function getWeather() {
        try {
            let temp = await (fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
                .then(response => response.json())
                .then(json => json.properties.periods[0].temperature));
            setTemperature(temp);
            let fore = await (fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
                .then(response => response.json())
                .then(json => json.properties.periods[0].shortForecast));
            setForecast(fore);
        } catch (error) {
            console.log(error);
        }
    }

    if (temperature === "" || forecast === "") {
        // No info yet.
        return (
            <button onClick={getWeather}>{label}</button>
        )
    }


    // Put the info into text
    return (
        <div>
            <button onClick={getWeather}>{label}</button>
            <h3>Today's weather:</h3>
            <p>It is {temperature} degrees, {forecast.toLowerCase()} in Medford.</p>
        </div>
    );
}