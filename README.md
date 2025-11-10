## Rodar o projeto
```bash
# clonar o repositório e entrar na pasta
git clone git@github.com:cassimirodev/financial-content-maker.git
cd financial-content-maker

# build e subir serviços
docker compose up -d --build

# instalar dependências PHP (dentro do serviço app)
docker compose exec app composer install

# rodar migrations e seeders
docker compose exec app php artisan migrate 
```

# Endpoints

- para acessar os endpoints do servico de agentes:
  
[http://localhost:8001/helthz](http://localhost:8001/helthz)


[http://localhost:8001/docs](http://localhost:8001/docs)

- para acessar o laravel


[https://localhost/](https://localhost/)



