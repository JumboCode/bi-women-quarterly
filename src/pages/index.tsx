import React, {useState} from 'react'; 
import Button from './components/Button'; 
import {WeatherPeriod} from '@/types/WeatherTypes'; 

export default function Home() {
    const [periods, setPeriods] = useState<WeatherPeriod[]>([]); 
    const [weather, setWeather] = useState([]); 
    const handleClick = () => {
    fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
      .then(response => response.json())
      .then(json => {
        // Problem 1: Print out the weather 
        console.log(json); 
        
        // Problem 1: Print out the weather for each period 
        const receivedPeriods = json.properties.periods; 
        setPeriods(receivedPeriods); 
        console.log(receivedPeriods); 

        // Problem 2: Loop through each period 
        const weather = receivedPeriods.map((periods: { number: any, temperature: any; shortForecast: any}) => {
          console.log("Temperature:", periods.temperature); 
          console.log("Weather:", periods.shortForecast); 
          return {
            number: periods.number, 
            temperature: periods.temperature,
            weather: periods.shortForecast,
          };
        }); 

        setWeather(weather); 
        console.log(weather); 
      }); 
    };

  return (
    <div>
        <h1>Weather Application</h1>
        <Button label = "Click me!" onClick={handleClick}/>
        { // Problem 3: Print weather data under the button 
          weather.map((data) => (
            <div key={data.number}>
            <p>Temperature: {data.temperature}</p>
            <p>Weather: {data.weather}</p>
            </div> 
          ))
        }
    </div>
)
}
