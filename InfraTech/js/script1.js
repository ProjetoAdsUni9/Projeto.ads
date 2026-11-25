
// ==========================================
// 1. MODAL DE ALERTA PERSONALIZADO
// ==========================================

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

caixaAlerta.append(
    iconeAlerta,
    tituloAlerta,
    textoAlerta,
    botaoAlerta
);

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

    tituloAlerta.textContent =
        tipo === "erro" ? "Não foi possível entrar" : "Sucesso!";

    iconeAlerta.textContent =
        tipo === "erro" ? "!" : "✓";

    alertaSucesso.classList.toggle(
        "alerta-erro",
        tipo === "erro"
    );

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


// ==========================================
// 2. MOSTRAR / OCULTAR SENHA
// ==========================================

document.querySelectorAll(".alternar-senha").forEach(function(opcao) {

    function atualizarVisibilidade() {
        const tipo = opcao.checked ? "text" : "password";

        const campos = (opcao.dataset.campos || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        campos.forEach(function(idCampo) {
            const campo = document.getElementById(idCampo);

            if (campo) {
                campo.type = tipo;
            }
        });
    }

    opcao.addEventListener("change", atualizarVisibilidade);

    const formPai = opcao.closest("form");

    if (formPai) {
        formPai.addEventListener("reset", function() {
            opcao.checked = false;
            atualizarVisibilidade();
        });
    }
});


// ==========================================
// 3. CADASTRO
// ==========================================

const formulario = document.getElementById("formCadastro");

if (formulario) {

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha =
            document.getElementById("confirmarSenha").value;

        const mensagem = document.getElementById("mensagem");

        if (senha !== confirmarSenha) {
            if (mensagem) {
                mensagem.textContent = "As senhas não coincidem!";
                mensagem.style.color = "red";
            }
            return;
        }

        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("senha", senha);

        if (mensagem) {
            mensagem.textContent = "Cadastro realizado com sucesso!";
            mensagem.style.color = "green";
        }

        mostrarAlerta("Cadastro realizado com sucesso!");
    });
}


// ==========================================
// 4. LOGIN
// ==========================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailDigitado =
            document.getElementById("emailLogin").value.trim();

        const senhaDigitada =
            document.getElementById("senhaLogin").value;

        const emailSalvo = localStorage.getItem("email");
        const senhaSalva = localStorage.getItem("senha");

        const mensagem = document.getElementById("mensagemLogin");

        if (
            emailDigitado === emailSalvo &&
            senhaDigitada === senhaSalva &&
            emailSalvo !== null
        ) {
            if (mensagem) {
                mensagem.textContent = "Login realizado com sucesso!";
                mensagem.style.color = "green";
            }

            mostrarAlerta("Login realizado com sucesso!");

        } else {

            if (mensagem) {
                mensagem.textContent =
                    "Dados incorretos ou não cadastrados.";

                mensagem.style.color = "red";
            }

            mostrarAlerta(
                "Dados incorretos ou não cadastrados.",
                "erro"
            );
        }
    });
}


// ==========================================
// 5. RECUPERAÇÃO DE SENHA
// ==========================================

const areaLogin = document.getElementById("areaLogin");

const formRecuperacaoSenha =
    document.getElementById("formRecuperacaoSenha");

if (areaLogin && formRecuperacaoSenha) {

    const tituloFormulario =
        document.getElementById("tituloFormulario");

    const botaoEsqueciSenha =
        document.getElementById("botaoEsqueciSenha");

    const botaoVoltarLogin =
        document.getElementById("botaoVoltarLogin");

    const campoEmailRecuperacao =
        document.getElementById("emailRecuperacao");

    const campoNovaSenha =
        document.getElementById("novaSenha");

    const campoConfirmarNovaSenha =
        document.getElementById("confirmarNovaSenha");

    const mensagemRecuperacao =
        document.getElementById("mensagemRecuperacao");

    if (
        botaoEsqueciSenha &&
        botaoVoltarLogin &&
        campoEmailRecuperacao &&
        campoNovaSenha &&
        campoConfirmarNovaSenha &&
        mensagemRecuperacao
    ) {

        botaoEsqueciSenha.addEventListener("click", function() {

            areaLogin.hidden = true;
            formRecuperacaoSenha.hidden = false;

            if (tituloFormulario) {
                tituloFormulario.textContent = "Redefinir senha";
            }

            mensagemRecuperacao.textContent = "";

            formRecuperacaoSenha.reset();

            campoEmailRecuperacao.focus();
        });


        botaoVoltarLogin.addEventListener("click", function() {

            formRecuperacaoSenha.hidden = true;
            areaLogin.hidden = false;

            if (tituloFormulario) {
                tituloFormulario.textContent = "Login";
            }

            mensagemRecuperacao.textContent = "";

            const emailLogin =
                document.getElementById("emailLogin");

            if (emailLogin) {
                emailLogin.focus();
            }
        });


        formRecuperacaoSenha.addEventListener("submit", function(event) {

            event.preventDefault();

            const emailSalvo = localStorage.getItem("email");

            if (
                !emailSalvo ||
                campoEmailRecuperacao.value.trim() !== emailSalvo
            ) {
                mensagemRecuperacao.textContent =
                    "Não encontramos um cadastro com esse email.";

                mensagemRecuperacao.style.color = "red";
                return;
            }

            if (
                campoNovaSenha.value !==
                campoConfirmarNovaSenha.value
            ) {
                mensagemRecuperacao.textContent =
                    "As senhas não coincidem.";

                mensagemRecuperacao.style.color = "red";
                return;
            }

            localStorage.setItem("senha", campoNovaSenha.value);

            mensagemRecuperacao.textContent =
                "Senha atualizada. Volte ao login para entrar.";

            mensagemRecuperacao.style.color = "green";

            formRecuperacaoSenha.reset();

            mostrarAlerta("Senha atualizada com sucesso!");
        });
    }
}


// ==========================================
// 6. CONTATO, MÁSCARAS E API VIACEP
// ==========================================

const cepInput = document.getElementById("cep");
const telefoneInput = document.getElementById("telefone");

const formContato = document.getElementById("formContato");

const statusEnvio = document.getElementById("statusEnvio");

const btnEnviar = document.getElementById("btnEnviar");


// MÁSCARA DE TELEFONE

if (telefoneInput) {

    telefoneInput.addEventListener("input", function(e) {

        let v = e.target.value.replace(/\D/g, "").slice(0, 11);

        if (v.length > 10) {
            v = v.replace(
                /^(\d{2})(\d{5})(\d{4}).*/,
                "($1) $2-$3"
            );
        } else if (v.length > 6) {
            v = v.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
        }

        e.target.value = v;
    });
}


// MÁSCARA E CONSULTA DE CEP

if (cepInput) {

    let consultaAtual = 0;

    cepInput.addEventListener("input", async function(e) {

        let cep = e.target.value.replace(/\D/g, "").slice(0, 8);

        e.target.value = cep.length > 5
            ? cep.replace(/^(\d{5})(\d)/, "$1-$2")
            : cep;

        const campoCidade = document.getElementById("cidade");
        const campoRua = document.getElementById("rua");
        const campoBairro = document.getElementById("bairro");

        if (!campoCidade || !campoRua || !campoBairro) {
            console.error("Verifique os IDs dos campos no HTML.");
            return;
        }

        consultaAtual++;
        const numeroConsulta = consultaAtual;

        if (cep.length < 8) {
            campoCidade.value = "";
            campoRua.value = "";
            campoBairro.value = "";
            return;
        }

        try {

            campoCidade.value = "Buscando...";
            campoRua.value = "";
            campoBairro.value = "";

            const response = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            if (!response.ok) {
                throw new Error("Erro na consulta do CEP");
            }

            const data = await response.json();

            // Impede uma consulta antiga de sobrescrever a mais recente
            if (numeroConsulta !== consultaAtual) {
                return;
            }

            if (data.erro) {

                campoCidade.value = "";
                campoRua.value = "";
                campoBairro.value = "";

                alert("CEP não encontrado!");
                return;
            }

            campoCidade.value =
                `${data.localidade} - ${data.uf}`;

            campoRua.value = data.logradouro || "";
            campoBairro.value = data.bairro || "";

            const campoNumero =
                document.getElementById("numero");

            if (campoNumero) {
                campoNumero.focus();
            }

        } catch (error) {

            if (numeroConsulta !== consultaAtual) {
                return;
            }

            console.error("Erro na API ViaCEP:", error);

            campoCidade.value = "";
            campoRua.value = "";
            campoBairro.value = "";

            alert("Não foi possível consultar o CEP. Verifique sua conexão.");
        }
    });
}


// ==========================================
// 7. ENVIO DO FORMULÁRIO DE CONTATO
// ==========================================

if (formContato) {

    const ENDPOINT_API =
        "https://formsubmit.co/ajax/projetoadsuni9@gmail.com";

    formContato.addEventListener("submit", async function(e) {

        e.preventDefault();

        if (!btnEnviar || !statusEnvio) {
            console.error("Verifique os IDs btnEnviar e statusEnvio no HTML.");
            return;
        }

        btnEnviar.disabled = true;
        btnEnviar.textContent = "Enviando...";

        statusEnvio.className = "status-envio";
        statusEnvio.style.display = "none";

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

            if (!response.ok) {
                throw new Error("Falha no servidor");
            }

            const resultado = await response.json();

            if (
                resultado.success === false ||
                resultado.success === "false"
            ) {
                throw new Error("Falha no envio");
            }

            statusEnvio.textContent =
                "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.";

            statusEnvio.classList.add("sucesso");
            statusEnvio.style.display = "block";

            formContato.reset();

        } catch (error) {

            console.error("Erro ao enviar:", error);

            statusEnvio.textContent =
                "Não foi possível enviar a mensagem. Tente novamente mais tarde.";

            statusEnvio.classList.add("erro");
            statusEnvio.style.display = "block";

        } finally {

            btnEnviar.disabled = false;
            btnEnviar.textContent = "Enviar Mensagem";
        }
    });
}
