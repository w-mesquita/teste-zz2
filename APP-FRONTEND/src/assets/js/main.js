import "../css/styles.css";
import "./flowbite.min";


// para lidar com ações do form
const form = document.getElementById("contactForm");

const fields = [
  {
    id: "name",
    errorId: "nameError",
    validate: (value) => value.trim() !== "", 
  },
  {
    id: "email",
    errorId: "emailError",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "phone",
    errorId: "phoneError",
    validate: (value) => /^\d{2}-\d{5}-\d{4}$/.test(value),
  },
  {
    id: "message",
    errorId: "messageError",
    validate: (value) => value.trim() !== "",
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  const data = {};

  fields.forEach(({ id, errorId, validate }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);

    if (!validate(input.value)) {
      error.classList.remove("hidden");
      input.classList.add("border-red-500", "ring-red-500");
      isValid = false;
    } else {
      error.classList.add("hidden");
      input.classList.remove("border-red-500", "ring-red-500");
      data[id] = input.value;
    }
  });

  if (isValid) {
    const apiUrl = process.env.APP_API_URL || "http://localhost:3000/api";
    fetch(`${apiUrl}/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Formulário enviado com sucesso!") {
          alert("Formulário enviado com sucesso!");
          form.reset();
        } else {
          alert(data.message || "Erro ao enviar o formulário");
        }
      })
      .catch((error) => {
        alert("Erro ao enviar o formulário: " + error);
      });
  }
});

// para lidar com configurações do slider
document.addEventListener("DOMContentLoaded", function () {
  const targetCarousel = document.getElementById("default-carousel");
  console.log('🔥 ~ targetCarousel:', targetCarousel)

  if (targetCarousel) {
    const carousel = new Carousel(targetCarousel, {
      interval: 5000, // Tempo de exibição (5 segundos)
      pauseOnHover: true, // Pausar ao passar o mouse (opcional)
    });
  } else {
    console.error("Carousel não encontrado!");
  }
});
