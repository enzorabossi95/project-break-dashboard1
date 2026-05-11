const MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const NUMEROS    = '0123456789';
const SIMBOLOS   = '!@#$%^&*()-_=+';
const TODOS      = MAYUSCULAS + MINUSCULAS + NUMEROS + SIMBOLOS;

function generarContrasena(longitud) {
  let contrasena = '';

  contrasena += MAYUSCULAS[Math.floor(Math.random() * MAYUSCULAS.length)];
  contrasena += MINUSCULAS[Math.floor(Math.random() * MINUSCULAS.length)];
  contrasena += NUMEROS[Math.floor(Math.random() * NUMEROS.length)];
  contrasena += SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)];

  for (let i = 4; i < longitud; i++) {
    contrasena += TODOS[Math.floor(Math.random() * TODOS.length)];
  }

  contrasena = contrasena.split('').sort(() => Math.random() - 0.5).join('');

  return contrasena;
}

const btnGenerar  = document.getElementById('btn-generate');
const btnCopiar   = document.getElementById('btn-copy');
const inputLength = document.getElementById('password-length');
const outputEl    = document.getElementById('password-output');

if (btnGenerar) {
  btnGenerar.addEventListener('click', () => {
    let longitud = parseInt(inputLength.value) || 16;

    if (longitud < 12) longitud = 12;
    if (longitud > 50) longitud = 50;

    inputLength.value = longitud;

    const nuevaContrasena = generarContrasena(longitud);
    outputEl.textContent  = nuevaContrasena;
    outputEl.classList.remove('password-placeholder');
  });
}

if (btnCopiar) {
  btnCopiar.addEventListener('click', () => {
    const texto = outputEl.textContent;

    if (!texto || outputEl.classList.contains('password-placeholder')) return;

    navigator.clipboard.writeText(texto).then(() => {
      const textoOriginal = btnCopiar.textContent;
      btnCopiar.textContent = '¡Copiado!';
      setTimeout(() => {
        btnCopiar.textContent = textoOriginal;
      }, 2000);
    });
  });
}
