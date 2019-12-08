# CONNECTION

Connection é uma API REST feita em NODEJS + EXPRESS para cadastro de atendimentos.

Dependencias:<br>
  [x] body-parser <br>
  [x] consign <br>
  [x] cpf<br>
  [x] express<br>
  [x] moment<br>
  [x] mysql

Tipos de requisições:<br>
  GET: /attendances <- Retorna todos os registros cadastrados<br>
  GET: /attendance/(id) <- Retorna um registro passando o ID do mesmo<br>
  DELETE: /attendance/(id) <- Deleta o registro passando o ID do mesmo<br>
  PATCH: /attendance/(id) <- Edição do registro cadastrado<br>
  POST: /attendances <- Cadastro do atendimento<br>
