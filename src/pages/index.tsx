import Button from "@/components/Button"
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const handleClick = () => {
    fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.properties.periods.map((datum: any) => {
          console.log(datum.temperature + "°" + datum.temperatureUnit)
          console.log(datum.shortForecast);
        });
        setData(data.properties.periods);
      });
  };

  return (
    <div>
        <Button label="Fetch Data" onClick={handleClick}/>
        { data.map((datum: any) => (
          <div key={datum.number}>
            <p>{datum.temperature}°{datum.temperatureUnit}</p>
            <p>{datum.shortForecast}</p>
          </div>
        ))}
    </div>
  )
}
