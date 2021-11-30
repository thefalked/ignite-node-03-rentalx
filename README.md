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

- [ ] Deve ser possível todos os carros disponíveis para locação.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

- [x] O usuário não precisa estar logado para listar os carros disponíveis.

# Cadastro de especificação no carro

**RF**

- [ ] Deve ser possível cadastrar uma nova especificação para unm carro.
- [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

**RN**

- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação duplicada para um mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário **admin**.

# Cadastro de imagens do carro

**RF**

- [ ] Deve ser possível cadastrar uma nova imagem para um carro.

**RNF**

- [ ] Utilizar o multer para upload dos arquivos.

**RN**

- [ ] O usuário deve poder cadastrar mais de uma imagem para um mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário **admin**.

# Aluguel de carro

**RF**

- [ ] Deve ser possível cadastrar um aluguel.

**RN**

- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível cadastrar um aluguel para um carro indisponível.
- [ ] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
