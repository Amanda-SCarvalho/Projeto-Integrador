//Add event list tá esperando o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {

    // recupera o usuário logado do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // se nao for um usuario logado, volta pro login
    if (!usuarioLogado) {
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "login.html"; 
        return; 
    }

    // se for, puxa os dados do usuario no beck
    const usuarioId = usuarioLogado.id;

    fetch(`http://localhost:8080/api/usuarios/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                // Deletado ou erro (não consta no localhost 8080)
                throw new Error("Não foi possível carregar os dados do usuário.");
            }
            return response.json();
        })
        .then(usuario => {
            // puxa do beck pros campos HMTL

            document.getElementById("perfil-email").textContent = usuario.email;
            document.getElementById("perfil-nome").textContent = usuario.nome;
            document.getElementById("perfil-tipo").textContent = usuario.tipoUsuario;
            
        })
        .catch(error => {
            console.error("Erro ao buscar usuário:", error);
            alert("Erro ao carregar dados. Faça login novamente.");
            localStorage.removeItem("usuarioLogado"); 
            window.location.href = "login.html";
        }); 



        // apagar a conta 
        document.getElementById("btn-excluir-conta").addEventListener("click", async (e) => {
        e.preventDefault(); 

    if (!confirm("TEM CERTEZA? Isso vai apagar sua conta permanentemente.")) {
        return; 
    }

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
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
            console.error("Erro ao excluir conta:", error);
            alert("Erro de rede ao tentar excluir conta.");
        }
    });

    //alter nome
    document.getElementById("btn-alterar-nome").addEventListener("click", async (e) => {
        e.preventDefault(); // Impede o link de navegar

        const novoNome = prompt("Digite seu novo nome de usuário:");
        
        if (!novoNome) return; // Se o usuário cancelar

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/nome`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome }) // Envia o record UpdateNome
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
            console.error("Erro de rede:", error);
        }
    });

    //alter email
    document.getElementById("btn-alterar-email").addEventListener("click", async (e) => {
        e.preventDefault();

        const novoEmail = prompt("Digite seu novo email:");
        
        if (!novoEmail) return;

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/email`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: novoEmail }) // Envia o record UpdateEmail
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
            console.error("Erro de rede:", error);
        }
    });

    //alter senha
    document.getElementById("btn-alterar-senha").addEventListener("click", async (e) => {
        e.preventDefault();

        const senhaAntiga = prompt("Digite sua senha ANTIGA:");
        if (!senhaAntiga) return;
        
        const senhaNova = prompt("Digite sua senha NOVA:");
        if (!senhaNova) return;

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/senha`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ // Envia o record UpdateSenha
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
            console.error("Erro de rede:", error);
        }
    });
});