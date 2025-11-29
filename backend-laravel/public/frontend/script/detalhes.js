document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("Nenhuma análise selecionada.");
        return;
    }

    try {
        const apiBase = window.location.origin; 

        const response = await fetch(`${apiBase}/api/conteudos/${id}`, {
            method: "GET",
            headers: obterHeadersComAuth() 
        });

        if (!response.ok) {
            console.error("Erro HTTP:", response.status);
            throw new Error("Erro ao buscar dados.");
        }

        const data = await response.json(); 
        preencherCampos(data);

    } catch (e) {
        console.error("ERRO DETALHES:", e);
        alert("Erro ao carregar detalhes da análise.");
    }
});

function preencherCampos(data) {
    console.log("👉 Dados recebidos:", data);

    document.getElementById("empresa").textContent = data.topico ?? "Não informado";

    document.getElementById("data").textContent =
        formatarData(data.updated_at);

    const statusEl = document.getElementById("status");
    statusEl.textContent = data.status ?? "Indefinido";
    aplicarCorStatus(statusEl, data.status);

    document.getElementById("topico").textContent = data.topico ?? "...";
    document.getElementById("conteudo").textContent = data.conteudo ?? "...";
}

function formatarData(dataISO) {
    if (!dataISO) return "Não disponível";
    return new Date(dataISO).toLocaleString("pt-BR");
}

function aplicarCorStatus(el, status) {
    el.classList.remove("status-aprovado", "status-reprovado", "status-pendente");

    switch ((status ?? "").toLowerCase()) {
        case "aprovado":
            el.classList.add("status-aprovado");
            break;
        case "reprovado":
            el.classList.add("status-reprovado");
            break;
        default:
            el.classList.add("status-pendente");
            break;
    }
}
