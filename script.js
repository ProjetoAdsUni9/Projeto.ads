const botaoMenu = document.getElementById ("botaoMenu");
const lateral = document.getElementById ("lateral");
botaoMenu.addEventListener("click",function(){
    lateral.classList.toggle("ativo");
});