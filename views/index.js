import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
const app = express();
let upload = multer();


let users = [];

const addUser = (email, user, pass) => {
    const newConta = {
        email: email,
        user: user,
        pass: pass
    };
    users.push(newConta);
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/login', (req, res) => res.render('pages/login'));
app.get('/register', (req, res) => res.render('pages/register'));

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.post('/sucess', (req, res) => {
    if (users.find(login => login.user === req.body.user && login.pass === req.body.pass)) {
        res.render('pages/sucess')
        res.status(200)
    } else {
        res.render('pages/invalid')
        res.status(401)
    }
}
);
const isvalidpass = (pass, cpass) => {
    if (pass !== cpass) {
        return false
    } else {
        return true
    }
};

const isValidEmail = (email) => {
    if (users.some(login => login.email === email)) {
        return false
    } else {
        return true
    }
};

const isValidUser = (name) => {
    if (users.some(login => login.user === name)) {
        return false
    } else {
        return true
    }
};
function deleteUserByUsername(username) {
    const index = users.findIndex(user => user.user === username);
    
    if (index !== -1) {
        users.splice(index, 1);
        console.log(`Usuário ${username} deletado com sucesso.`);
    } else {
        console.log(`Usuário ${username} não encontrado.`);
    }
}
app.post('/createaccount', (req, res) => {
    let mensagem;
    if (isValidEmail(req.body.email) === false) {
        console.log(req.body.email)
        mensagem = "Email já cadastrado";
    } else if (isValidUser(req.body.user) === false) {
        mensagem = "Usuário existente";
    } else if (isvalidpass(req.body.pass, req.body.cpass) === false) {
        mensagem = "Senha diferente"
    } else {
        addUser(req.body.email, req.body.user, req.body.pass)
        mensagem = "Sucesso"
    }
    res.status(200).json({ mensagem: mensagem });
}
)

app.get('/adminpage', (req, res) => {
    res.render('pages/adminpage');
});

app.post('/adminpage/data', (req, res) => {
    let usuarios = '';
    users.forEach(login => {
        let label = `<div id="template"><div><label for="">Email:</label><label for="">${login.email}</label></div>
        <div><label for="">Username:</label><label for="">${login.user}</label></div>
        <button id="${login.user}" onclick="requesdelete('${login.user}')" type="button" class="btn btn-danger">Deletar</button>
        </div>`;
        usuarios += label;
    });
    res.status(200).json({ mensagem: usuarios });
});

app.post('/adminpage/delete', (req, res) => {
    try {
        deleteUserByUsername(req.body.username)
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => console.log('Server ready'));