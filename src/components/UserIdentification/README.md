# Componente UserIdentification (Identificação do Usuário)

Este componente é responsável por coletar e validar as informações de identificação do usuário no formulário. Ele utiliza HTML, CSS e JavaScript (Vanilla JS) para criar uma interface intuitiva e funcional.

## Funcionamento do Componente:

### Estrutura HTML:
- O código HTML define a estrutura do formulário, incluindo os campos de entrada (inputs, selects), labels e botões.
- O formulário é dividido em seções para facilitar a organização e a navegação.

### Estilização CSS:
- O CSS define o estilo visual do formulário, incluindo cores, fontes, tamanhos e posicionamento dos elementos.

### Lógica JavaScript:
- O JavaScript implementa as funcionalidades de validação, navegação entre seções e salvamento dos dados.

### Funções Principais:

- `validationRules`: Um objeto que define as regras de validação para cada campo do formulário. Cada regra é uma função que recebe o valor do campo e retorna true se o valor for válido ou uma mensagem de erro se o valor for inválido.
- `showError(inputId, message)`: Exibe uma mensagem de erro ao lado do campo correspondente.
- `validateFormData()`: Valida todos os campos do formulário e retorna true se todos forem válidos ou false se houver algum erro.
- `validateField(input)`: Valida um campo específico e exibe uma mensagem de erro se necessário.
- `validateSection(section)`: Valida todos os campos de uma seção específica.
- `setupFieldValidation()`: Configura a validação dos campos ao perder o foco (evento blur).
- `hideSectionsExceptFirst()`: Oculta todas as seções do formulário, exceto a primeira.
- `createNavigationContainer()`: Cria um container com os botões "Anterior" e "Próximo" para navegação entre seções.
- `setupNextButton()`: Configura o botão "Próximo" para exibir a próxima seção se a seção atual for válida.
- `setupPrevButton()`: Configura o botão "Anterior" para exibir a seção anterior.
- `adjustNavigationButtons()`: Ajusta a visibilidade dos botões de navegação de acordo com a seção atual.
- `setupButtonListeners()`: Configura os listeners para os eventos de clique nos botões de navegação.
- `saveFormData()`: Salva os dados do formulário no localStorage ao clicar no botão "Salvar".
- `mount()`: Carrega os dados salvos do localStorage e preenche os campos do formulário ao navegar para o componente.

### Fluxo de Execução:

- Ao carregar o componente, a função `postRender()` é executada.
- A função `postRender()` configura a validação dos campos, a navegação entre seções e o salvamento dos dados.
- O usuário preenche o formulário e navega entre as seções usando os botões "Anterior" e "Próximo".
- A validação é executada ao perder o foco de um campo e ao clicar no botão "Salvar".
- Ao clicar em "Salvar", os dados são validados e, se forem válidos, são armazenados no localStorage.
- Ao retornar ao componente, a função `mount()` é executada, carregando os dados salvos do localStorage e preenchendo os campos do formulário.

## Benefícios:

- **Validação de dados:** Garante que as informações coletadas sejam válidas e consistentes.
- **Navegação amigável:** Permite ao usuário navegar facilmente entre as seções do formulário.
- **Armazenamento local:** Salva os dados do usuário para que ele possa retornar ao formulário posteriormente sem perder suas informações.
- **Modularidade:** Facilita a manutenção e a expansão do formulário.

## Considerações:

- O componente UserIdentification é essencial para coletar as informações de identificação do usuário no formulário.
- As funções de validação garantem a qualidade dos dados coletados.
- A navegação amigável e o armazenamento local melhoram a experiência do usuário.
- A modularidade do componente facilita a manutenção e a expansão do formulário.