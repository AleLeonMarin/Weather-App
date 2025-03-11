document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "955667951a24f6f1b85dce2cb914a81c"; // API Key de OpenWeather
  const locationInput = document.querySelector(".loc");
  const addButton = document.querySelector(".add");
  const clearButton = document.querySelector(".clear");
  const container = document.getElementById("card-container");

  // 📌 Mapear los tipos de clima con tus imágenes personalizadas
  const weatherIcons = {
      "Clear": "sunny.png",        // Soleado
      "Clouds": "cloudy.png",      // Nublado
      "Rain": "rainy.png",         // Lluvia
      "Drizzle": "drizzle.png",    // Llovizna
      "Thunderstorm": "storm.png", // Tormenta
      "Snow": "snow.png",          // Nieve
      "Mist": "mist.png",          // Neblina
      "Fog": "foggy.png",          // Niebla
      "Haze": "haze.png",          // Bruma
      "Smoke": "smoke.png",        // Humo
      "Dust": "dust.png",          // Polvo
      "Sand": "sand.png",          // Arena
      "Ash": "ash.png",            // Ceniza volcánica
      "Squall": "windy.png",       // Ráfagas de viento
      "Tornado": "tornado.png"     // Tornado
  };

  // 📌 Función para obtener el clima de una ciudad
  async function fetchWeather(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

      try {
          console.log("🔗 URL generada:", apiUrl);
          const response = await fetch(apiUrl);
          const weatherData = await response.json();

          if (weatherData.cod !== 200) {
              throw new Error(weatherData.message || "Ubicación no encontrada.");
          }

          return weatherData;
      } catch (error) {
          console.error("❌ Error en la solicitud:", error);
          alert("❌ Error al obtener los datos del clima: " + error.message);
          return null;
      }
  }

  // 📌 Función para crear una tarjeta de clima
  function createWeatherCard(weatherData) {
      const cityName = weatherData.name;
      const weatherType = weatherData.weather[0].main; // Tipo de clima (ejemplo: "Clouds", "Rain")
      const temperature = `${weatherData.main.temp.toFixed(1)} °C`;
      const humidity = `Humedad: ${weatherData.main.humidity}%`;

      // Usa la imagen personalizada o una genérica si no se encuentra en el objeto
      const weatherIcon = weatherIcons[weatherType] || "default.png";

      // Crear tarjeta
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4 d-flex align-items-center justify-content-center";
      card.innerHTML = `
          <div class="card card-custom align-items-center justify-content-center">
              <h5 class="card-title card-title-custom">${cityName}</h5>
              <img src="media/images/${weatherIcon}" class="card-img-top card-img-top-custom" alt="Weather Icon"/>
              <div class="card-body card-body-custom text-center">
                  <p class="card-text card-text-custom">${weatherData.weather[0].description}</p>
                  <p class="card-text card-text-custom">${temperature}</p>
                  <p class="card-text card-text-custom">${humidity}</p>
              </div>
          </div>
      `;

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
  }

  // 📌 Evento para agregar una ciudad
  addButton.addEventListener("click", async function () {
      console.log("✅ Botón presionado");

      let city = locationInput.value.trim();
      if (!city) {
          console.log("❌ No se ingresó una ubicación.");
          alert("❌ Por favor, ingresa una ubicación válida.");
          return;
      }

      console.log("🌍 Ubicación ingresada:", city);
      const weatherData = await fetchWeather(city);

      if (weatherData) {
          createWeatherCard(weatherData);
          locationInput.value = ""; // Limpiar el input
      }
  });

  // 📌 Evento para limpiar todas las tarjetas
  clearButton.addEventListener("click", function () {
      const cards = document.querySelectorAll(".card-custom");
      cards.forEach((card, index) => {
          setTimeout(() => {
              card.classList.add("fadeOut");
              card.addEventListener("animationend", () => card.remove());
          }, index * 100);
      });
  });
});
