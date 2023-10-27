import { useState } from "react";

type ButtonProps = { label: string }
export default function TellWeather({label}:ButtonProps) {
    const [weather, setWeather] = useState([]);

    const handleClick = () => {
        
        fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
            .then(response => response.json())
            //.then(data => console.log(data.properties.periods[0].detailedForecast))
            .then(data => {
                setWeather(data.properties.periods[0].detailedForecast)
            })
    }

    return (
        <div>
            <button onClick={handleClick}>{label}</button>
            <p>{weather}</p>
        </div>
    )
}