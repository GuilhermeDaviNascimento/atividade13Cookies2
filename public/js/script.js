const usersinput = document.getElementsByName('user')[0]
const senha = document.getElementsByName('pass')[0];
const csenha = document.getElementsByName('cpass')[0];
const emailinput = document.getElementsByName('email')[0];

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: usersinput.value,
        email: emailinput.value,
        pass: senha.value,
        cpass: csenha.value
      })
  };

  fetch('/createaccount', options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao fazer requisição: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          if (data.mensagem === 'Usuário existente'){
            alert(data.mensagem);
          } else if (data.mensagem === "Email já cadastrado") {
            alert(data.mensagem);
          } else if (data.mensagem === "Senha diferente") {
            alert(data.mensagem);
          }
          else {
            window.location.assign('/login')
          }
      })
      .catch(error => {
          console.error(error);
      });
});