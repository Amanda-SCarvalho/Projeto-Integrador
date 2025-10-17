const container = document.getElementById("container");
const btnRegister = document.getElementById("register");
const btnLogin = document.getElementById("login");

btnRegister.addEventListener("click", () => {
  container.classList.add("active"); // mostra o cadastro
});

btnLogin.addEventListener("click", () => {
  container.classList.remove("active"); // volta pro login
});
const formCadastro = document.querySelector(".sign-up form");

formCadastro.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("emailCadastro").value.trim();
  const senha = document.getElementById("senhaCadastro").value;
  const confirma = document.getElementById("confirmaSenhaCadastro").value;
  const perfil = document.querySelector('input[name="perfil"]:checked');

  if (!nome || !email || !senha || !confirma || !perfil) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }

  const usuario = { nome, email, senha, perfil: perfil.value };

  localStorage.setItem("usuario", JSON.stringify(usuario));

  alert("Cadastro realizado com sucesso!");
  container.classList.remove("active"); // volta pro login
});
const formLogin = document.querySelector(".sign-in form");

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const email = document.getElementById("emailLogin").value.trim();
  const senha = document.getElementById("senhaLogin").value;

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Nenhum usuário cadastrado!");
    return;
  }

  if (usuario.email === email && usuario.senha === senha) {
    alert(`Bem-vindo, ${usuario.nome}!`);
    window.location.href = "profile.html"; // redireciona
  } else {
    alert("Email ou senha incorretos!");
  }
});

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
});

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector(".sign-in");
  const signUpForm = document.querySelector(".sign-up");
  const openLogin = document.getElementById("open-login-mobile");
  const openRegister = document.getElementById("open-register-mobile");


  signUpForm.classList.add("active");


  if (openLogin) {
    openLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signUpForm.classList.remove("active");
      signInForm.classList.add("active");
    });
  }

  if (openRegister) {
    openRegister.addEventListener("click", (e) => {
      e.preventDefault();
      signInForm.classList.remove("active");
      signUpForm.classList.add("active");
    });
  }

});
