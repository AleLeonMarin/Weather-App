document.querySelector(".add").addEventListener("click", function () {
  const container = document.getElementById("card-container");
  const locationInput = document.querySelector(".loc");
  const location = locationInput.value;

  // Datos de ejemplo
  const weatherType = "Rainy";
  const temperature = "25 °C";
  const humidity = "60%";
  const weatherIcon = "rainy.png"; // Asegúrate de tener esta imagen

  // Crear tarjeta
  const card = document.createElement("div");
  card.className =
    "parentX col-md-4 mb-4 d-flex align-items-center justify-content-center";
  card.innerHTML = `
      <div class="card card-custom align-items-center justify-content-center">
        <h5 class="card-title card-title-custom">${location}</h5>
        <img
          src="media/images/${weatherIcon}"
          class="card-img-top card-img-top-custom"
          alt="Weather Icon"
        />
        <div class="card-body card-body-custom text-center">
          <p class="card-text card-text-custom">${weatherType}</p>
          <p class="card-text card-text-custom">${temperature}</p>
          <p class="card-text card-text-custom">Humidity: ${humidity}</p>
        </div>
      </div>
    `;

  // Añadir tarjeta al contenedor
  container.appendChild(card);

  // Limpiar el input después de añadir
  locationInput.value = "";
});

document.querySelector(".clear").addEventListener("click", function () {
  const cards = document.querySelectorAll(".card-custom");
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fadeOut");

        card.addEventListener(
          "animationend",
          function handler() {
            card.remove();
            card.removeEventListener("animationend", handler);

            // Verifica si el elemento removido era el último
            if (index === cards.length - 1) {
              console.log("Última tarjeta eliminada");
              // Aquí elimina el elemento padre si es necesario, después de que todas las tarjetas hayan sido removidas
              const parent = document.querySelector(".parentX");
              if (parent) {
                parent.remove();
              }
            }
          },
          { once: true }
        );
      }, index * 100);
    });
  } else {
    // Si no hay tarjetas, simplemente elimina el elemento padre
    const parent = document.querySelector(".parentX");
    if (parent) {
      parent.remove();
    }
  }
});
