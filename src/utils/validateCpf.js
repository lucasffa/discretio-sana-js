function validateCPF() {
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpf-error');
    const cpf = cpfInput.value.replace(/[^\d]/g, ''); // Remover caracteres não numéricos

    if (cpf.length !== 11) {
        cpfError.textContent = 'CPF deve ter 11 dígitos numéricos';
        return false;
    }

    // Calcular o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    // Calcular o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos calculados correspondem aos dois últimos dígitos do CPF
    if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
        cpfError.textContent = 'CPF inválido';
        return false;
    }

    cpfError.textContent = '';
    return true;
}
