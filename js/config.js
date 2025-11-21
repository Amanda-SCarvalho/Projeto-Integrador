document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "https://api-conectaatleta.onrender.com/api/usuarios";
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "login.html"; 
        return; 
    }

    const usuarioId = usuarioLogado.id;

    fetch(`${API_BASE_URL}/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Não foi possível carregar os dados do usuário.");
            }
            return response.json();
        })
        .then(usuario => {
            document.getElementById("perfil-email").textContent = usuario.email;
            document.getElementById("perfil-nome").textContent = usuario.nome;
            document.getElementById("perfil-tipo").textContent = usuario.tipoUsuario;
        })
        .catch(error => {
            console.error(error);
            alert("Erro ao carregar dados. Faça login novamente.");
            localStorage.removeItem("usuarioLogado"); 
            window.location.href = "login.html";
        }); 

    document.getElementById("btn-excluir-conta").addEventListener("click", async (e) => {
        e.preventDefault(); 

        if (!confirm("TEM CERTEZA? Isso vai apagar sua conta permanentemente.")) {
            return; 
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${usuarioId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Conta excluída com sucesso.");
                localStorage.removeItem("usuarioLogado"); 
                window.location.href = "login.html"; 
            } else {
                alert("Erro ao excluir conta.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de rede ao tentar excluir conta.");
        }
    });

    document.getElementById("btn-alterar-nome").addEventListener("click", async (e) => {
        e.preventDefault(); 

        const novoNome = prompt("Digite seu novo nome de usuário:");
        
        if (!novoNome) return; 

        try {
            const response = await fetch(`${API_BASE_URL}/${usuarioId}/nome`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome }) 
            });

            if (response.ok) {
                const usuarioAtualizado = await response.json();
                alert("Nome atualizado com sucesso!");
                
                document.getElementById("perfil-nome").textContent = usuarioAtualizado.nome;
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
            } else {
                alert("Erro ao atualizar o nome.");
            }
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById("btn-alterar-email").addEventListener("click", async (e) => {
        e.preventDefault();

        const novoEmail = prompt("Digite seu novo email:");
        
        if (!novoEmail) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${usuarioId}/email`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: novoEmail }) 
            });

            if (response.ok) {
                const usuarioAtualizado = await response.json();
                alert("Email atualizado com sucesso!");
                document.getElementById("perfil-email").textContent = usuarioAtualizado.email;
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
            } else {
                alert("Erro ao atualizar o email.");
            }
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById("btn-alterar-senha").addEventListener("click", async (e) => {
        e.preventDefault();

        const senhaAntiga = prompt("Digite sua senha ANTIGA:");
        if (!senhaAntiga) return;
        
        const senhaNova = prompt("Digite sua senha NOVA:");
        if (!senhaNova) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${usuarioId}/senha`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    senhaAntiga: senhaAntiga, 
                    senhaNova: senhaNova 
                })
            });

            if (response.ok) {
                alert("Senha atualizada com sucesso! Faça login novamente.");
                localStorage.removeItem("usuarioLogado");
                window.location.href = "login.html";
            } else if (response.status === 401) {
                alert("Senha antiga incorreta!");
            } else {
                alert("Erro ao atualizar a senha.");
            }
        } catch (error) {
            console.error(error);
        }
    });
});