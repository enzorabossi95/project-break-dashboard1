const STORAGE_KEY = 'dashboard-links';

function getLinks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function renderLinks() {
  const container = document.getElementById('links-list');
  if (!container) return;

  const links = getLinks();

  if (links.length === 0) {
    container.innerHTML = '<p class="links-empty">Todavía no hay links. ¡Añade uno!</p>';
    return;
  }

  container.innerHTML = '';

  links.forEach((link, index) => {
    const item = document.createElement('div');
    item.className = 'link-item';

    const anchor = document.createElement('a');
    anchor.href   = link.url;
    anchor.target = '_blank';
    anchor.rel    = 'noopener noreferrer';
    anchor.textContent = link.titulo;

    // Botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.className   = 'btn-danger';
    btnEliminar.textContent = '✕';
    btnEliminar.title       = 'Eliminar este link';
    btnEliminar.addEventListener('click', () => {
      eliminarLink(index);
    });

    item.appendChild(anchor);
    item.appendChild(btnEliminar);
    container.appendChild(item);
  });
}

function añadirLink(titulo, url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const links = getLinks();
  links.push({ titulo, url });
  saveLinks(links);  
  renderLinks();     
}

function eliminarLink(index) {
  const links = getLinks();
  links.splice(index, 1);
  saveLinks(links);
  renderLinks();
}

const btnAddLink  = document.getElementById('btn-add-link');
const inputTitulo = document.getElementById('link-title');
const inputUrl    = document.getElementById('link-url');

if (btnAddLink) {
  btnAddLink.addEventListener('click', () => {
    const titulo = inputTitulo.value.trim();
    const url    = inputUrl.value.trim();

    if (!titulo || !url) {
      inputTitulo.focus();
      return;
    }

    añadirLink(titulo, url);

    inputTitulo.value = '';
    inputUrl.value    = '';
    inputTitulo.focus();
  });

  inputUrl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnAddLink.click();
  });
}

renderLinks();
