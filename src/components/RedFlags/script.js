window.RedFlags = {
    postRender: function (callback) {
        // Funções de validação unitária para cada campo
        const validationRules = {
            recentFall: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para queda recente"
            ],
            unexplainedWeightLoss: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para perda de peso sem explicação"
            ],
            nightPain: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para dor noturna"
            ],
            recentAccident: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para acidente automobilístico ou trauma severo recente"
            ],
            generalWeakness: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para fraqueza generalizada"
            ],
            fever: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para febre"
            ],
            urinaryDysfunction: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para disfunção para urinar"
            ],
            fecalDysfunction: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para disfunção para defecar"
            ],
            cognitiveChanges: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para alterações cognitivas"
            ],
            severeNeurologicalImpairment: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para comprometimento neurológico grave"
            ],
            shortnessOfBreath: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para falta de ar"
            ],
            chestPain: [
                value => value === 'yes' || value === 'no' || "Selecione uma opção para dor no peito"
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
                const radioButtons = document.querySelectorAll(`input[name="${inputId}"]:checked`);
                if (radioButtons.length === 0) {
                    showError(inputId, "Selecione uma opção");
                    isValid = false;
                } else {
                    showError(inputId, '');
                }
            });
            return isValid;
        }

        // Função de configuração para a validação de campos
        function setupFieldValidation() {
            Object.keys(validationRules).forEach(inputId => {
                const radioButtons = document.querySelectorAll(`input[name="${inputId}"]`);
                radioButtons.forEach(button => {
                    button.addEventListener('change', function () {
                        showError(inputId, '');
                    });
                });
            });
        }

        // Configuração do botão de envio do formulário
        function setupSubmitButton() {
            document.getElementById('healthAssessmentForm').addEventListener('submit', function (event) {
                event.preventDefault();
                if (validateFormData()) {
                    const formData = {};
                    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
                    radioButtons.forEach(button => {
                        formData[button.name] = button.value;
                    });

                    localStorage.setItem('redFlagsData', JSON.stringify(formData));
                    console.log("Formulário enviado:", formData);
                    alert("Formulário enviado com sucesso!");
                } else {
                    alert("Por favor, preencha todos os campos corretamente.");
                }
            });
        }

        // Execução das funções de configuração
        setupFieldValidation();
        setupSubmitButton();
    },

    mount: function () {
        const savedData = localStorage.getItem('redFlagsData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(key => {
                const radioButton = document.getElementById(formData[key]);
                if (radioButton) {
                    radioButton.checked = true;
                }
            });
        }
    }
};

console.log("Loading RedFlags.js");
