async function executarGeracao(tituloFilme) {
    const prompt = `Gere uma sinopse do filme \"${tituloFilme}\" de forma resumida, sem muitos spoilers em até 200 palavras`;

    try {
        const resposta = await fetch("https://backendt4web.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao chamar o backend");
        }

        const dados = await resposta.json();
        return dados.candidates[0].content.parts[0].text;
    } catch (erro) {
        console.error("Erro ao gerar texto:", erro);
        return "Falha ao gerar sinopse com o Gemini.";
    }
}

export { executarGeracao };
