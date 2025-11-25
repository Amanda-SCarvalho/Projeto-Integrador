const API_URL = "https://api-conectaatleta.onrender.com/api/usuarios";

document.addEventListener("DOMContentLoaded", () => {
    const EMAIL_ADMIN = "admin@admin.com";

    const user = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!user || user.email !== EMAIL_ADMIN) {
        alert("Acesso negado! Somente administradores podem entrar.");
        window.location.href = "../index.html";
        return;
    }

    carregarUsuarios();

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "../index.html";
    });
});

async function carregarUsuarios() {
    const container = document.getElementById("listaUsuarios"); 

    try {
        const response = await fetch(API_URL);
        const usuarios = await response.json();

        container.innerHTML = "";

        usuarios.forEach(usuario => {
            container.innerHTML += `
                <div class="user-card">
                    <h3>${usuario.nome}</h3>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Senha:</strong> ${usuario.senha}</p>
                    <p><strong>Perfil:</strong> ${usuario.tipoUsuario}</p>
                    <button class="btn-excluir-conta" data-id="${usuario.id}">
                        Excluir Conta
                    </button>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
    }
}

// EVENTO DO BOTÃO DE EXCLUIR
document.addEventListener("click", async (ev) => {
    if (!ev.target.classList.contains("btn-excluir-conta")) return;

    const usuarioId = ev.target.getAttribute("data-id");

    if (!confirm("⚠ Tem certeza que deseja excluir esta conta? Essa ação é permanente.")) return;

    try {
        const response = await fetch(`${API_URL}/${usuarioId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Conta excluída com sucesso!");
            carregarUsuarios();  // Atualiza a lista
        } else {
            alert("Erro ao excluir a conta.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de rede.");
    }
});

