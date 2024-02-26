function main() {
    fetch('/adminpage/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.body.innerHTML = data.mensagem
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
        });
}
window.onload = main