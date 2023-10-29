import { useState } from "react";

export default function MyButton(props: any) {
        const [weatherInfo, setWeatherInfo] = useState("");
        const fetchWeather = () =>
                fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
                        .then(response => response.json())
                        .then(data => data.properties.periods[0].detailedForecast)
                        .then(data => setWeatherInfo(data));

        return (
                <div>
                        <button onClick={fetchWeather}>{props.title}</button>
                        <p>{weatherInfo}</p>
                </div>
        );
}
