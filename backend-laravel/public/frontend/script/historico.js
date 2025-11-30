
const baseUrl = window.location.origin;

document.addEventListener("DOMContentLoaded", async () => {
  await carregarHistorico();
  configurarFiltros();
  aplicarFiltroDaUrl();
});


async function carregarHistorico() {
  try {
    const response = await fetch(`${baseUrl}/api/conteudos`, {
      method: "GET",
      headers: obterHeadersComAuth()
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar");
    }

    const data = await response.json();
    const lista = data.data || data || [];

    exibirHistorico(lista);

  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("history-list").innerHTML =
      `<p class="no-data text-center">Não foi possível carregar o histórico.</p>`;
  }
}


function exibirHistorico(lista) {
  const container = document.getElementById("history-list");
  container.innerHTML = "";

  if (!lista || lista.length === 0) {
    container.innerHTML = `<p class="no-data text-center">Nenhuma interação encontrada.</p>`;
    return;
  }

  lista.forEach(item => {
    const status = definirStatus(item.status);
    const empresa = item.topico || "Empresa não informada";

    const box = document.createElement("div");
    box.classList.add("col-12", "col-md-6", "col-lg-4");

    box.innerHTML = `
      <a href="detalhes.html?id=${item.id}" class="history-box" data-status="${status}">
        
        <p><strong>Empresa:</strong> ${empresa}</p>

        <p><strong>Data:</strong> ${formatarData(item.created_at)}</p>

        <p class="${classeStatus(status)}">
          <strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}
        </p>

      </a>
    `;

    container.appendChild(box);
  });
}


function definirStatus(status) {
  if (!status) return "pendente";

  const st = status.toLowerCase();
  if (st === "aprovado") return "aprovado";
  if (st === "reprovado") return "reprovado";
  return "pendente";
}

function classeStatus(status) {
  if (status === "aprovado") return "status-aprovado";
  if (status === "reprovado") return "status-reprovado";
  return "status-pendente";
}


function formatarData(data) {
  return new Date(data).toLocaleString("pt-BR");
}


function configurarFiltros() {
  const botoes = document.querySelectorAll(".filter-btn");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      btn.classList.add("active");

      const filtro = btn.dataset.status;
      filtrarHistorico(filtro);
    });
  });
}

function filtrarHistorico(filtro) {
  const itens = document.querySelectorAll(".history-box");

  itens.forEach(item => {
    if (filtro === "all") {
      item.parentElement.style.display = "block";
    } else if (item.dataset.status === filtro) {
      item.parentElement.style.display = "block";
    } else {
      item.parentElement.style.display = "none";
    }
  });
}


function aplicarFiltroDaUrl() {
  const params = new URLSearchParams(window.location.search);
  const filtroUrl = params.get("status");

  if (filtroUrl) {
    const botao = document.querySelector(`.filter-btn[data-status="${filtroUrl}"]`);
    if (botao) {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      botao.classList.add("active");
      filtrarHistorico(filtroUrl);
    }
  }
}
