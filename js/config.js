//Add event list tá esperando o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {

    // recupera o usuário logado do localStorage
    const API_BASE_URL = "https://api-conectaatleta.onrender.com/api/usuarios";


    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // se nao for um usuario logado, volta pro login
    if (!usuarioLogado) {
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "login.html";
        return;
    }

    // se for, puxa os dados do usuario no beck
    const usuarioId = usuarioLogado.id;

    fetch(`https://api-conectaatleta.onrender.com/api/usuarios/${usuarioId}`)
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

    function abrirModal(titulo, conteudoHTML, callbackConfirmar) {
        document.getElementById("modal-title").textContent = titulo;
        document.getElementById("modal-body").innerHTML = conteudoHTML;

        const modal = document.getElementById("modal");
        modal.classList.remove("hidden");

        const btnCancelar = document.getElementById("modal-cancelar");
        const btnConfirmar = document.getElementById("modal-confirmar");

        btnCancelar.onclick = () => modal.classList.add("hidden");
        btnConfirmar.onclick = () => callbackConfirmar();
    }




    // apagar a conta 
    document.getElementById("btn-excluir-conta").addEventListener("click", () => {
        abrirModal(
            "Excluir Conta",
            `<p style="color:#c5303c;font-weight:bold">Essa ação é permanente.</p>`,
            async () => {
                await fetch(`${API_BASE_URL}/${usuarioId}`, { method: "DELETE" });

                localStorage.removeItem("usuarioLogado");
                window.location.href = "login.html";
            }
        );
    });


    //alter nome
    document.getElementById("btn-alterar-nome").addEventListener("click", () => {
        abrirModal(
            "Alterar Nome",
            `<input type="text" id="novoNome" placeholder="Digite o novo nome">`,
            async () => {
                const novoNome = document.getElementById("novoNome").value;
                if (!novoNome) return;

                await fetch(`${API_BASE_URL}/${usuarioId}/nome`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome: novoNome })
                });

                document.getElementById("perfil-nome").textContent = novoNome;
                document.getElementById("modal").classList.add("hidden");
            }
        );
    });


    //alter email
    document.getElementById("btn-alterar-email").addEventListener("click", () => {
        abrirModal(
            "Alterar Email",
            `<input type="email" id="novoEmail" placeholder="Digite o novo email">`,
            async () => {
                const novoEmail = document.getElementById("novoEmail").value;
                if (!novoEmail) return;

                await fetch(`${API_BASE_URL}/${usuarioId}/email`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: novoEmail })
                });

                document.getElementById("perfil-email").textContent = novoEmail;
                document.getElementById("modal").classList.add("hidden");
            }
        );
    });


    //alter senha
    document.getElementById("btn-alterar-senha").addEventListener("click", () => {
        abrirModal(
            "Alterar Senha",
            `
            <input type="password" id="senhaAntiga" placeholder="Senha antiga">
            <input type="password" id="senhaNova" placeholder="Senha nova">
        `,
            async () => {
                const senhaAntiga = document.getElementById("senhaAntiga").value;
                const senhaNova = document.getElementById("senhaNova").value;

                await fetch(`${API_BASE_URL}/${usuarioId}/senha`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ senhaAntiga, senhaNova })
                });

                alert("Senha atualizada. Faça login novamente.");
                localStorage.removeItem("usuarioLogado");
                window.location.href = "login.html";
            }
        );
    });


});