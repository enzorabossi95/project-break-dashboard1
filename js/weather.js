const API_KEY = 'd2e4f611e7764a31897170834262004';

const CIUDADES = [
  {
    nombre: 'Copenhague',
    query: 'Copenhagen,Denmark',
    containerId: 'weather-copenhagen',
  },
  {
    nombre: 'Resistencia',
    query: 'Resistencia,Argentina',
    containerId: 'weather-resistencia',
  },
];

async function getWeather(ciudad) {

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ciudad.query}&aqi=no&lang=es&days=2`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.error(`Error cargando ${ciudad.nombre}:`, error);

    throw error;
  }
}

function renderPanel(data, ciudad) {

  const container = document.getElementById(ciudad.containerId);

  if (!container) return;


  const {
    current,
    location,
    forecast
  } = data;

  const {
    country
  } = location;

  const {
    temp_c,
    humidity,
    wind_kph,
    precip_mm,
    condition: {
      text,
      icon
    }
  } = current;


  const todasLasHoras = [
    ...forecast.forecastday[0].hour,
    ...forecast.forecastday[1].hour
  ];

  const ahora = new Date();

  const proximasHoras = todasLasHoras
    .filter((hora) => {

      const fechaHora = new Date(hora.time);

      return fechaHora >= ahora;

    })
    .slice(0, 6); 

  const forecastHTML = proximasHoras.map((hora) => {

    const {
      time,
      temp_c,
      condition: {
        text,
        icon
      }
    } = hora;

    const fecha = new Date(time);

    const horaFormateada = fecha.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const diaFormateado = fecha.toLocaleDateString('es-AR', {
      weekday: 'short'
    });

    return `
      <div class="weather-hour">

        <span class="hour-day">
          ${diaFormateado}
        </span>

        <span class="hour-time">
          ${horaFormateada}
        </span>

        <img 
          src="https:${icon}" 
          alt="${text}"
        >

        <span class="hour-temp">
          ${Math.round(temp_c)}°
        </span>

      </div>
    `;

  }).join('');

  container.innerHTML = `
  
    <div class="weather-header">

      <div>

        <p class="weather-city-name">
          ${ciudad.nombre}
        </p>

        <p class="weather-country">
          ${country}
        </p>

      </div>

      <div class="weather-main">

        <img 
          class="weather-icon-main"
          src="https:${icon}" 
          alt="${text}"
        >

        <span class="weather-temp">
          ${Math.round(temp_c)}°C
        </span>

      </div>

    </div>

    <p class="weather-condition">
      ${text}
    </p>

    <div class="weather-details">

      <div class="weather-detail">

        <span class="detail-label">
          Precipitación
        </span>

        <span class="detail-value">
          ${precip_mm} mm
        </span>

      </div>

      <div class="weather-detail">

        <span class="detail-label">
          Humedad
        </span>

        <span class="detail-value">
          ${humidity}%
        </span>

      </div>

      <div class="weather-detail">

        <span class="detail-label">
          Viento
        </span>

        <span class="detail-value">
          ${Math.round(wind_kph)} km/h
        </span>

      </div>

    </div>

    <div class="weather-forecast">
      ${forecastHTML}
    </div>

  `;
}

async function loadWeather() {

  for (const ciudad of CIUDADES) {

    const container = document.getElementById(ciudad.containerId);

    if (!container) continue;

    container.innerHTML = `
      <p class="weather-loading">
        Cargando...
      </p>
    `;

    try {

      const data = await getWeather(ciudad);

      renderPanel(data, ciudad);

    } catch (error) {

      container.innerHTML = `
        <p class="weather-error">
          No se pudo cargar ${ciudad.nombre}
        </p>
      `;
    }
  }
}

loadWeather();