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

async function executarGeracao(tituloFilme) {
    const apiKey = "AIzaSyCEtxAo0z5gq8AtMEbc7HRXpX5ictf1HbE"; // desisti de esconder a chave no backend, tenho pouco tempo esse final de semstre
    const prompt = `Gere uma sinopse do filme \"${tituloFilme}\" de forma resumida, sem muitos spoilers em até 200 palavras`;

    try {
        const resultado = await gerarTexto(prompt, apiKey);
        return resultado;
    } catch (erro) {
        console.error("Erro ao gerar texto:", erro);
        return "Falha ao gerar sinopse com o Gemini."
    }
}

export {executarGeracao };