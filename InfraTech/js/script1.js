const alertaSucesso = document.createElement("div");
alertaSucesso.className = "alerta-overlay";
alertaSucesso.hidden = true;

const caixaAlerta = document.createElement("section");
caixaAlerta.className = "alerta-caixa";
caixaAlerta.setAttribute("role", "dialog");
caixaAlerta.setAttribute("aria-modal", "true");
caixaAlerta.setAttribute("aria-labelledby", "tituloAlerta");

const iconeAlerta = document.createElement("div");
iconeAlerta.className = "alerta-icone";
iconeAlerta.setAttribute("aria-hidden", "true");
iconeAlerta.textContent = "✓";

const tituloAlerta = document.createElement("h2");
tituloAlerta.id = "tituloAlerta";
tituloAlerta.textContent = "Sucesso!";

const textoAlerta = document.createElement("p");
textoAlerta.className = "alerta-texto";

const botaoAlerta = document.createElement("button");
botaoAlerta.className = "alerta-botao";
botaoAlerta.type = "button";
botaoAlerta.textContent = "Continuar";

caixaAlerta.append(iconeAlerta, tituloAlerta, textoAlerta, botaoAlerta);
alertaSucesso.appendChild(caixaAlerta);
document.body.appendChild(alertaSucesso);

let elementoAnteriorAlerta;

function fecharAlerta() {
    alertaSucesso.hidden = true;
    if (elementoAnteriorAlerta) {
        elementoAnteriorAlerta.focus();
    }
}

function mostrarAlerta(mensagem, tipo = "sucesso") {
    elementoAnteriorAlerta = document.activeElement;
    textoAlerta.textContent = mensagem;
    tituloAlerta.textContent = tipo === "erro" ? "Não foi possível entrar" : "Sucesso!";
    iconeAlerta.textContent = tipo === "erro" ? "!" : "✓";
    alertaSucesso.classList.toggle("alerta-erro", tipo === "erro");
    alertaSucesso.hidden = false;
    botaoAlerta.focus();
}

botaoAlerta.addEventListener("click", fecharAlerta);
alertaSucesso.addEventListener("click", function(event) {
    if (event.target === alertaSucesso) {
        fecharAlerta();
    }
});

document.addEventListener("keydown", function(event) {
    if (!alertaSucesso.hidden && event.key === "Escape") {
        fecharAlerta();
    }
});

document.querySelectorAll(".alternar-senha").forEach(function(opcao) {
    function atualizarVisibilidade() {
        const tipo = opcao.checked ? "text" : "password";
        opcao.dataset.campos.trim().split(/\s+/).forEach(function(idCampo) {
            document.getElementById(idCampo).type = tipo;
        });
    }

    opcao.addEventListener("change", atualizarVisibilidade);
    opcao.closest("form").addEventListener("reset", function() {
        opcao.checked = false;
        atualizarVisibilidade();
    });
});

// CADASTRO
const formulario = document.getElementById("formCadastro");

if (formulario) {

    formulario.addEventListener("submit", function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        const mensagem = document.getElementById("mensagem");

        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não coincidem!";
            mensagem.style.color = "red";
            return;
        }

        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("senha", senha);

        mensagem.textContent = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";
        mostrarAlerta("Cadastro realizado com sucesso!");
    });

}

// LOGIN
const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(event){

        event.preventDefault();

        const emailDigitado = document.getElementById("emailLogin").value;
        const senhaDigitada = document.getElementById("senhaLogin").value;

        const emailSalvo = localStorage.getItem("email");
        const senhaSalva = localStorage.getItem("senha");

        const mensagem = document.getElementById("mensagemLogin");

        if(emailDigitado === emailSalvo && senhaDigitada === senhaSalva){

            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.style.color = "green";
            mostrarAlerta("Login realizado com sucesso!");

        } else {

            mensagem.textContent = "Dados incorretos ou não cadastrados.";
            mensagem.style.color = "red";
            mostrarAlerta("Dados incorretos ou não cadastrados.", "erro");

        }

    });

}

const areaLogin = document.getElementById("areaLogin");
const formRecuperacaoSenha = document.getElementById("formRecuperacaoSenha");

if (areaLogin && formRecuperacaoSenha) {
    const tituloFormulario = document.getElementById("tituloFormulario");
    const botaoEsqueciSenha = document.getElementById("botaoEsqueciSenha");
    const botaoVoltarLogin = document.getElementById("botaoVoltarLogin");
    const campoEmailRecuperacao = document.getElementById("emailRecuperacao");
    const campoNovaSenha = document.getElementById("novaSenha");
    const campoConfirmarNovaSenha = document.getElementById("confirmarNovaSenha");
    const mensagemRecuperacao = document.getElementById("mensagemRecuperacao");

    botaoEsqueciSenha.addEventListener("click", function() {
        areaLogin.hidden = true;
        formRecuperacaoSenha.hidden = false;
        tituloFormulario.textContent = "Redefinir senha";
        mensagemRecuperacao.textContent = "";
        formRecuperacaoSenha.reset();
        campoEmailRecuperacao.focus();
    });

    botaoVoltarLogin.addEventListener("click", function() {
        formRecuperacaoSenha.hidden = true;
        areaLogin.hidden = false;
        tituloFormulario.textContent = "Login";
        mensagemRecuperacao.textContent = "";
        document.getElementById("emailLogin").focus();
    });

    formRecuperacaoSenha.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailSalvo = localStorage.getItem("email");
        if (!emailSalvo || campoEmailRecuperacao.value !== emailSalvo) {
            mensagemRecuperacao.textContent = "Não encontramos um cadastro com esse email.";
            mensagemRecuperacao.style.color = "red";
            return;
        }

        if (campoNovaSenha.value !== campoConfirmarNovaSenha.value) {
            mensagemRecuperacao.textContent = "As senhas não coincidem.";
            mensagemRecuperacao.style.color = "red";
            return;
        }

        localStorage.setItem("senha", campoNovaSenha.value);
        mensagemRecuperacao.textContent = "Senha atualizada. Volte ao login para entrar.";
        mensagemRecuperacao.style.color = "green";
        formRecuperacaoSenha.reset();
        mostrarAlerta("Senha atualizada com sucesso!");
    });
    document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const telefoneInput = document.getElementById("telefone");
  const formContato = document.getElementById("formContato");
  const statusEnvio = document.getElementById("statusEnvio");
  const btnEnviar = document.getElementById("btnEnviar");

  // 1. Máscara automática de Telefone
  telefoneInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = v;
  });

  // 2. API ViaCEP (Busca automática de endereço ao digitar o CEP)
  cepInput.addEventListener("input", async (e) => {
    let cep = e.target.value.replace(/\D/g, "");
    
    // Formata 00000-000
    if (cep.length > 5) {
      e.target.value = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    if (cep.length === 8) {
      try {
        document.getElementById("cidade").value = "Buscando...";
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          document.getElementById("cidade").value = `${data.localidade} - ${data.uf}`;
          document.getElementById("endereco").value = `${data.logradouro}, ${data.bairro}`;
        } else {
          document.getElementById("cidade").value = "CEP não encontrado";
        }
      } catch (error) {
        console.error("Erro na API ViaCEP:", error);
        document.getElementById("cidade").value = "Erro ao buscar CEP";
      }
    }
  });

  // 3. API de Envio de Formulário (Fetch API via FormSubmit)
  // Troque 'seu-email@infratech.com.br' pelo e-mail real da empresa
  const ENDPOINT_API = "https://formsubmit.co/ajax/seu-email@infratech.com.br";

  formContato.addEventListener("submit", async (e) => {
    e.preventDefault();

    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";
    statusEnvio.className = "status-envio";
    statusEnvio.style.display = "none";

    // Coleta os dados do formulário
    const formData = new FormData(formContato);
    const dados = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(ENDPOINT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        statusEnvio.textContent = "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.";
        statusEnvio.classList.add("sucesso");
        formContato.reset();
      } else {
        throw new Error("Falha no servidor");
      }
    } catch (error) {
      statusEnvio.textContent = "Não foi possível enviar a mensagem agora. Tente novamente mais tarde.";
      statusEnvio.classList.add("erro");
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Enviar Mensagem";
    }
  });
});
}
