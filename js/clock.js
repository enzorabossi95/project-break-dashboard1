function getPhrase(hour) {
  if (hour >= 0  && hour < 7)  return 'Es hora de descansar. Apaga y sigue mañana.';
  if (hour >= 7  && hour < 12) return 'Buenos días, desayuna fuerte y a darle al código.';
  if (hour >= 12 && hour < 14) return 'Echa un rato más pero no olvides comer.';
  if (hour >= 14 && hour < 16) return 'Espero que hayas comido bien hoy.';
  if (hour >= 16 && hour < 18) return 'Buenas tardes, el último empujón del día.';
  if (hour >= 18 && hour < 22) return 'Esto ya son horas extras… piensa en parar pronto.';
  return 'Buenas noches, es hora de pensar en parar y descansar.';
}

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function updateClock() {
  const hoursEl   = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  const dateEl    = document.getElementById('clock-date');
  const phraseEl  = document.getElementById('clock-phrase');

  if (!hoursEl) return;

  const now = new Date();

  const hours   = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  hoursEl.textContent   = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  const day   = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year  = now.getFullYear();
  dateEl.textContent = `${day} / ${month} / ${year}`;

  phraseEl.textContent = getPhrase(hours);
}

updateClock();
setInterval(updateClock, 1000);
