function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("closed");
}


document.addEventListener('DOMContentLoaded', function () {
  try {
    var user = null;

    if (typeof obterUsuario === 'function') {
      user = obterUsuario();
    } else {
      var raw = localStorage.getItem('authUser');
      user = raw ? JSON.parse(raw) : null;
    }

    if (user && user.name) {
      var el = document.getElementById('user-name');
      if (el) el.textContent = user.name;
    }
  } catch (e) {
    console.warn('Não foi possível obter nome do usuário:', e);
  }
});


async function irParaUltimaAnalise() {
  const baseUrl = window.location.origin;
  const headers = obterHeadersComAuth();

  try {
    const response = await fetch(`${baseUrl}/api/conteudos`, { headers });

    const data = await response.json();
    const conteudos = data.data || [];

    if (conteudos.length === 0) {
      alert("Nenhuma análise encontrada.");
      return;
    }

    conteudos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const ultima = conteudos[0];

    window.location.href = `detalhes.html?id=${ultima.id}`;

  } catch (e) {
    console.error(e);
    alert("Erro ao buscar a última análise.");
  }
}
