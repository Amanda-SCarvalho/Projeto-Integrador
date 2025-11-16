const container = document.getElementById("container");
const btnRegister = document.getElementById("register");
const btnLogin = document.getElementById("login");

btnRegister.addEventListener("click", () => {
  container.classList.add("active");
});

btnLogin.addEventListener("click", () => {
  container.classList.remove("active");
});
const formCadastro = document.querySelector(".sign-up form");

formCadastro.addEventListener("submit", async(ev) => {
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

  const dadosUsuario = {
    nome: nome,
    email: email,
    senha: senha,
    tipoUsuario: perfil.value
  };

  try {
    const response = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosUsuario)
    });

    if (response.ok) {
      const usuarioSalvo = await response.json();
      console.log("Usuário cadastrado com sucesso:", usuarioSalvo);

      alert("Usuário cadastrado com sucesso!");
      container.classList.remove("active"); // volta pro login
    } else {
      alert("Erro ao cadastrar. O email pode já estar em uso.");
    }

  }catch (erro) {
    console.error("Erro na requisição:", erro);
  }
});


const formLogin = document.querySelector(".sign-in form");

formLogin.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const email = document.getElementById("emailLogin").value.trim();
  const senha = document.getElementById("senhaLogin").value;

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }
  
  //Cria o Packet de Requisição la no Beck
  const loginRequest = {
    email: email,
    senha: senha
  };
  
  try {
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method:'POST',
      headers: {
        'Content-Type': 'appLication/json'
      },
      body: JSON.stringify(loginRequest)
    });

    if (response.ok) {
      const usuarioLogado = await response.json(); 
      alert(`Bem-vindo, ${usuarioLogado.nome}!`);

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

      //redirec pro perfil do usuario
      window.location.href = "perfil.html";

    } else if (response.status === 401) {
      //findByEmail não achou, ValidaSenha errado!! Display do erro 401
      alert("email ou senha incorretos!");

    } else {
      alert("Erro ao tentar fazer login. Verifique suas informaçãoes ou cadastre-se")
    }

  } catch (error) {
    console.error('Erro de rede:', error);
    alert('não foi possivel conectar-se ao servidor!')
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
