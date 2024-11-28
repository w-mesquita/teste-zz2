import "../css/styles.css";
import "./flowbite.min";

document.addEventListener("DOMContentLoaded", function () {
    function loadFormEntries() {
      const apiUrl = process.env.APP_API_URL || "http://localhost:3000/api";
  
      fetch(`${apiUrl}/form-entries`)
        .then((response) => response.json())
        .then((data) => {
          const tableBody = document.querySelector("#submissions-table tbody");
  
          if (!tableBody) {
            console.error("Elemento <tbody> não encontrado no DOM!");
            return;
          }
  
          tableBody.innerHTML = "";
  
          data.forEach((entry) => {
            const row = document.createElement("tr");
            row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700");
  
            row.innerHTML = `
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${entry.name || 'N/A'}
              </th>
              <td class="px-6 py-4">
                ${entry.email || 'N/A'}
              </td>
              <td class="px-6 py-4">
                ${entry.phone || 'N/A'}
              </td>
              <td class="px-6 py-4">
                ${entry.message || 'N/A'}
              </td>
              <td class="px-6 py-4">
                ${new Date(entry.created_at).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo", 
                    hour12: false,
                  }) || 'N/A'}
              </td>
            `;
  
            tableBody.appendChild(row);
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar formulários:", error);
          alert("Houve um erro ao carregar os dados.");
        });
    }
  
    loadFormEntries();
  });
  