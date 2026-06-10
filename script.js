

const btnTema = document.getElementById('btnTema');
const body = document.body;


const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'claro') {
  body.classList.add('modo-claro');
  btnTema.textContent = '🌙 Modo Escuro';
}

btnTema.addEventListener('click', () => {
  body.classList.toggle('modo-claro');

  const modoAtivo = body.classList.contains('modo-claro');
  btnTema.textContent = modoAtivo ? '🌙 Modo Escuro' : '☀️ Modo Claro';
  localStorage.setItem('tema', modoAtivo ? 'claro' : 'escuro');
});



const form = document.getElementById('formContato');
const mensagemSucesso = document.getElementById('mensagemSucesso');

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const nome = document.getElementById('inputNome').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const mensagem = document.getElementById('inputMensagem').value.trim();

  
  if (nome === '') {
    mostrarErro('inputNome', 'Por favor, insira seu nome.');
    return;
  } else {
    limparErro('inputNome');
  }

  if (email === '' || !email.includes('@')) {
    mostrarErro('inputEmail', 'Por favor, insira um e-mail válido.');
    return;
  } else {
    limparErro('inputEmail');
  }

  if (mensagem === '') {
    mostrarErro('inputMensagem', 'Por favor, escreva sua mensagem.');
    return;
  } else {
    limparErro('inputMensagem');
  }

  
  form.reset();
  mensagemSucesso.style.display = 'block';

  
  setTimeout(() => {
    mensagemSucesso.style.display = 'none';
  }, 4000);
});

function mostrarErro(id, texto) {
  const campo = document.getElementById(id);
  campo.classList.add('campo-erro');

  
  const erroAntigo = campo.nextElementSibling;
  if (erroAntigo && erroAntigo.classList.contains('texto-erro')) {
    erroAntigo.remove();
  }

  const erro = document.createElement('span');
  erro.classList.add('texto-erro');
  erro.textContent = texto;
  campo.insertAdjacentElement('afterend', erro);
}

function limparErro(id) {
  const campo = document.getElementById(id);
  campo.classList.remove('campo-erro');

  const erroAntigo = campo.nextElementSibling;
  if (erroAntigo && erroAntigo.classList.contains('texto-erro')) {
    erroAntigo.remove();
  }
}