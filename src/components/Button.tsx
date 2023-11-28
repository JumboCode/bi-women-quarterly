import { useState } from "react";

export default function Button(props:any) {
    const [events, setEvents] = useState({ 
        "number": null,
        "name": "",
        "startTime": "",
        "endTime": "",
        "isDaytime": false,
        "temperature": null,
        "temperatureUnit": "",
        "temperatureTrend": null,
        probabilityOfPrecipitation: Object,
        dewpoint: Object,
        relativeHumidity: Object,
        "windSpeed": "",
        "windDirection": "",
        "icon": "",
        "shortForecast": "",
        "detailedForecast": "",
     });
    let j = "";
    const handleClick = () => {
        fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
            .then((res) => res.json())
            .then((json) => {
                setEvents(json.properties.periods[0]);
            });
    };
    return (
        <div>
            <button onClick={handleClick}>{props.label}</button>
                <div>
                    <p>{events.temperature}</p>
                    <p>{events.shortForecast}</p>
                </div>
        </div>
        
    )
}





// export default function App() {
//   const ref = useRef(null!);
//   const handleClick = () => console.log("CLICKED", ref.current);
//   return (
//     <div className="App">
//       <h1 className="title override">Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <Button onClick={handleClick} ref={ref}>
//         Test
//       </Button>
//     </div>
//   );
// }
