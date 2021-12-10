# Ignite Node RentX

# Cadastro de Carro

**RF**

- [x] Deve ser possível cadastrar um novo carro no sistema.

**RN**

- [x] Não deve ser possível cadastrar um carro com a mesma **placa**.
- [x] O carro deve ser cadastrado com disponibilidade **true** por padrão.
- [x] O usuário responsável pelo cadastro deve ser um usuário **admin**.

# Listagem de carros

**RF**

- [x] Deve ser possível todos os carros disponíveis para locação.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

- [x] O usuário não precisa estar logado para listar os carros disponíveis.

# Cadastro de especificação no carro

**RF**

- [x] Deve ser possível cadastrar uma nova especificação para um carro.

**RN**

- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação duplicada para um mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário **admin**.

# Cadastro de imagens do carro

**RF**

- [x] Deve ser possível cadastrar uma nova imagem para um carro.

**RNF**

- [x] Utilizar o multer para upload dos arquivos.

**RN**

- [x] O usuário deve poder cadastrar mais de uma imagem para um mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário **admin**.

# Aluguel de carro

**RF**

- [x] Deve ser possível cadastrar um aluguel.

**RN**

- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um aluguel para um carro indisponível.
- [x] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
- [x] O usuário deve estar logado.
