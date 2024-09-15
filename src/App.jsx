import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudsIcon from './assets/clouds.png';
import drizzleIcon from './assets/drizzle.png';
import cloudIcon from './assets/cloud.png';
import mistIcon from './assets/mist.png';
import snowIcon from './assets/snow.png';
import windIcon from './assets/wind.png';
import rainIcon from './assets/rain.png';


// ...rest of your code

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (
    <div className="weather-details">
      <div className="image">
        <img src={icon} alt="weather-icon" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={cloudIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <div className="para">
    <p>Reserved by Dinesh © 2024</p>
</div>

    </div>
  );
};

function App() {
  const [city, setCity] = useState('Chennai');
  const [weatherData, setWeatherData] = useState({
    icon: clearIcon,
    temp: 0,
    city: 'CHENNAI',
    country: 'IN',
    lat: 0,
    lon: 0,
    humidity: 0,
    wind: 0,
  });

  const fetchWeatherData = async (cityName) => {
    const api_key = 'e25eb4159b61e96843e68daadc304540';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        icon: determineIcon(data.weather[0].description),
        temp: Math.round(data.main.temp),
        city: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const determineIcon = (description) => {
    description = description.toLowerCase();

    if (description.includes('clear')) return clearIcon;
    if (description.includes('clouds')) return cloudsIcon;
    if (description.includes('drizzle')) return drizzleIcon;
    if (description.includes('rain')) return rainIcon;
    if (description.includes('thunderstorm')) return thunderstormIcon;
    if (description.includes('snow')) return snowIcon;
    if (description.includes('mist') || description.includes('fog')) return mistIcon;
    if (description.includes('wind')) return windIcon;
    // Add more conditions if needed

    return clearIcon; // Default icon if no match found
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          value={city}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={SearchIcon} alt="Search" />
        </div>
      </div>
      <WeatherDetails {...weatherData} />
    </div>
  );
}

export default App;
