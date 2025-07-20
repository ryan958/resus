// Default equations for pediatric resuscitation calculations
const defaultEquations = {
    ett: '(age / 4) + 4',
    'ett-depth': 'age / 2 + 12',
    adrenaline: 'weight * 0.1',
    defib: 'weight * 4',
    fluid: 'weight * 20',
    glucose: 'weight * 2',
    amiodarone: 'weight * 5',
    adenosine: 'weight * 0.1',
    atropine: 'weight * 20',
    fentanyl: 'weight * 5',
    ketamine: 'weight * 2',
    propofol: 'weight * 3',
    midazolam: 'weight * 0.2',
    rocuronium: 'weight * 1.2',
    suxamethonium: 'weight * 2',
    vecuronium: 'weight * 0.1',
    sugammadex: 'weight * 16',
    flumazenil: 'weight * 5',
    naloxone: 'weight * 10',
    'inotrope-adrenaline': 'weight * 0.05',
    'inotrope-noradrenaline': 'weight * 0.05',
    dobutamine: 'weight * 2',
    dopamine: 'weight * 2',
    'nebulized-adrenaline': '5',
    dexamethasone: 'weight * 0.3',
    hydrocortisone: 'weight * 4',
    methylprednisolone: 'weight * 1',
    magnesium: 'weight * 0.2',
    salbutamol: 'weight * 15',
    'midazolam-iv': 'weight * 0.15',
    'midazolam-im': 'weight * 0.2',
    'midazolam-in': 'weight * 0.3',
    levetiracetam: 'weight * 60',
    'fentanyl-in': 'weight * 1.5',
    'fentanyl-iv': 'weight * 1',
    morphine: 'weight * 0.1',
    blood: 'weight * 10',
    tranexamic: 'weight * 15',
    'adrenaline-push': 'weight * 0.1',
    cardioversion: 'weight * 1'
};

// Current equations (can be customized)
let currentEquations = { ...defaultEquations };

// DOM elements
const ageYearsInput = document.getElementById('age-years-input');
const ageMonthsInput = document.getElementById('age-months-input');
const weightInput = document.getElementById('weight-input');
const resultElements = {
    weight: document.getElementById('weight-result'),
    ett: document.getElementById('ett-result'),
    'ett-depth': document.getElementById('ett-depth-result'),
    adrenaline: document.getElementById('adrenaline-result'),
    defib: document.getElementById('defib-result'),
    fluid: document.getElementById('fluid-result'),
    glucose: document.getElementById('glucose-result'),
    amiodarone: document.getElementById('amiodarone-result'),
    adenosine: document.getElementById('adenosine-result'),
    atropine: document.getElementById('atropine-result'),
    fentanyl: document.getElementById('fentanyl-result'),
    ketamine: document.getElementById('ketamine-result'),
    propofol: document.getElementById('propofol-result'),
    midazolam: document.getElementById('midazolam-result'),
    rocuronium: document.getElementById('rocuronium-result'),
    suxamethonium: document.getElementById('suxamethonium-result'),
    vecuronium: document.getElementById('vecuronium-result'),
    sugammadex: document.getElementById('sugammadex-result'),
    flumazenil: document.getElementById('flumazenil-result'),
    naloxone: document.getElementById('naloxone-result'),
    'inotrope-adrenaline': document.getElementById('inotrope-adrenaline-result'),
    'inotrope-noradrenaline': document.getElementById('inotrope-noradrenaline-result'),
    dobutamine: document.getElementById('dobutamine-result'),
    dopamine: document.getElementById('dopamine-result'),
    'nebulized-adrenaline': document.getElementById('nebulized-adrenaline-result'),
    dexamethasone: document.getElementById('dexamethasone-result'),
    hydrocortisone: document.getElementById('hydrocortisone-result'),
    methylprednisolone: document.getElementById('methylprednisolone-result'),
    magnesium: document.getElementById('magnesium-result'),
    salbutamol: document.getElementById('salbutamol-result'),
    'midazolam-iv': document.getElementById('midazolam-iv-result'),
    'midazolam-im': document.getElementById('midazolam-im-result'),
    'midazolam-in': document.getElementById('midazolam-in-result'),
    levetiracetam: document.getElementById('levetiracetam-result'),
    'fentanyl-in': document.getElementById('fentanyl-in-result'),
    'fentanyl-iv': document.getElementById('fentanyl-iv-result'),
    morphine: document.getElementById('morphine-result'),
    blood: document.getElementById('blood-result'),
    tranexamic: document.getElementById('tranexamic-result'),
    'adrenaline-push': document.getElementById('adrenaline-push-result'),
    cardioversion: document.getElementById('cardioversion-result')
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    ageYearsInput.addEventListener('input', calculateAll);
    ageYearsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            ageYearsInput.blur();
        }
    });
    ageMonthsInput.addEventListener('input', calculateAll);
    ageMonthsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            ageMonthsInput.blur();
        }
    });
    weightInput.addEventListener('input', calculateAll);
    weightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            weightInput.blur();
        }
    });
}

// Page navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Add active class to clicked nav tab
    event.target.classList.add('active');
}

// Convert years and months to decimal age
function convertToDecimalAge(years, months) {
    const yearsNum = parseFloat(years);
    const monthsNum = parseFloat(months);
    
    // If both inputs are empty or NaN, return null
    if ((years === '' || isNaN(yearsNum)) && (months === '' || isNaN(monthsNum))) {
        return null;
    }
    
    // Use 0 for empty inputs, but only if at least one input has a value
    const yearsValue = years === '' || isNaN(yearsNum) ? 0 : yearsNum;
    const monthsValue = months === '' || isNaN(monthsNum) ? 0 : monthsNum;
    
    // Validate inputs
    if (yearsValue < 0 || monthsValue < 0 || monthsValue > 11) {
        return null;
    }
    
    // Convert to decimal age (e.g., 1 year 11 months = 1.917 years)
    return yearsValue + (monthsValue / 12);
}

// Safe evaluation of mathematical expressions
function safeEval(expression, variables) {
    try {
        // Replace variables with their values
        let processedExpression = expression;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            processedExpression = processedExpression.replace(regex, value);
        }
        
        // Remove any potentially dangerous characters and evaluate
        processedExpression = processedExpression.replace(/[^0-9+\-*/()., ]/g, '');
        
        // Use Function constructor for safer evaluation
        const result = new Function('return ' + processedExpression)();
        
        // Check if result is valid
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return result;
        } else {
            throw new Error('Invalid result');
        }
    } catch (error) {
        console.error('Error evaluating expression:', expression, error);
        return null;
    }
}

// Calculate all values based on age and/or actual weight
function calculateAll() {
    const years = ageYearsInput.value;
    const months = ageMonthsInput.value;
    const age = convertToDecimalAge(years, months);
    const actualWeight = parseFloat(weightInput.value);
    
    if ((age === null || age < 0 || age > 18) && (isNaN(actualWeight) || actualWeight <= 0)) {
        clearResults();
        return;
    }
    
    // Use actual weight if provided, otherwise estimate from age
    let weight;
    if (!isNaN(actualWeight) && actualWeight > 0) {
        weight = actualWeight;
    } else {
        // Calculate weight based on age ranges
        if (age < 1) {
            // Age < 1 year: (age in months x 0.5) + 4
            const ageInMonths = age * 12;
            weight = (ageInMonths * 0.5) + 4;
        } else if (age >= 1 && age <= 5) {
            // Age 1-5 years: (age in years x 2) + 8
            weight = (age * 2) + 8;
        } else {
            // Age > 5: (age in years x 3) + 7
            weight = (age * 3) + 7;
        }
    }
    if (weight === null || isNaN(weight) || weight <= 0) {
        showMessage('Error calculating weight', 'error');
        return;
    }

    // Estimate age from weight if age is missing for ETT calculations
    let ettAge = age;
    if ((isNaN(age) || age === 0) && (!isNaN(weight) && weight > 0)) {
        ettAge = (weight - 8) / 2;
    }
    
    // Use estimated age for all calculations if actual age is missing
    let calcAge = isNaN(age) ? ettAge : age;
    
    // Calculate all other values
    const calculations = {
        weight: weight,
        ett: safeEval(currentEquations.ett, { age: ettAge }),
        'ett-depth': safeEval(currentEquations['ett-depth'], { age: ettAge }),
        adrenaline: safeEval(currentEquations.adrenaline, { age: calcAge, weight }),
        defib: safeEval(currentEquations.defib, { age: calcAge, weight }),
        fluid: safeEval(currentEquations.fluid, { age: calcAge, weight }),
        glucose: safeEval(currentEquations.glucose, { age: calcAge, weight }),
        amiodarone: safeEval(currentEquations.amiodarone, { age: calcAge, weight }),
        adenosine: safeEval(currentEquations.adenosine, { age: calcAge, weight }),
        atropine: safeEval(currentEquations.atropine, { age: calcAge, weight }),
        fentanyl: { min: weight * 2, max: weight * 5 },
        ketamine: { min: weight * 1, max: weight * 2 },
        propofol: { min: weight * 2, max: weight * 3 },
        midazolam: { min: weight * 0.1, max: weight * 0.2 },
        rocuronium: safeEval(currentEquations.rocuronium, { age: calcAge, weight }),
        suxamethonium: safeEval(currentEquations.suxamethonium, { age: calcAge, weight }),
        vecuronium: safeEval(currentEquations.vecuronium, { age: calcAge, weight }),
        sugammadex: safeEval(currentEquations.sugammadex, { age: calcAge, weight }),
        flumazenil: safeEval(currentEquations.flumazenil, { age: calcAge, weight }),
        naloxone: safeEval(currentEquations.naloxone, { age: calcAge, weight }),
        'inotrope-adrenaline': { min: weight * 0.05, max: weight * 1 },
        'inotrope-noradrenaline': { min: weight * 0.05, max: weight * 1 },
        dobutamine: { min: weight * 2, max: weight * 20 },
        dopamine: { min: weight * 2, max: weight * 20 },
        'nebulized-adrenaline': safeEval(currentEquations['nebulized-adrenaline'], { age: calcAge, weight }),
        dexamethasone: safeEval(currentEquations.dexamethasone, { age: calcAge, weight }),
        hydrocortisone: safeEval(currentEquations.hydrocortisone, { age: calcAge, weight }),
        methylprednisolone: safeEval(currentEquations.methylprednisolone, { age: calcAge, weight }),
        magnesium: safeEval(currentEquations.magnesium, { age: calcAge, weight }),
        salbutamol: safeEval(currentEquations.salbutamol, { age: calcAge, weight }),
        'midazolam-iv': safeEval(currentEquations['midazolam-iv'], { age: calcAge, weight }),
        'midazolam-im': safeEval(currentEquations['midazolam-im'], { age: calcAge, weight }),
        'midazolam-in': safeEval(currentEquations['midazolam-in'], { age: calcAge, weight }),
        levetiracetam: safeEval(currentEquations.levetiracetam, { age: calcAge, weight }),
        'fentanyl-in': safeEval(currentEquations['fentanyl-in'], { age: calcAge, weight }),
        'fentanyl-iv': { min: weight * 0.5, max: weight * 1 },
        morphine: { min: weight * 0.05, max: weight * 0.1 },
        blood: safeEval(currentEquations.blood, { age: calcAge, weight }),
        tranexamic: safeEval(currentEquations.tranexamic, { age: calcAge, weight }),
        'adrenaline-push': safeEval(currentEquations['adrenaline-push'], { age: calcAge, weight }),
        cardioversion: safeEval(currentEquations.cardioversion, { age: calcAge, weight })
    };
    
    // Update display
    updateResults(calculations);
}

// Update result display
function updateResults(calculations) {
    for (const [key, value] of Object.entries(calculations)) {
        const element = resultElements[key];
        if (element && value !== null) {
            element.textContent = formatValue(key, value);
        }
    }
}

// Format values for display
function formatValue(type, value) {
    // Handle range objects for inotropes and induction medications
    if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
        switch (type) {
            case 'inotrope-adrenaline':
            case 'inotrope-noradrenaline':
                return value.min.toFixed(1) + ' - ' + value.max.toFixed(0) + ' microg/min';
            case 'dobutamine':
            case 'dopamine':
                return value.min.toFixed(0) + ' - ' + value.max.toFixed(0) + ' microg/min';
            case 'fentanyl':
                return value.min.toFixed(0) + ' - ' + value.max.toFixed(0) + ' microg';
            case 'ketamine':
                return value.min.toFixed(0) + ' - ' + value.max.toFixed(0) + ' mg';
            case 'propofol':
                return value.min.toFixed(0) + ' - ' + value.max.toFixed(0) + ' mg';
            case 'midazolam':
                return value.min.toFixed(1) + ' - ' + value.max.toFixed(1) + ' mg';
            case 'fentanyl-iv':
                return value.min.toFixed(1) + ' - ' + value.max.toFixed(1) + ' microg';
            case 'morphine':
                return value.min.toFixed(2) + ' - ' + value.max.toFixed(1) + ' mg';
            default:
                return value.min.toFixed(1) + ' - ' + value.max.toFixed(1);
        }
    }
    
    // Handle single values
    switch (type) {
        case 'weight':
            return value.toFixed(1) + ' kg';
        case 'ett':
            return Math.floor(value * 2) / 2 + '';
        case 'ett-depth':
            return value.toFixed(1) + ' cm';
        case 'adrenaline':
            return value.toFixed(1) + ' mL';
        case 'defib':
            return value.toFixed(0) + ' J';
        case 'fluid':
            return value.toFixed(0) + ' mL';
        case 'glucose':
            return value.toFixed(0) + ' mL';
        case 'amiodarone':
            return value.toFixed(0) + ' mg';
        case 'adenosine':
            return value.toFixed(1) + ' mg';
        case 'atropine':
            return value.toFixed(0) + ' microg';
        case 'fentanyl':
            return value.toFixed(0) + ' microg';
        case 'ketamine':
            return value.toFixed(0) + ' mg';
        case 'propofol':
            return value.toFixed(0) + ' mg';
        case 'midazolam':
            return value.toFixed(1) + ' mg';
        case 'rocuronium':
            return value.toFixed(0) + ' mg';
        case 'suxamethonium':
            return value.toFixed(0) + ' mg';
        case 'vecuronium':
            return value.toFixed(1) + ' mg';
        case 'sugammadex':
            return value.toFixed(0) + ' mg';
        case 'flumazenil':
            return value.toFixed(0) + ' microg';
        case 'naloxone':
            return value.toFixed(0) + ' microg';
        case 'nebulized-adrenaline':
            return value.toFixed(0) + ' mL';
        case 'dexamethasone':
            return value.toFixed(1) + ' mg';
        case 'hydrocortisone':
            return value.toFixed(0) + ' mg';
        case 'methylprednisolone':
            return value.toFixed(0) + ' mg';
        case 'magnesium':
            return value.toFixed(1) + ' mmol';
        case 'salbutamol':
            return value.toFixed(0) + ' microg';
        case 'midazolam-iv':
            return value.toFixed(1) + ' mg';
        case 'midazolam-im':
            return value.toFixed(1) + ' mg';
        case 'midazolam-in':
            return value.toFixed(1) + ' mg';
        case 'levetiracetam':
            return value.toFixed(0) + ' mg';
        case 'fentanyl-in':
            return value.toFixed(0) + ' microg';
        case 'fentanyl-iv':
            return value.toFixed(0) + ' microg';
        case 'morphine':
            return value.toFixed(1) + ' mg';
        case 'blood':
            return value.toFixed(0) + ' mL';
        case 'tranexamic':
            return value.toFixed(0) + ' mg';
        case 'adrenaline-push':
            return value.toFixed(1) + ' mL';
        case 'cardioversion':
            return value.toFixed(0) + ' J';
        default:
            return value.toFixed(1);
    }
}

// Clear all results
function clearResults() {
    Object.values(resultElements).forEach(element => {
        if (element) {
            element.textContent = '-';
        }
    });
}

// Save equation to settings
function saveEquation(type) {
    const inputElement = document.getElementById(type + '-equation');
    const equation = inputElement.value.trim();
    
    if (!equation) {
        showMessage('Please enter an equation', 'error');
        return;
    }
    
    // Test the equation with sample values
    const testAge = 5;
    const testWeight = 18; // typical weight for 5-year-old
    
    let testResult;
    if (type === 'weight') {
        // Weight calculation is now handled automatically, not through equations
        showMessage('Weight calculation is now automatic and cannot be customized', 'error');
        return;
    } else {
        testResult = safeEval(equation, { age: testAge, weight: testWeight });
    }
    
    if (testResult === null) {
        showMessage('Invalid equation format', 'error');
        return;
    }
    
    // Save the equation
    currentEquations[type] = equation;
    localStorage.setItem('pediatricEquations', JSON.stringify(currentEquations));
    
    showMessage('Equation saved successfully', 'success');
    
    // Recalculate if age is entered
    if (ageYearsInput.value || ageMonthsInput.value) {
        calculateAll();
    }
}

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('pediatricEquations');
    if (saved) {
        try {
            currentEquations = { ...defaultEquations, ...JSON.parse(saved) };
        } catch (error) {
            console.error('Error loading settings:', error);
            currentEquations = { ...defaultEquations };
        }
    }
    
    // Populate settings page inputs
    Object.entries(currentEquations).forEach(([type, equation]) => {
        const inputElement = document.getElementById(type + '-equation');
        if (inputElement) {
            inputElement.value = equation;
        }
    });
}

// Reset to default equations
function resetToDefaults() {
    if (confirm('Are you sure you want to reset all equations to defaults?')) {
        currentEquations = { ...defaultEquations };
        localStorage.removeItem('pediatricEquations');
        
        // Update settings page inputs
        Object.entries(defaultEquations).forEach(([type, equation]) => {
            const inputElement = document.getElementById(type + '-equation');
            if (inputElement) {
                inputElement.value = equation;
            }
        });
        
        showMessage('Reset to defaults successfully', 'success');
        
            // Recalculate if age is entered
    if (ageYearsInput.value || ageMonthsInput.value) {
        calculateAll();
    }
    }
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add to current page
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.insertBefore(messageElement, activePage.firstChild);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save current equation (when in settings page)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activeInput = document.activeElement;
        if (activeInput && activeInput.id && activeInput.id.endsWith('-equation')) {
            const type = activeInput.id.replace('-equation', '');
            saveEquation(type);
        }
    }
    
    // Escape to clear age input
    if (e.key === 'Escape') {
        ageYearsInput.value = '';
        ageMonthsInput.value = '';
        clearResults();
        ageYearsInput.focus();
    }
});

// Add touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    // Add touch feedback to buttons
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'BUTTON') {
            e.target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.tagName === 'BUTTON') {
            e.target.style.transform = '';
        }
    });
}

// Prevent zoom on input focus (mobile)
ageYearsInput.addEventListener('focus', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '16px';
    }
});

ageYearsInput.addEventListener('blur', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '';
    }
});

ageMonthsInput.addEventListener('focus', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '16px';
    }
});

ageMonthsInput.addEventListener('blur', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '';
    }
}); 
