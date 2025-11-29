const baseUrl = window.location.origin;
let conteudoAtual = null;


async function buscarConteudoCriado(topico, tentativas = 0, maxTentativas = 20) {
  try {
    const response = await fetch(`${baseUrl}/api/conteudos?topico=${encodeURIComponent(topico)}`, {
      method: "GET",
      headers: obterHeadersComAuth()
    });

    const data = await response.json();
    const conteudos = data.data || [];

    const encontrado = conteudos.find(c => c.topico.toLowerCase() === topico.toLowerCase());

    if (encontrado) {
      conteudoAtual = encontrado;
      mostrarConteudo(conteudoAtual);
      return;
    }

    if (tentativas < maxTentativas) {
      setTimeout(() => buscarConteudoCriado(topico, tentativas + 1), 2000);
    }

  } catch (error) {
    console.error("Erro:", error);
  }
}

async function gerarAnalise(topico) {
  document.getElementById("analysis-box").innerHTML = "Gerando análise...";

  try {
    const response = await fetch(`${baseUrl}/api/conteudos/gerar`, {
      method: "POST",
      headers: obterHeadersComAuth(),
      body: JSON.stringify({ topico })
    });

    if (!response.ok) {
      const txt = await response.text();
      document.getElementById("analysis-box").innerHTML = `❌ Erro:<br><pre>${txt}</pre>`;
      return;
    }

    buscarConteudoCriado(topico);

  } catch (e) {
    console.error(e);
  }
}


function mostrarConteudo(conteudo) {
  const box = document.getElementById("analysis-box");

  box.innerHTML = `
    <div class="analysis-content">
      <h4>/n📌 ${conteudo.topico}/n</h4>
      <p>${conteudo.conteudo}</p>
    </div>
  `;
}


document.getElementById("company-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const empresa = e.target.value.trim();
    if (empresa) gerarAnalise(empresa);
  }
});


document.getElementById("send-btn").addEventListener("click", () => {
  const empresa = document.getElementById("company-input").value.trim();
  if (empresa) gerarAnalise(empresa);
});


document.querySelector(".status-aprovado").addEventListener("click", async () => {
  if (!conteudoAtual) return alert("Nenhuma análise carregada!");

  const response = await fetch(`${baseUrl}/api/conteudos/${conteudoAtual.id}/aprovar`, {
    method: "POST",
    headers: obterHeadersComAuth()
  });

  alert(response.ok ? "Aprovada" : "Erro ao aprovar");
});


const motivoContainer = document.getElementById("motivo-reprovacao-container");
const motivoInput = document.getElementById("motivo-input");

document.querySelector(".status-reprovado").addEventListener("click", () => {
  motivoContainer.classList.remove("d-none");
});

document.getElementById("enviar-motivo").addEventListener("click", async () => {
  const motivo = motivoInput.value.trim();

  if (!motivo) return alert("Digite o motivo!");

  const response = await fetch(`${baseUrl}/api/conteudos/${conteudoAtual.id}/reprovar`, {
    method: "POST",
    headers: obterHeadersComAuth(),
    body: JSON.stringify({ motivo_reprovacao: motivo })
  });

  alert(response.ok ? "Reprovada" : "Erro ao reprovar");

  motivoContainer.classList.add("d-none");
  motivoInput.value = "";
});


document.querySelector(".status-pendente").addEventListener("click", async () => {
  if (!conteudoAtual) return alert("Nenhuma análise carregada!");

  const response = await fetch(`${baseUrl}/api/conteudos/${conteudoAtual.id}`, {
    method: "PUT",
    headers: obterHeadersComAuth(),
    body: JSON.stringify({ status: "pendente" })
  });

  alert(response.ok ? "Marcada como pendente" : "Erro ao marcar");
});
