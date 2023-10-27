import { useState } from "react";

type ButtonProps = { label: string }
export default function TellWeather({label}:ButtonProps) {
    const [weather, setWeather] = useState([]);

    const handleClick = () => {
        
        fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
            .then(response => response.json())
            //.then(data => console.log(data.properties.periods[0].detailedForecast))
            //const todayWeather = data.properties.periods[0]
            .then(data => {
                setWeather(data.properties.periods[0].detailedForecast)
            })
        //console.log("Clicked!")
    }

    return (
        <div>
            <button onClick={handleClick}>{label}</button>
            <p>{weather}</p>
        </div>
    )
}

// type ButtonProps = { label: string }
// const [weather, setWeather] = useState(0);

// const handleClick = () => {
    
//     fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
//         .then(response => response.json())
//         //.then(data => console.log(data.properties.periods[0]))
//         //const todayWeather = data.properties.periods[0]
//         .then(data => {
//             setWeather(data.properties.periods[0].detailedForecast)
//         })
//     //console.log("Clicked!")
// }

// //destructuring props
// const WeatherButton = ({label}:ButtonProps) => {
//     return (
//         <button onClick={handleClick}>{label}</button>
//     )
// }

// export default WeatherButton;