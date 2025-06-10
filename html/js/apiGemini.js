async function gerarTexto(prompt, apiKey) {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Teste:
async function executarGeracao() {
    const apiKey = ""; // (removi para não expor no historico de commits, mas esta funcionando, agora estou vendo como esconder a chave)
    const prompt = "Escreva apenas \"Olá mundo!\", sem mais nada.";

    try {
        const resultado = await gerarTexto(prompt, apiKey);
        console.log("Resposta da Gemini:", resultado);
    } catch (erro) {
        console.error("Erro ao gerar texto:", erro);
    }
}

export { gerarTexto, executarGeracao };