const botaoConverter = document.querySelector(".botao-converter");
const moedaSelecionadaConverter = document.querySelector(".moeda-selecionada-converter");
const moedaSelecionadaConvertida = document.querySelector(".moeda-selecionada-convertida");

// Variáveis para armazenar as taxas de câmbio
let taxasDeCambio = {};

// Função para buscar as taxas de câmbio em tempo real
async function buscarTaxasDeCambio() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,USD-EUR");
        const dados = await response.json();
        taxasDeCambio.realDolarDia = parseFloat(dados.USDBRL.bid); // BRL -> USD
        taxasDeCambio.realEuroDia = parseFloat(dados.EURBRL.bid); // BRL -> EUR
        taxasDeCambio.dolarRealDia = 1 / taxasDeCambio.realDolarDia; // USD -> BRL
        taxasDeCambio.dolarEuroDia = parseFloat(dados.USDEUR.bid); // USD -> EUR
        taxasDeCambio.euroRealDia = 1 / taxasDeCambio.realEuroDia; // EUR -> BRL
        taxasDeCambio.euroDolarDia = 1 / taxasDeCambio.dolarEuroDia; // EUR -> USD
    } catch (error) {
        console.error("Erro ao buscar as taxas de câmbio:", error);
    }
}

// Função de conversão
function converterValor() {
    const valorConverter = document.querySelector(".input-valor-converter").value;
    const valorMoedaConverter = document.querySelector(".valor-moeda-converter");
    const valorMoedaConvertida = document.querySelector(".valor-moeda-convertida");

    if (!taxasDeCambio.realDolarDia) {
        alert("Erro ao carregar as taxas de câmbio.");
        return;
    }

    if (moedaSelecionadaConverter.value == "real" && moedaSelecionadaConvertida.value == "dolar") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConverter / taxasDeCambio.realDolarDia);
    }

    if (moedaSelecionadaConverter.value == "real" && moedaSelecionadaConvertida.value == "euro") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorConverter / taxasDeCambio.realEuroDia);
    }

    if (moedaSelecionadaConverter.value == "dolar" && moedaSelecionadaConvertida.value == "real") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorConverter / taxasDeCambio.dolarRealDia);
    }

    if (moedaSelecionadaConverter.value == "dolar" && moedaSelecionadaConvertida.value == "euro") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorConverter / taxasDeCambio.dolarEuroDia);
    }

    if (moedaSelecionadaConverter.value == "euro" && moedaSelecionadaConvertida.value == "real") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorConverter / taxasDeCambio.euroRealDia);
    }

    if (moedaSelecionadaConverter.value == "euro" && moedaSelecionadaConvertida.value == "dolar") {
        valorMoedaConverter.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorConverter);
        valorMoedaConvertida.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConverter / taxasDeCambio.euroDolarDia);
    }
}

// Função para atualizar o nome e a imagem da moeda de origem
function trocarMoedaconverter() {
    const nomeMoedaConverter = document.getElementById("nome-moeda-converter");
    const imagemMoedaConverter = document.querySelector(".imagem-moeda-converter");

    if (moedaSelecionadaConverter.value == "dolar") {
        nomeMoedaConverter.innerHTML = "Dólar Americano";
        imagemMoedaConverter.src = "./assets/dolar.png";
    }

    if (moedaSelecionadaConverter.value == "euro") {
        nomeMoedaConverter.innerHTML = "Euro";
        imagemMoedaConverter.src = "./assets/euro.png";
    }

    if (moedaSelecionadaConverter.value == "real") {
        nomeMoedaConverter.innerHTML = "Real";
        imagemMoedaConverter.src = "./assets/real.png";
    }
    converterValor();
}

// Função para atualizar o nome e a imagem da moeda de destino
function trocarMoedaconvertida() {
    const nomeMoedaConvertida = document.getElementById("nome-moeda-convertida");
    const imagemMoedaConvertida = document.querySelector(".imagem-moeda-convertida");

    if (moedaSelecionadaConvertida.value == "dolar") {
        nomeMoedaConvertida.innerHTML = "Dólar Americano";
        imagemMoedaConvertida.src = "./assets/dolar.png";
    }

    if (moedaSelecionadaConvertida.value == "euro") {
        nomeMoedaConvertida.innerHTML = "Euro";
        imagemMoedaConvertida.src = "./assets/euro.png";
    }

    if (moedaSelecionadaConvertida.value == "real") {
        nomeMoedaConvertida.innerHTML = "Real";
        imagemMoedaConvertida.src = "./assets/real.png";
    }
    converterValor();
}

// Atualiza as taxas ao carregar a página
window.addEventListener("load", buscarTaxasDeCambio);

// Adiciona eventos
moedaSelecionadaConverter.addEventListener("change", trocarMoedaconverter);
moedaSelecionadaConvertida.addEventListener("change", trocarMoedaconvertida);
botaoConverter.addEventListener("click", converterValor);

// Ação ao pressionar "Enter"
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("btn-converte").click();
    }
});