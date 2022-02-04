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
- [x] Ao realizar o aluguel o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF**

- [x] Deve ser possível realizar a devolução de um carro.

**RN**

- [x] O usuário deve estar logado.
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liverado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de alugueis para usuários

**RF**

- [x] Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**

- [x] O usuário deve estar logado na aplicação.

# Recuperar Senha

**RF**

- [x] Deve ser possível o usuário recuperar a senha informando o e-mail.
- [x] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- [x] O usuário deve conseguir inserir uma nova senha.

**RN**

- [x] O usuário precisa informar uma nova senha.
- [x] O link enviado para a recuperação deve expirar em 3 horas.
