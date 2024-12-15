const inputField = document.getElementById('input');
const resultField = document.getElementById('result');
const historyField = document.getElementById('history');

// Ajoute un caractère à l'entrée de calcul
function appendToInput(value) {
    // Remplace la virgule par un point pour les calculs
    if (value === ',') {
        value = '.';
    }
    inputField.value += value;
}

// Efface le champ d'entrée et le résultat
function clearInput() {
    inputField.value = '';
    resultField.value = '';
}

// Calcule le résultat de l'entrée
function calculateResult() {
    let input = inputField.value;
    try {
        // Vérifie si l'entrée contient des lettres
        if (/[a-zA-Z]/.test(input)) {
            throw new Error("Erreur : Entrée invalide");
        }

        // Remplace les virgules par des points pour l'évaluation
        input = input.replace(/,/g, '.');

        // Gestion des pourcentages
        if (input.includes('%')) {
            const parts = input.split('%');
            const number = parseFloat(parts[0]);
            if (isNaN(number)) throw new Error("Erreur : Entrée invalide");
            const result = (number / 100).toFixed(2);
            addToHistory(`${input} = ${result}`);
            resultField.value = result;
            inputField.value = ''; // Réinitialise le champ d'entrée
            return;
        }

        let result;
        // Gère les racines carrées
        if (input.includes('√')) {
            const number = parseFloat(input.replace('√', ''));
            result = Math.sqrt(number).toFixed(2);
            addToHistory(`${input} = ${result}`);
        } 
        // Gère les puissances au carré
        else if (input.includes('²')) {
            const number = parseFloat(input.replace('²', ''));
            result = Math.pow(number, 2).toFixed(2);
            addToHistory(`${input} = ${result}`);
        } 
        // Évalue l'expression
        else {
            result = eval(input).toFixed(2);
            addToHistory(`${input} = ${result}`);
        }
        
        resultField.value = result;
        inputField.value = ''; // Réinitialise le champ d'entrée
    } catch (error) {
        resultField.value = error.message; // Affiche le message d'erreur
    }
}

// Ajoute une entrée à l'historique
function addToHistory(entry) {
    const p = document.createElement('p');
    p.textContent = entry;
    historyField.appendChild(p);
    historyField.scrollTop = historyField.scrollHeight; // Fait défiler vers le bas
}

// Saisie par le clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%', 'Enter', 'Backspace', ','].includes(key)) {
        if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            inputField.value = inputField.value.slice(0, -1); // Supprime le dernier caractère
        } else {
            appendToInput(key);
        }
    } else if (key.match(/[a-zA-Z]/)) {
        resultField.value = 'Erreur : Entrée invalide'; // Affiche une erreur si des lettres sont saisies
    }
});