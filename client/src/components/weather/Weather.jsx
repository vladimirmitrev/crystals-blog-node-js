
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';


const Weather = () => {
  const [weatherSofia, setWeatherSofia] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async (city, setState) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8dd1b8c6c70655b59ef4f75b4d9fb753`
        );

        const info = await response.json();
        setState(info);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData('Sofia', setWeatherSofia);

    const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
    }, []);

    const formatDateTime = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('en-UK', options);
    };

  return (
    <div>
      <div id="box-a" className='text-center'>
        {weatherSofia ? (
          <>
            <h5>Weather in Sofia now</h5>
            <img
              id="box-a-img"
              src={`/img/weather-icons/${weatherSofia.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p id="box-a-temp">{Math.round(weatherSofia.main.temp - 273.15)}°C</p>
            <p>{formatDateTime(currentDateTime)}</p> {/* Display the formatted date and time */}
            <Link to='https://www.accuweather.com/bg/bg/sofia/51097/weather-forecast/51097' target='_blank' className='text-primary'>Click Here For More Weather Details</Link>
          </>
        ) : (
            <>
            <Loading />
            <p>Weather...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
