
# API FEEDBACKS

Api criado do zero para um sistema de troca de feedbacks!

# TECNOLOGIAS

Esse projeto está sendo desenvolvida com nodejs x express e mongodb x mongoose 

# !IMPORTANTE {
    # node i  => para instalar as dependencias
    # npm run dev => para rodar
    # A tabela inbox é preenchiada automaticamente apartir do mmomento que faz um send
    # Criar pasta .env com as seguintes variaveis
    {
        - DB_CONNECT_KEY = conectar com banco
        - SALT_KEY = chave
        - EMAIL_CODES = senha email
        - EMAIL= email para enviar
    }
}


# Rotas

## Users {
    # GET
    localhost:3000/users
    # GET BY ID
    localhost:3000/users/:id
    # UPDATE
    localhost:3000/users/update/:id
    # LOGIN & SIGNUP
    localhost:3000/users/signup
    localhost:3000/users/login
    # DELETE
    localhost:3000/users/:id

}

## Sends  {
    # GET
    localhost:3000/sends
    # GET BY ID
    localhost:3000/sends/:id
    # UPDATE
    localhost:3000/sends/:id
    # DELETE
    localhost:3000/sends/:id

}

## Inboxes  {
    # GET
    localhost:3000/inboxes
    # GET BY ID
    localhost:3000/inboxes/:id
    # DELETE
    localhost:3000/inboxes/:id

}

