function setupApp() {
    // Definição da aplicação e seus loadings
    document.addEventListener('DOMContentLoaded', function () {

        const appContainer = document.getElementById('myapp'); // Supondo que existe um elemento pai para appElement
        const appElement = document.createElement('div');
        appElement.id = 'app';
        appContainer.appendChild(appElement);
        const componentsToLoad = ['UserIdentification', 'RedFlags'];
        let currentIndex = 0; // Índice do componente atual

        document.addEventListener('componentDataSaved', function (e) {
            const componentName = e.detail.componentName;
            currentIndex = e.detail.thisComponentIndex;
            const componentIndex = componentsToLoad.findIndex(name => name === componentName);

            console.log("Evento componentDataSaved recebido para", componentName);
            console.log("currentIndex: ", currentIndex);
            console.log("componentIndex: ", componentIndex);

            // Avança somente se o evento veio do componente atual e ainda há componentes para carregar
            if (currentIndex === componentIndex && currentIndex < componentsToLoad.length - 1) {
                currentIndex++;
                loadNextComponent(true);
            }
        });

        const componentDependencies = {
            UserIdentification: ['utils/validateCpf.js'] // Dependências de UserIdentification
            // Outros componentes e suas dependências podem ser adicionados aqui
        };

        const componentsLocalStorages = {
            UserIdentification: 'userIdentificationData',
            RedFlags: 'redFlagsData'
            // Adicione mais componentes e as chaves do localStorage correspondentes aqui
        };

        // Função para verificar se é permitido navegar para um componente
        function canNavigate(index) {
            console.log("Index no canNavigate: ", index)
            const componentName = componentsToLoad[index];
            console.log("componentName no canNavigate: ", componentName)
            const localStorageKey = componentsLocalStorages[componentName];
            console.log("localStorageKey no canNavigate: ", localStorageKey)
            // Se não houver chave mapeada, impede a navegação
            if (!localStorageKey) {
                console.log("Não pode avançar")
                return false;
            }

            const data = localStorage.getItem(localStorageKey);
            console.log("Dados: ", data)
            return data !== null; // Permite a navegação se houver dados no localStorage
        }

        // Configura os botões de navegação
        function setupNavigationButtons() {
            const btnNext = document.createElement('button');
            btnNext.textContent = 'Avançar';
            const btnPrev = document.createElement('button');
            btnPrev.textContent = 'Voltar';

            // Anexa os botões diretamente ao appContainer, fora do appElement
            appContainer.appendChild(btnPrev);
            appContainer.appendChild(btnNext);

            btnNext.addEventListener('click', function () {
                console.log("Executado o botão de avançar");
                console.log("Currentindex no btnNext.add.EventListener: ", currentIndex)
                if (currentIndex < componentsToLoad.length - 1) {
                    if (canNavigate(currentIndex) || canNavigate(currentIndex + 1)) {
                        currentIndex++;
                        loadNextComponent(true);
                    }
                }
            });

            btnPrev.addEventListener('click', function () {
                console.log("Executado o botão de voltar");
                console.log("Currentindex no btnPrev.add.EventListener: ", currentIndex);
                if (currentIndex - 1 >= 0 && canNavigate(currentIndex - 1)) {
                    // Remove dados atuais do componente antes de navegar
                    appElement.innerHTML = '';
                    console.log("currentIndex antes do decremento em btnPrev.addEventListener: ", currentIndex);
                    currentIndex--;
                    console.log("currentIndex depois do decremento em btnPrev.addEventListener: ", currentIndex);
                    loadNextComponent(true);
                }
            });

        }

        // Carrega as dependências
        function loadDependencies(dependencies, callback) {
            if (!dependencies || dependencies.length === 0) {
                callback();
                return;
            }

            let loadedCount = 0;
            dependencies.forEach(dep => {
                const script = document.createElement('script');
                script.src = dep;
                script.onload = () => {
                    loadedCount++;
                    if (loadedCount === dependencies.length) {
                        callback(); // Todas as dependências foram carregadas
                    }
                };
                document.head.appendChild(script);
            });
        }

        // Carrega o próximo componente
        function loadNextComponent(isNavigation = false) {
            if (currentIndex >= componentsToLoad.length) return;

            const componentName = componentsToLoad[currentIndex];
            const dependencies = componentDependencies[componentName];

            loadDependencies(dependencies, () => {
                loadComponent(componentName, () => {
                    console.log(`${componentName} loaded`);
                    if (currentIndex < componentsToLoad.length - 1) {
                        currentIndex++;
                    }
                }, isNavigation); // Repassa o sinalizador de navegação
            });
        }

        // Carrega um componente
        function loadComponent(name, callback, isNavigation = false) {
            // Antes de carregar o novo componente, limpa o `appElement`
            appElement.innerHTML = ''; // Isso remove o componente anterior
            fetch(`components/${name}/component.html`)
                .then(response => response.text())
                .then(html => {
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    appElement.appendChild(div);

                    const link = document.createElement('link');
                    link.href = `components/${name}/styles.css`;
                    link.rel = 'stylesheet';
                    document.head.appendChild(link);

                    const script = document.createElement('script');
                    script.src = `components/${name}/script.js`;
                    script.onload = () => {
                        if (window[name] && window[name].postRender) {
                            window[name].postRender();
                        }
                        // Após postRender, verifica se é uma navegação entre componentes
                        if (isNavigation && window[name] && window[name].mount) {
                            const mountFunction = () => {
                                window[name].mount();
                                document.removeEventListener('DOMContentLoaded', mountFunction);
                            };

                            if (document.readyState === 'complete') {
                                window[name].mount();
                            } else {
                                document.addEventListener('DOMContentLoaded', mountFunction);
                            }
                        }
                    };

                    document.body.appendChild(script);
                })
                .catch(error => {
                    console.error(`Erro ao carregar o componente ${name}:`, error);
                });
        }

        // Inicia a configuração dos botões de navegação
        setupNavigationButtons();

        // Inicia o carregamento do primeiro componente
        loadNextComponent();
    });
}

// Inicia a configuração da aplicação e sua inicialização
setupApp();
