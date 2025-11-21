const API_URL = "https://api-conectaatleta.onrender.com/api/usuarios/login";

document.addEventListener("DOMContentLoaded", () => {
    
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!user || user.tipoUsuario !== "ADMIN") {
        alert("Acesso negado! Somente administradores podem entrar.");
        window.location.href = "index.html";
        return;
    }

    carregarUsuarios();

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    });
});

async function carregarUsuarios() {
    const container = document.getElementById("usuarios");

    try {
        const response = await fetch(`${API_URL}/api/usuarios/listar`);
        const usuarios = await response.json();

        container.innerHTML = "";

        usuarios.forEach(u => {
            container.innerHTML += `
                <div class="card">
                    <p><strong>Nome:</strong> ${u.nome}</p>
                    <p><strong>Email:</strong> ${u.email}</p>
                    <p><strong>Perfil:</strong> ${u.tipoUsuario}</p>
                    <button id="btn-inativar-conta">Inativar Conta</button>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
    }
}


document.getElementById("btn-inativar-conta").addEventListener("click", async (e) => {
    e.preventDefault();

    if (!confirm("Deseja realmente INATIVAR sua conta? Você não poderá mais fazer login.")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${usuarioId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ativo: false }) 
        });

        if (response.ok) {
            alert("Conta inativada com sucesso.");
            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
        } else {
            alert("Erro ao inativar conta.");
        }

    } catch (error) {
        console.error("Erro ao inativar conta:", error);
        alert("Erro de rede ao tentar inativar a conta.");
    }
});

