// Espera o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
  // =============== 1. MARCAÇÃO DE ITEM ATIVO NA SIDEBAR ===============
  const linksSidebar = document.querySelectorAll(".sidebar nav ul li a");
  linksSidebar.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      linksSidebar.forEach((l) => l.classList.remove("ativo"));
      link.classList.add("ativo");
    });
  });

  // =============== 2. BOTÃO "SEGUIR" PRINCIPAL ===============
  const btnSeguir = document.querySelector(".btn-seguir");
  if (btnSeguir) {
    btnSeguir.addEventListener("click", () => {
      const seguindo = btnSeguir.classList.toggle("seguindo");
      btnSeguir.textContent = seguindo ? "Seguindo" : "Seguir";
      btnSeguir.style.backgroundColor = seguindo ? "var(--cor-sucesso)" : "";
      btnSeguir.style.color = seguindo ? "#fff" : "";
    });
  }

  // =============== 3. BOTÕES "SEGUIR" DAS SUGESTÕES ===============
  const botoesSugestao = document.querySelectorAll(".seguir-sugestao");
  botoesSugestao.forEach((botao) => {
    botao.addEventListener("click", () => {
      const seguindo = botao.classList.toggle("seguindo");
      botao.textContent = seguindo ? "Seguindo" : "Seguir";
      botao.style.backgroundColor = seguindo ? "var(--cor-sucesso)" : "";
      botao.style.color = seguindo ? "#fff" : "";
    });
  });

  // =============== 4. AÇÕES NOS POSTS (CURTIR, COMENTAR, PATROCINAR) ===============
  const botoesPost = document.querySelectorAll(".post-footer button");
  botoesPost.forEach((botao) => {
    botao.addEventListener("click", () => {
      const texto = botao.textContent.trim();
      mostrarNotificacao(`Você clicou em "${texto}"`);
    });
  });

  // =============== 5. CRIAR NOVO GRUPO DE CHAT ===============
  const novoGrupo = document.getElementById("novo-grupo");
  if (novoGrupo) {
    novoGrupo.addEventListener("click", () => {
      mostrarNotificacao("💬 Novo grupo de conversa criado!");
    });
  }

  // =============== 6. ANIMAÇÃO DOS ÍCONES DA SIDEBAR ===============
  const iconesSidebar = document.querySelectorAll(".sidebar .icone i");
  iconesSidebar.forEach((icone) => {
    icone.addEventListener("mouseenter", () => {
      icone.style.transform = "scale(1.3)";
      icone.style.transition = "transform 0.2s ease";
    });
    icone.addEventListener("mouseleave", () => {
      icone.style.transform = "scale(1)";
    });
  });

  // =============== 7. FUNÇÃO DE NOTIFICAÇÃO FLUTUANTE ===============
  function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement("div");
    notificacao.textContent = mensagem;
    notificacao.className = "notificacao";
    document.body.appendChild(notificacao);

    // Remove após 2 segundos
    setTimeout(() => notificacao.remove(), 2000);
  }
});
