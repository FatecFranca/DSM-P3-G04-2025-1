const fetch = require('node-fetch');
const fs = require('fs');
const { Octokit } = require('@octokit/core');

// Substitua com seu token Figma e ID do arquivo
const figmaToken = 'seu-token-figma';
const figmaFileId = 'id-do-seu-arquivo';
const githubToken = 'seu-token-github';
const githubRepo = 'usuario/repositorio';

async function downloadFigmaFile() {
  const response = await fetch(`https://api.figma.com/v1/files/${figmaFileId}`, {
    method: 'GET',
    headers: {
      'X-Figma-Token': figmaToken,
    },
  });

  const data = await response.json();
  const imageUrl = data.document.children[0].children[0].styles[0].image;

  // Aqui você pode salvar a imagem no disco ou enviar diretamente para o GitHub
  const imageResponse = await fetch(imageUrl);
  const buffer = await imageResponse.buffer();
  fs.writeFileSync('figma-file.png', buffer);
  console.log('Ficheiro baixado com sucesso!');
}

async function uploadToGithub() {
  const octokit = new Octokit({ auth: githubToken });

  const content = fs.readFileSync('figma-file.png', { encoding: 'base64' });

  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'usuario',
    repo: githubRepo,
    path: 'figma-file.png',
    message: 'Adicionando arquivo do Figma',
    content: content,
  });

  console.log('Arquivo enviado para o GitHub!');
}

async function run() {
  await downloadFigmaFile();
  await uploadToGithub();
}

run();
