import { useEffect, useState } from 'react'
import './App.css'

// images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/sun.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/raining.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snowflake.png";
import humidityIcon from "./assets/humidity.png";
const WeatherDetails = ({icon,temp,city,country,lat,log ,humidity,wind}) =>{
  return(
  <>
  <div className="image">
    <img src={icon} alt="" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div className="lat">
    <span className='lat'>latitude</span>
    <span>{lat}</span>
    </div>
    <div className="log">
    <span className='log'>longitude</span>
    <span>{lat}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">

      <img src={humidityIcon} alt="humidity" />
      <div className="data">
        <div className="humidity-percent">{humidity} %</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">

      <img src={windIcon} alt="wind" />
      <div className="data">
        <div className="wind-percent">{wind} Km/h</div>
        <div className="text">wind Speed</div>
      </div>
    </div>
  </div>
  </>
  )
}


function App() {

  const[icon,seticon] = useState(rainIcon);
  const[temp,settemp] = useState(0);
  const[city,setcity] = useState("Chennai");
  const[country,setcountry] = useState("IN");
  const[log,setlog] = useState(0);
  const[lat,setlat] = useState(0);
  const[wind,setwind] = useState(0);
  const[humidity,sethumidity] = useState(0);  
  const[cityNotFound,setcityNotFound] = useState(false);
  const[loading,setLoading] = useState(false);


  const[text,settext] = useState("Chennai")
  
  const weatherIconMap = {
    "01d": clearIcon,
"01n": clearIcon,
"02d": cloudIcon,
"02n": cloudIcon,
"03d": drizzleIcon,
"03n": drizzleIcon,
"04d": drizzleIcon,
"04n": drizzleIcon,
"09d": rainIcon,
"09n": rainIcon,
"10d": rainIcon,
"10n": rainIcon,
"13d": snowIcon,
"13n": snowIcon,
  }

  const search = async ()=> {
    setLoading(true);

    let ApiKey = "84b48a3eb87ff4f708d9a3e06f9dab36";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${ApiKey}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if(data.cod === "404"){
        console.log("city not found");
        setcityNotFound(true);
        setLoading(false);
        return ;
      }

      sethumidity(data.main.humidity);
      setwind(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      seticon (weatherIconMap[weatherIconCode] || clearIcon);
      setcityNotFound(false);

    }
    catch(error){
      console.log ("An error occured",error.message);
  
    }finally{
      setLoading(false);
  
    }
  } 

  const handleCity = (e) =>{
    settext(e.target.value);
  }

  const handleKeyDown = (e) =>{
    if (e.key ==="Enter"){
      search();
    }
  }

  useEffect(function (){
    search();
  },[]);


  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type="text" className='cityInput' placeholder='Search City'onChange={handleCity}  value={text} onKeyDown={handleKeyDown}/>
        <div className='search-icon' onClick={() => search()}>
          <img src={searchIcon} alt="search"  />
        </div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />

    </div>
    </>
  )
}

export default App
