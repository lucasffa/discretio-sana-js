console.log("Loading UserIdentification.js");

// Define o objeto UserIdentification com a função postRender
window.UserIdentification = {
    postRender: function (callback) {

        // Funções de validação unitária para cada campo
        const validationRules = {
            cpf: [
                value => value.length === 11 || "CPF deve ter 11 dígitos numéricos",
                value => /^\d+$/.test(value) || "CPF só pode ter dígitos numéricos",
                value => validateCPF(value) || "CPF inválido"
            ],
            fullName: [
                value => value.length >= 3 || "Nome completo deve ter no mínimo 3 caracteres",
                value => /^[A-Za-z\s]+$/.test(value) || "Nome completo deve ter somente caracteres"
            ],
            motherName: [
                value => value.length >= 3 || "Nome da mãe deve ter no mínimo 3 caracteres",
                value => /^[A-Za-z\s]+$/.test(value) || "Nome da mãe deve ter somente caracteres"
            ],
            birthDate: [
                value => new Date(value) < new Date() || "Data de nascimento deve ser anterior à data atual"
            ],
            sex: [
                value => value !== "" || "Selecione uma opção para sexo"
            ],
            cep: [
                value => value.length === 8 || "CEP deve ter 8 dígitos numéricos",
                value => /^\d+$/.test(value) || "CEP só pode ter dígitos numéricos"
            ],
            street: [
                value => value.length >= 3 || "Rua deve ter no mínimo 3 caracteres"
            ],
            houseNumber: [
                value => Number.isInteger(Number(value)) || "Número da casa deve ser um número inteiro"
            ],
            district: [
                value => value.length >= 3 || "Bairro deve ter no mínimo 3 caracteres"
            ],
            ddd: [
                value => value.length === 2 || "DDD deve ter 2 dígitos numéricos",
                value => /^\d+$/.test(value) || "DDD só pode ter dígitos numéricos"
            ],
            phone: [
                value => /^\d{8,9}$/.test(value) || "Telefone deve ter entre 8 e 9 dígitos numéricos"
            ],
            email: [
                value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "E-mail inválido"
            ],
            pregnant: [
                value => value !== "" || "Selecione uma opção para gestante"
            ],
            bedridden: [
                value => value !== "" || "Selecione uma opção para acamado"
            ]
        };

        // Função para mostrar mensagens de erro
        function showError(inputId, message) {
            const errorSpan = document.getElementById(`${inputId}-error`);
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'block';
            } else {
                console.error("Error span not found for", inputId);
            }
        }

        // Função de validação mestre
        function validateFormData() {
            let isValid = true;
            Object.keys(validationRules).forEach(inputId => {
                const input = document.getElementById(inputId);
                const rules = validationRules[inputId];
                const errorMessages = rules.map(rule => typeof rule === 'function' ? rule(input.value) : null).filter(result => result !== true);

                if (errorMessages.length > 0) {
                    showError(inputId, errorMessages[0]); // Mostra o primeiro erro encontrado
                    isValid = false;
                } else {
                    showError(inputId, ''); // Limpa a mensagem de erro se o campo for válido
                }
            });
            return isValid;
        }

        // Função de validação de campos
        function validateField(input) {
            const inputId = input.id;
            const rules = validationRules[inputId];
            if (rules) {
                const errorMessages = rules.map(rule => rule(input.value)).filter(result => result !== true);
                if (errorMessages.length > 0) {
                    showError(inputId, errorMessages[0]);
                    return false;
                } else {
                    showError(inputId, '');
                    return true;
                }
            }
            return true; // Considera o campo válido se não houver regras definidas
        }

        // Função de validação de seções
        function validateSection(section) {
            let isValid = true;
            const inputs = section.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            return isValid;
        }

        // Função de configuração para a validação de campos
        function setupFieldValidation() {
            const inputs = document.querySelectorAll('#identificationForm input, #identificationForm select');
            inputs.forEach(input => {
                input.addEventListener('blur', function () {
                    validateField(input);
                });
            });
        }

        // Função para ocultar todas as seções do formulário, exceto a primeira
        function hideSectionsExceptFirst() {
            sections.forEach((section, index) => {
                if (index !== currentSectionIndex) section.style.display = 'none';
                else section.style.display = 'block';
            });
        }

        // Função para criar o container de navegação com botões Anterior e Próximo
        function createNavigationContainer() {
            const navigationContainer = document.createElement('div');
            navigationContainer.innerHTML = `
                <button type="button" id="prevBtn">Anterior</button>
                <button type="button" id="nextBtn">Próximo</button>
            `;
            const form = document.getElementById('identificationForm');
            form.appendChild(navigationContainer);
        }

        // Configuração do botão Próximo para exibir a próxima seção do formulário
        function setupNextButton() {
            document.getElementById('nextBtn').addEventListener('click', function () {
                // Valida apenas a seção atual
                if (validateSection(sections[currentSectionIndex]) && currentSectionIndex < sections.length - 1) {
                    sections[currentSectionIndex].style.display = 'none';
                    currentSectionIndex++;
                    sections[currentSectionIndex].style.display = 'block';
                    adjustNavigationButtons();
                }
            });
        }

        // Configuração do botão Anterior para exibir a seção anterior do formulário
        function setupPrevButton() {
            document.getElementById('prevBtn').addEventListener('click', function () {
                if (currentSectionIndex > 0) {
                    sections[currentSectionIndex].style.display = 'none';
                    currentSectionIndex--;
                    sections[currentSectionIndex].style.display = 'block';
                }
            });
        }

        // Função para ajustar a visibilidade dos botões de navegação
        function adjustNavigationButtons() {
            document.getElementById('prevBtn').style.visibility = currentSectionIndex === 0 ? 'hidden' : 'visible';
            document.getElementById('nextBtn').style.visibility = currentSectionIndex === sections.length - 1 ? 'hidden' : 'visible';
        }

        // Configuração dos ouvintes de eventos para os botões de navegação
        function setupButtonListeners() {
            document.querySelectorAll('#prevBtn, #nextBtn').forEach(button => {
                button.addEventListener('click', adjustNavigationButtons);
            });
        }

        // Função para salvar os dados do formulário localmente
        function saveFormData() {
            document.getElementById('user-identification-save-button').addEventListener('click', function (event) {
                event.preventDefault(); // Evita a submissão padrão do formulário

                // Executa a validação antes de salvar
                if (!validateFormData()) {
                    alert("Verifique os erros no formulário.");
                    return;
                }

                const formData = {}; // Objeto para armazenar os dados do formulário

                // Seleciona todos os inputs e selects dentro do formulário
                const inputs = document.querySelectorAll('#identificationForm input, #identificationForm select');
                inputs.forEach(input => {
                    formData[input.name] = input.value; // Armazena o valor de cada campo no objeto formData
                });

                console.log(formData);

                // Armazena os dados localmente
                localStorage.setItem('userIdentificationData', JSON.stringify(formData));

                const data = localStorage.getItem('userIdentificationData');
                console.log("Dados salvos no localStorage: ", data)

                alert('Dados salvos com sucesso!');

                // Dispara um evento customizado
                document.dispatchEvent(new CustomEvent('componentDataSaved', { detail: { componentName: 'UserIdentification', thisComponentIndex: 0 } }));
            });
        }

        // Seleciona todas as seções do formulário
        const sections = document.querySelectorAll('form#identificationForm > section');
        let currentSectionIndex = 0; // Índice da seção atual

        // Executa todas as funções para configurar o formulário
        hideSectionsExceptFirst();
        createNavigationContainer();
        setupNextButton();
        setupPrevButton();
        adjustNavigationButtons();
        setupButtonListeners();
        setupFieldValidation();
        saveFormData();

    },
    mount: function () {
        const savedData = localStorage.getItem('userIdentificationData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    if (input.type === 'select') {
                        // Para campos do tipo select, precisa-se selecionar a opção correspondente
                        [...input.options].forEach(option => {
                            if (option.value === formData[key]) option.selected = true;
                        });
                    } else {
                        // Para outros tipos de campos
                        input.value = formData[key];
                    }
                }
            });
        }
    }
};
