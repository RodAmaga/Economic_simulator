// Создание карты и установка центра на Францию
var map = L.map('map').setView([50, 10],5);

// Добавление слоя OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
    attribution: '&copy; OpenStreetMap contributors, HOT',
    maxZoom:19
}).addTo(map);

// Начало кода с двумя слоями
// // Географическая карта как раньше
// const geoMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; OpenStreetMap contributors, HOT',
//     maxZoom: 19
// });
//
// // Кастомное изображение-карта
// const imageBounds = [[0,0],[1500,2000]];// размеры изображения
// const imageMap = L.imageOverlay('/static/images/map_image.jpg', imageBounds);
//
// // Создаем карту с базовой системой координат
// const map = L.map('map', {
//     crs: L.CRS.Simple, // чтобы работала и обычная карта и изображение
//     minZoom: -19,
//     maxZoom: 19,
//     layers: [geoMap] // Стартовая карта
// });
//
// // Подгоняем карту под размер
// map.fitBounds(imageBounds);
//
// // Переключатель слоев (карта или кастомное изображение)
// const baseMaps = {
//     "Geo": geoMap,
//     "2D-Image": imageMap
// };
//
// L.control.layers(baseMaps, null, {position: 'topright'}).addTo(map);
// Конец кода с двумя слоями

// Загружаем агентов с сервера
fetch('/api/agents')
    .then(response=> response.json())
    .then(data =>  {
        data.forEach(agent => {
            let marker = L.marker([agent.lat, agent.lon]).addTo(map);
            marker.bindPopup(`<b>${agent.name}</b><br>Population: ${agent.population.toLocaleString()}<br>GDP: $${(agent.gdp / 1e12).toFixed(2)} t`);
        })
    });

// Загружаем роли с сервера
fetch('/api/roles')
    .then(response=> response.json())
    .then(roles =>  {
        const select = document.getElementById("roleSelect");
        roles.forEach(role => {
            const option = document.createElement("option");
            option.value = role.name;
            option.textContent = role.name + " - " + role.description;
            select.appendChild(option);
        })
        select.addEventListener("change", () => {
            alert("Вы выбрали роль: " + select.value);
           // позже здесь можно будет запускать логику конкретной роли
        });
    });

// Прогрузка агентов (стран) в боковую панель
fetch('/api/agents')
    .then(response=> response.json())
    .then(agents =>  {
        const select = document.getElementById("countrySelect");
        agents.forEach(agent => {
            const option = document.createElement("option");
            option.value = agent.name;
            option.textContent = agent.name + " - " + agent.description; // Здесь надо будет продумать описание
            select.appendChild(option);
        })
        select.addEventListener("change", () => {
            alert("You selected country: " + select.value);
           // позже здесь можно будет запускать логику конкретной страны
        });
    });

// Переключатель боковой панели (правой)
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
        toggle.textContent = sidebar.classList.contains("closed") ? "➡️" : "⬅️";

        // Перерисовка карты, чтобы карта после свернувшегося бокового окна, отрисовалась на весь экран
        setTimeout(()=> {
            map.invalidateSize();
        },310);
    });
});

// Переключатель боковой панели (левой)
document.addEventListener("DOMContentLoaded", () => {
    const sidebarLeft = document.getElementById("sidebarLeft");
    const toggle = document.getElementById("sidebarLeftToggle");

    toggle.addEventListener("click", () => {
        sidebarLeft.classList.toggle("closed");
        toggle.textContent = sidebarLeft.classList.contains("closed") ? "➡️" : "⬅️";

        // Перерисовка карты, чтобы карта после свернувшегося бокового окна (правого), отрисовалась на весь экран
        setTimeout(()=> {
            map.invalidateSize();
        },310);
    });
});