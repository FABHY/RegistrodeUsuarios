document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "" || senha === "") {
        mensagem.textContent = "Por favor, preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    try {
        let response = await fetch("http://localhost:5001/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        let data = await response.json();

        if (response.ok) {
            mensagem.textContent = data.message;
            mensagem.style.color = "green";
            document.getElementById("cadastroForm").reset();
        } else {
            mensagem.textContent = data.error;
            mensagem.style.color = "red";
        }
    } catch (error) {
        mensagem.textContent = "Erro ao conectar ao servidor!";
        mensagem.style.color = "red";
    }
});
