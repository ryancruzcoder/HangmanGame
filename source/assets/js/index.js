const divRecomecar = document.getElementById("info-para-recomecar")
const divJogo = document.getElementById("container")
const btnIniciar = document.getElementById("iniciar")
const btnRecomecar = document.getElementById("recomecar")
const formToIniciar = document.getElementById("formulario-para-iniciar")
const tema = document.getElementById("tema")
const divDaPalavraMisteriosa = document.getElementById("palavra-misteriosa")
const titleFormReplay = document.getElementById("titulo-das-infos")
const spanErros = document.getElementById("quant-de-erros")
let letrasFaladas = []
let errosMax
let PalavraMisteriosa
formToIniciar.addEventListener("submit", function(e){
    e.preventDefault()
    let valPalavra = document.getElementById("info-palavra-misteriosa").value
    let valTema = document.getElementById("info-tema-palavra-misteriosa").value
    valPalavra = valPalavra.trim()
    valPalavra = valPalavra.replace(/[^a-zA-Z]/g, '')
    valTema = valTema.trim()
    valTema = valTema.replace(/[^a-zA-Z]/g, '')
    if (!valPalavra){
        let aviso = document.getElementById("aviso-info-palavra")
        aviso.innerText = "Palavra Inválida!"            
    } else if (!valTema){
        let aviso = document.getElementById("aviso-info-tema")
        aviso.innerText = "Tema Inválido!" 
    } else {
        errosMax = Number(document.getElementById("info-quant-de-erros").value)
        tema.innerText = valTema
        PalavraMisteriosa = valPalavra.toUpperCase()
        divRecomecar.style.display = "none"
        divJogo.style.display = "flex"
    }
    iniciarJogo()

})
function iniciarJogo() {
    letrasFaladas = []
    let letrasdoAlfa = document.querySelectorAll("span.letra-do-alfabeto")
    divDaPalavraMisteriosa.innerHTML = ""
    for (letra of PalavraMisteriosa){
        divDaPalavraMisteriosa.innerHTML += "<span class='letra-da-palavra'>ㅤ</span>"
    }
    for (letra of letrasdoAlfa){
        letra.addEventListener("click", function(e){
            colocarLetra(e.target.textContent)
        })
    }
}
function colocarLetra(l){
    if (letrasFaladas.indexOf(l) === -1){
        letrasFaladas.push(l)
    }
    let tem = 0
    let letrasAcertadas = 0
    divDaPalavraMisteriosa.innerHTML = ""
    for (letra of PalavraMisteriosa){
        for (i of letrasFaladas){
            if (i === letra){
                divDaPalavraMisteriosa.innerHTML += `<span class='letra-da-palavra'>${i}</span>`
                tem = 1
                letrasAcertadas += 1
            } 
        }
        
        if (!tem){
            divDaPalavraMisteriosa.innerHTML += "<span class='letra-da-palavra'>ㅤ</span>"
        } 
        tem = 0
    }
    if (PalavraMisteriosa.indexOf(l) === -1){
        
        let quantErros = Number(spanErros.textContent)
        spanErros.innerHTML = `${quantErros + 1}`
        if ((quantErros + 1) === Number(errosMax)){
            titleFormReplay.innerText = "GAME OVER"
            divRecomecar.style.display = "flex"
            divJogo.style.display = "none"
            spanErros.innerHTML = `0`
            
        }
    } 0
    if (letrasAcertadas === PalavraMisteriosa.length){
        titleFormReplay.innerText = "GAME WIN"
        divRecomecar.style.display = "flex"
        divJogo.style.display = "none"
        spanErros.innerHTML = `0`
    }
}
function reiniciar(){
    divRecomecar.style.display = "flex"
    divJogo.style.display = "none"
    window.onload()
    titleFormReplay.innerText = "O JOGO DA FORCA"
}
