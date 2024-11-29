console.log("hello"); // Prints "hello" to the console

const http = require('http');
const port = 3000; // Port number for the server

const server = http.createServer((req, res) => {
  // Handle incoming requests (implement logic as needed)
  res.statusCode = 200; // Set response status code (e.g., 200 for success)
  res.setHeader('Content-Type', 'text/plain'); // Set response content type
  res.end('Hello from the server!'); // Send a response message
});

server.listen(port, (error) => {
  if (error) {
    console.error('Something went wrong:', error);
  } else {
    console.log('Server is listening on port', port);
  }
});

// Remove the duplicated `const weather` declaration

// Client-side code (assuming this is intended for a browser environment)

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const layers = document.querySelectorAll('.parallax-layer');

  layers.forEach(function(layer) {
    const speed = layer.dataset.speed || 1;
    layer.style.transform = 'translateZ(-1px) translateY(' + scrollY / speed + 'px)';
  });
});

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        if (links.getAttribute('href').includes(id)) {
          links.classList.add('active');
        }
      });
    }
  });
};

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


function getWeather() {
    const apiKey = '1b1ab5a1027e2b9f68a61bad4dc7702b'; // Replace with your actual API key
    const city = document.getElementById('city').value;
  
    if (!city) {
      alert('Please enter a city');
      return;   
  
    }
  
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{city\}&appid\=</span>{apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=<span class="math-inline">\{city\}&appid\=</span>{apiKey}`;   
    
  
  
    fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
      });
  
    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        displayHourlyForecast(data.list);
      })
      .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');   
  
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
  
    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
  
    if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);   
   // Convert to Celsius
      const description = data.weather[0].description;   
  
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
      const temperatureHTML = `
        <p>${temperature}°C</p>
      `;
  
      const weatherHtml = `
        <p><span class="math-inline">\{cityName\}</p\>
  <p\></span>{description}</p>
      `;
  
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;   
  
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;   
  
  
      // Set display style after setting image source
      weatherIcon.style.display = 'block';
    }
  }
  
  

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
      
        const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)
      
        next24Hours.forEach(item => {
          const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
          const hour = dateTime.getHours();
          const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      
          const hourlyItemHtml = `
            <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
            </div>
          `;
      
          hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
      }
      fetch(forecastUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching hourly forecast data: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    displayHourlyForecast(data.list);
  })
  .catch(error => {
    console.error('Error fetching hourly forecast data:', error);
    alert('Error fetching hourly forecast data. Please try again.');
  });
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");
  
  let currentNumber = ""; // Stores the current number being entered
  let previousNumber = ""; // Stores the previous number for calculations
  let operator = ""; // Stores the currently selected operator
  
  function calculate(operator, num1, num2) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) {
          return "Division by zero!"; // Handle division by zero
        }
        return num1 / num2;
      default:
        return "Invalid operator";
    }
  }
  
  function updateDisplay(value) {
    display.innerText = value;
  }
  
  buttons.forEach((item) => {
    item.onclick = () => {
      if (item.id === "clear") {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        updateDisplay("");
      } else if (item.id === "backspace") {
        currentNumber = currentNumber.slice(0, -1);
        updateDisplay(currentNumber);
      } else if (item.classList.contains("btn-number")) {
        currentNumber += item.id;
        updateDisplay(currentNumber);
      } else if (item.classList.contains("btn-operator")) {
        if (currentNumber !== "") { // Check if a number is entered before operator
          previousNumber = parseFloat(currentNumber);
          currentNumber = "";
          operator = item.id;
        }
      } else if (item.id === "equal") {
        if (currentNumber !== "" && operator !== "") {
          const result = calculate(operator, previousNumber, parseFloat(currentNumber));
          updateDisplay(result);
          currentNumber = result; // Update current number for further calculations
        } else {
          updateDisplay("Enter a number and operator"); // Handle empty input with equal
        }
      }
    };
  });
  
  // Theme toggle functionality (unchanged)
  
  // ... rest of your code



  const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);