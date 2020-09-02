# Dragonslair

## Pré-requisitos

O projeto está publicado no Heroku clicando [aqui](https://dragons-lair-app.herokuapp.com/).
Precisa ter instalado o angular na versão 10.0.2 ou superior, 
para realizar a instalação da versão mais atualizada pode seguir os passos abaixo:

## Limpando o CLI
- npm uninstall -g angular-cli          # Remove global package
- npm uninstall --save-dev angular-cli  # Remove from package.json

- npm uninstall -g @angular/cli         # Remove global package
- npm uninstall --save-dev @angular/cli # Remove from package.json

## Atualizar o NPM
- npm install npm@latest -g

## Reinstalar o CLI atualizado
- npm install -g @angular/cli                # Global package
- npm install --save-dev @angular/cli        # Local package
- npm install                                # Restore removed dependencies

## Rodando o projeto

Para rodar o projeto basta digitar no cmd `npm start` e acessar no link `http://localhost:8080`.
Acessar com o login: `admin@southsystem.com` e senha `senha123`.

## Organização

O projeto foi organizado seguindo a style guide oficial do [Angular](https://angular.io/guide/styleguide#overall-structural-guidelines).

- `@core`: Onde ficam os serviços compartilhados;
- `@shared`: São as classes/components etc compartilhados no projeto;

- `dragons`: Pasta principal do módulo de Dragões, subdividida em:
- `dragon-details`: Componente responsável por exibir, editar e criar novos dragões;
- `dragon-list`: Componente responsável por exibir a lista de dragões e suas opções;
- `shared`: São as classes/serviços etc compartilhados neste módulo específico.

- `login`: Componente responsável por realizar o login no sistema.

## O que poderia melhorar?

- Os testes estão como padrão gerados com o CLI, poderiam ser mais completos;
- Criei um arquivo de animations, mas não tive tempo de implementar as animações de fade na troca de rotas;
- O serviço de tratamento de erros poderia ser mais completo;
