window.addEventListener('load', function () {
  setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
  }, 400); 
});

document.getElementById("search").addEventListener('click', getWeather);

setInterval(displayDateAndTime, 0);

function displayDateAndTime() {
  const date = new Date();
  document.getElementById("date-time").innerHTML = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, second: 'numeric' }) + "<br>" + date.toLocaleDateString();
}

document.getElementById("errormsg").style.display = 'none';

//console.log("I AM HERE");

async function getWeather() {
  event.preventDefault();

  let apiKey = "3ba0e5eedae49070b51c85ad8c30def0";
  let city = document.getElementById("city").value;

  let letters = /^[A-Za-z]+$/;
  if (!city.match(letters)) {
    alert("Only Alphabet Allowed");
    return false;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    //console.log(data);

    // const weather = data.weather[0].main;
    const weatherDescription = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;
    const temp = data.main.temp;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const visibility = data.visibility / 1000;
    const country = data.sys.country;

    document.getElementById("errormsg").style.display = 'none';

    document.getElementById("temp").innerText = temp;
    const condition=document.getElementById("condition");
    condition.style.textTransform='capitalize';
    condition.innerText = weatherDescription;

    document.getElementById("location").innerText = `${cityName}, ${country}`;
    document.getElementById("icon").setAttribute('src', `https://openweathermap.org/img/wn/${icon}@4x.png`);
    document.getElementById("icon-1").setAttribute('src', `https://openweathermap.org/img/wn/${icon}@4x.png`);

    document.getElementById("min-temp").innerText = temp_min;
    document.getElementById("min-temp-text").innerText = temp_min < 10 ? "Low" : temp_min < 40 ? "Normal" : "High";

    document.getElementById("max-temp").innerText = temp_max;
    document.getElementById("max-temp-text").innerText = temp_max < 10 ? "Low" : temp_max < 40 ? "Normal" : "High";

    document.getElementById("humidity").innerText = humidity + "%";
    document.getElementById("humidity-status").innerText = humidity < 10 ? "Low" : humidity < 40 ? "Moderate" : "High";

    document.getElementById("Visibility").innerHTML = `${visibility} km`;
    document.getElementById("Visibility-status").innerText = visibility < 1 ? "Not Clear At All" : visibility < 5 ? "Clear Visibility" : "Crystal Clear";

    document.getElementById("Pressure").innerText = pressure;
    document.getElementById("windspeed").innerText = windSpeed;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("errormsg").style.display = 'inline-block';
  }
}
