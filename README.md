# Projeto Discretio-Sana: Formulário Modular com Carregamento Dinâmico de Componentes

Este projeto demonstra a construção de um formulário web modular com carregamento dinâmico de componentes, utilizando HTML, CSS e JavaScript puro (Vanilla JS). O objetivo é criar um formulário flexível e escalável para este projeto, permitindo a adição e remoção de etapas de forma dinâmica.

## Funcionamento Geral:

### `index.html`:
Contém a estrutura básica da página HTML, incluindo um elemento div com o id `myapp`. Este elemento servirá como container para os componentes que serão carregados dinamicamente.

### `index.js`:
Contém a função `setupApp()` que é executada quando o documento HTML é carregado. `setupApp()` inicializa a aplicação, define os componentes a serem carregados, configura a navegação e gerencia o carregamento dinâmico dos componentes.

### Componentes:
Cada componente é uma pasta dentro da pasta `src/components/`, contendo três arquivos:
- `component.html`: Define a estrutura HTML do componente.
- `styles.css`: Define os estilos CSS do componente.
- `script.js`: Contém o código JavaScript do componente, incluindo a lógica, validações e interações.

### Funcionalidades do `index.js`:

- **Carregamento Dinâmico de Componentes:** Utiliza a função `loadComponent()` para carregar o HTML, CSS e JavaScript de cada componente de forma assíncrona.
- **Navegação entre Componentes:** Cria botões "Avançar" e "Voltar" e implementa a lógica de navegação entre os componentes.
- **Armazenamento de Dados:** Utiliza o localStorage para armazenar os dados dos componentes, permitindo que o usuário navegue entre os componentes e retorne posteriormente sem perder suas informações.
- **Gerenciamento de Dependências:** Carrega as dependências (scripts externos) de cada componente antes de carregá-lo.

### Componentização:

#### Vantagens:
- **Modularidade:** Cada componente é independente, facilitando a manutenção e a reutilização do código.
- **Escalabilidade:** Novos componentes podem ser facilmente adicionados ao formulário.
- **Organização:** O código fica mais organizado e fácil de entender.
- **Flexibilidade:** Permite a criação de formulários dinâmicos com diferentes fluxos de etapas.

#### Opiniões assumidas:
- A componentização é uma boa prática para projetos web complexos, pois melhora a organização, a manutenção e a escalabilidade do código.
- A divisão em componentes deve ser feita de forma lógica, agrupando funcionalidades relacionadas.
- Cada componente deve ser independente e ter uma interface bem definida.

### Design Patterns:

- **Módulo:** Cada componente é um módulo independente, encapsulando sua estrutura, estilo e lógica. Inclusive, possui princípios de ciclo de vida de componentes.
- **Observer:** O evento `componentDataSaved` implementa o padrão Observer, permitindo que os componentes se comuniquem entre si de forma desacoplada.

### Características da Implementação:

- Utilização de `querySelector` para `div#myapp`: O `index.js` utiliza `querySelector` para obter o elemento div com o id `myapp` no `index.html`. Isso permite que o código JavaScript seja independente da estrutura específica do HTML, desde que o elemento div com o id `myapp` esteja presente.
- Single Page Application: A ideia principal foi criar uma aplicação de única só página, a fim de ter controle de todo o formulário.
- Vanilla JS: O projeto utiliza JavaScript puro, sem frameworks, permitindo ter mais controle sobre o código e um melhor desempenho. Todavia, faz mais sentido utilizar bibliotecas e frameworks para desenvolvimento web.

## Conclusão:

Este projeto demonstra a construção de um formulário web modular com carregamento dinâmico de componentes, utilizando boas práticas de desenvolvimento web e design patterns. A abordagem modular facilita a manutenção, a escalabilidade e a reutilização do código, tornando o projeto flexível e adaptável a diferentes necessidades. No entanto, utilizar libs e frameworks teria sido mais rápido. Este projeto, inclusive, pode se tornar uma framework, um modelo de trabalho a ser seguido e reutilizado. Não é sustentável repetir este mesmo processo de componentização e ciclo de vida de componentes do zero toda vez.

[Acesse as Considerações Finais](FINAL_THOUGHTS.md)

## Estrutura do Projeto:

```
src/
├── components/
│   ├── UserIdentification/
│   │   ├── script.js
│   │   ├── component.html
│   │   └── styles.css
│   ├── RedFlags/
│   │   ├── script.js
│   │   ├── component.html
│   │   └── styles.css
│   ├── PainAssessment/
│   │   ├── script.js
│   │   ├── component.html
│   │   └── styles.css
│   ├── OccupationalHealth/
│   │   ├── script.js
│   │   ├── component.html
│   │   └── styles.css
│   ├── HealthHistory/
│   │   ├── script.js
│   │   ├── component.html
│   │   └── styles.css
│   └── MapVisualization/
│       ├── script.js
│       ├── component.html
│       └── styles.css
├── styles/
│   └── global.css
├── index.html
└── index.js
```