<div align="center">
  <img src="backend-laravel/public/frontend/img/jcpe_logo-gh.png" alt="Logo JCPE" width="250"/>
  
  # Financial Content Maker
  **Automação de Jornalismo Financeiro com Agentes de IA**
    

  <p align="center">
    Uma plataforma que utiliza Agentes de IA para coletar dados do mercado financeiro em tempo real e redigir notícias jornalísticas completas, seguindo o molde editorial do Jornal do Commercio.
  </p>

   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" width=40/>
    <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.74.0/files/dark/crewai-color.png" width=40/>
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" width=40 />
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"width=40 />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" width=40 />
     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" width=40 />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width=40 />  
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width=40 />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width=40 />
          
          

</div>

---

# Sobre o Projeto

Este projeto segue a proposta sugerida: Criar um grupo de agentes de inteligência artificial para analisar ações e gerar conteúdos recomendando (ou não) a compra, com base em dados reais e percepção de mercado.

    Júlia: coleta os dados financeiros atualizados via Yahoo Finance.
    Pedro: analisa o que o mercado e a mídia estão dizendo sobre a empresa.
    Key: jornalista experiente que redige o conteúdo final, com base nos dados dos outros dois.
    Fator humano: revisa e aprova o conteúdo antes da publicação.

O objetivo é produzir matérias financeiras claras, confiáveis e baseadas em dados, com apoio de IA e curadoria humana.



# Arquitetura do Sistema

O sistema é composto por 3 containers principais orquestrados via Docker Compose:

| Serviço | Tecnologia | Responsabilidade |
| :--- | :--- | :--- |
| **Backend API** | Laravel e PHP| Gestão de usuários, CRUD de conteúdos, Autenticacão e disparo de Jobs. |
| **Worker** | Laravel Queue | Processamento em segundo plano. Consome a fila, executa as tasks chamando o Serviço de agentes. |
| **Agente IA** | Python (CrewAI) | Coleta dados, analisa sentimento e escreve o texto. |
| **Banco de Dados** | MySQL 5.7 | Persistência de dados |

---

#  Como Rodar

- Clone o repositório:
```bash
git clone git@github.com:cassimirodev/financial-content-maker.git
cd financial-content-maker
```

- Crie os `.env` em '/analyzer_agents' e '/backend-laravel' seguindo `.env.example`

- Subir containers:
```bash
docker compose up -d --build
```

Obs: se estiver no codespaces, rode `docker login` antes. 

- Instale as dependências
```bash
docker exec backend-laravel composer install 
```

- Gere a encryption key para seu projeto
```bash
docker exec backend-laravel php artisan key:generate
```

- Rode as migrações para gerar o schema do banco
```bash
docker exec backend-laravel php artisan migrate --seed
```

# Acessar o projeto


Para acessar a interface visual: 

```bash 
 # CODESPACES: Mude a porta para public, abra a URL e coloque /frontend/index.html no fim da url.

 # Localhost: acesse a porta 8080 no localhost e /frontend/index.html no fim da url.
```

## Estrutura do repositório
Abaixo a estrutura principal do projeto:

```
├── README.md
├── analyzer_agents
│   ├── Dockerfile
│   ├── pyproject.toml
│   ├── src
│   └── tests
├── backend-laravel
│   ├── Dockerfile
│   ├── README.md
│   ├── app
│   ├── artisan
│   ├── bootstrap
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   ├── database
│   ├── docker
│   ├── package.json
│   ├── phpunit.xml
│   ├── public
│   ├── resources
│   ├── routes
│   ├── storage
│   ├── tests
│   ├── vendor
│   └── vite.config.js
├── docker-compose.yaml
└── package-lock.json
```

# Equipe 2 - Residência

Integrantes da equipe:
- [Eduardo](https://github.com/cassimirodev) 
- [Gabrielly](https://github.com/Ghabrielly)
- [Ana Paula](https://github.com/paulalemos-bt)
- [Ihcaro](https://github.com/Ihcarog)










