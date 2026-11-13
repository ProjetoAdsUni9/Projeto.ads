const botaoMenu = document.getElementById("botaoMenu"); 
const lateral = document.getElementById("lateral"); 
 
// Alterna a abertura e fechamento do menu 
botaoMenu.addEventListener("click", function() { 
lateral.classList.toggle("ativo"); 
});