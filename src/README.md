# Formulário com Carregamento Dinâmico de Componentes

Este projeto demonstra um formulário web com carregamento dinâmico de componentes, construído com HTML, CSS e JavaScript puro (Vanilla JS). O objetivo é criar um formulário modular para o projeto, permitindo a adição e remoção de etapas de forma flexível.

## Funcionamento do `setupApp()`

A função `setupApp()` é responsável por inicializar a aplicação e gerenciar o carregamento dos componentes. Ela é executada quando o documento HTML é carregado (`DOMContentLoaded`).

### Passo a passo:

1. **Definição da Aplicação:**
   - Obtém o elemento container da aplicação (`appContainer`).
   - Cria um novo elemento div com o id `app` para armazenar os componentes.
   - Define uma lista `componentsToLoad` com os nomes dos componentes a serem carregados em ordem.
   - Inicializa o `currentIndex` como 0, indicando o componente atual.
   
2. **Gerenciamento de Eventos:**
   - Adiciona um listener para o evento `componentDataSaved`, que é disparado quando um componente salva seus dados.
   - No listener, verifica se o evento veio do componente atual e se há mais componentes para carregar.
   - Se as condições forem atendidas, incrementa o `currentIndex` e chama a função `loadNextComponent()` para carregar o próximo componente.
   
3. **Definição de Dependências e LocalStorages:**
   - Cria um objeto `componentDependencies` que mapeia cada componente para suas dependências (scripts externos).
   - Cria um objeto `componentsLocalStorages` que mapeia cada componente para uma chave no localStorage onde seus dados serão armazenados.
   
4. **Função `canNavigate()`:**
   - Verifica se é permitido navegar para um componente específico, com base na existência de dados no localStorage para aquele componente.
   - Se não houver dados, a navegação é impedida.
   
5. **Função `setupNavigationButtons()`:**
   - Cria botões "Avançar" e "Voltar" para navegar entre os componentes.
   - Adiciona listeners aos botões para:
     - Avançar: Incrementar o `currentIndex` e chamar `loadNextComponent()` se houver mais componentes para carregar e se a navegação for permitida.
     - Voltar: Decrementar o `currentIndex` e chamar `loadNextComponent()` se houver um componente anterior e se a navegação for permitida.
   - Antes de navegar para um novo componente, limpa o conteúdo do `appElement` para remover o componente anterior.
   
6. **Função `loadDependencies()`:**
   - Carrega as dependências (scripts externos) de um componente antes de carregá-lo.
   - Utiliza um contador para garantir que todas as dependências sejam carregadas antes de chamar o callback.
   
7. **Função `loadNextComponent()`:**
   - Carrega o próximo componente da lista `componentsToLoad`.
   - Chama `loadDependencies()` para carregar as dependências antes de carregar o componente.
   - Após carregar o componente, incrementa o `currentIndex`.
   
8. **Função `loadComponent()`:**
   - Limpa o conteúdo do `appElement`.
   - Busca o arquivo HTML do componente e o insere no `appElement`.
   - Carrega o arquivo CSS do componente.
   - Carrega o arquivo JavaScript do componente e executa a função `postRender()` (se existir) após o carregamento.
   - Se for uma navegação entre componentes, executa a função `mount()` do componente (se existir) para carregar dados do localStorage.
   
9. **Inicialização:**
   - Chama `setupNavigationButtons()` para criar os botões de navegação.
   - Chama `loadNextComponent()` para iniciar o carregamento do primeiro componente.

### Funções Auxiliares:

- `loadDependencies(dependencies, callback)`: Carrega as dependências de um componente antes de carregá-lo.
- `loadComponent(name, callback, isNavigation)`: Carrega um componente específico, incluindo seu HTML, CSS e JavaScript.
- `canNavigate(index)`: Verifica se é permitido navegar para um componente específico.

## Estrutura de Pastas:

- `src/components/`: Contém as pastas de cada componente, com seus respectivos arquivos HTML, CSS e JavaScript.
- `src/styles/`: Contém o arquivo `global.css` com estilos globais da aplicação.
- `src/index.html`: Arquivo principal HTML da aplicação.
- `src/index.js`: Arquivo principal JavaScript da aplicação, que chama a função `setupApp()`.

## Considerações:

- O uso de eventos como `componentDataSaved` permite que os componentes se comuniquem entre si e com a aplicação principal de forma desacoplada.
- O armazenamento de dados no localStorage permite que o usuário navegue entre os componentes e retorne posteriormente sem perder suas informações.
- A função `canNavigate()` adiciona uma camada de segurança, impedindo a navegação para componentes que não possuem dados salvos.
- A estrutura de pastas e a divisão em componentes tornam o código mais organizado e fácil de manter.
- Este projeto pode ser facilmente expandido para incluir mais componentes e funcionalidades.

## Melhorias Possíveis:

- Implementar um sistema de rotas para gerenciar a navegação de forma mais robusta.
- Utilizar um framework JavaScript para facilitar o desenvolvimento e a manutenção do código.
- Implementar um sistema de gerenciamento de estado para controlar os dados da aplicação de forma centralizada.
- Adicionar testes unitários e de integração para garantir a qualidade do código.
- Implementar a funcionalidade de geolocalização e visualização em mapa.

## Conclusão:

Este projeto demonstra uma abordagem modular e flexível para a criação de formulários web com carregamento dinâmico de componentes. A utilização de JavaScript vanilla permite um bom desempenho e controle sobre o código. A estrutura do projeto facilita a manutenção e a expansão.