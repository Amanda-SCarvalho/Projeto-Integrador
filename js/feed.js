document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidade da Sidebar (Destacar o link ativo)
    // Isso garante que quando um item for clicado, ele possa ser estilizado via CSS
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Remove a classe 'ativo' de todos os links
            navLinks.forEach(item => item.classList.remove('ativo'));
            
            // Adiciona a classe 'ativo' apenas ao link clicado
            this.classList.add('ativo');

            // Previne o comportamento padrão (navegar para #) se não for o link 'Sair'
            // if (this.querySelector('.titulo').textContent !== 'Sair') {
            //     event.preventDefault(); 
            // }
            
            // Note: Não prevenimos o default para permitir que o navegador trate o link
        });
    });

    // 2. Funcionalidade de Postar
    const btnPostar = document.getElementById("btn-postar");
    if (btnPostar) {
        btnPostar.addEventListener("click", () => {
            const textarea = document.querySelector('.create-post textarea');
            if (textarea && textarea.value.trim() !== "") {
                alert("Post criado com sucesso!");
                textarea.value = ""; // Limpa o textarea após postar
            } else {
                alert("O post não pode ser vazio!");
            }
        });
    }

    // 3. Funcionalidade de Recarregar Saldo
    const btnRecarregar = document.getElementById("recarregar");
    const saldoElement = document.getElementById("saldo");
    
    if (btnRecarregar && saldoElement) {
        btnRecarregar.addEventListener("click", () => {
            let valor = parseFloat(saldoElement.textContent);
            
            // Garante que é um número válido antes de somar
            if (!isNaN(valor)) {
                saldoElement.textContent = (valor + 50).toFixed(0); // Soma 50 e mantém inteiro
                alert("Saldo recarregado com sucesso! (R$ 50,00)");
            } else {
                console.error("Erro: Elemento 'saldo' não contém um número válido.");
            }
        });
    }

    // 4. Funcionalidade de Criar Novo Grupo
    const btnNovoGrupo = document.getElementById("novo-grupo");
    if (btnNovoGrupo) {
        btnNovoGrupo.addEventListener("click", () => {
            alert("Janela para criação de novo grupo aberta!");
        });
    }

    // 5. Funcionalidade dos botões "Seguir" (opcional, mas bom para interação)
    const followButtons = document.querySelectorAll('.seguir, .seguir-sugestao');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Seguir') {
                this.textContent = 'Seguindo';
                this.style.backgroundColor = '#6c757d'; // Cinza para indicar que já segue
                alert('Começou a seguir!');
            } else {
                this.textContent = 'Seguir';
                this.style.backgroundColor = 'var(--cor-sucesso)'; // Volta para verde (do CSS)
                alert('Deixou de seguir!');
            }
        });
    });
});