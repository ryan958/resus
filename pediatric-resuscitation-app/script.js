// Default equations for pediatric resuscitation calculations
const defaultEquations = {
    weight: 'age * 2 + 8',
    ett: '(age / 4) + 4',
    'ett-depth': 'age / 2 + 12',
    adrenaline: 'weight * 0.1',
    amiodarone: 'weight * 5',
    atropine: 'weight * 0.02',
    calcium: 'weight * 0.2',
    defib: 'weight * 4',
    fluid: 'weight * 20'
};

// Current equations (can be customized)
let currentEquations = { ...defaultEquations };

// DOM elements
const ageInput = document.getElementById('age-input');
const resultElements = {
    weight: document.getElementById('weight-result'),
    ett: document.getElementById('ett-result'),
    'ett-depth': document.getElementById('ett-depth-result'),
    adrenaline: document.getElementById('adrenaline-result'),
    amiodarone: document.getElementById('amiodarone-result'),
    atropine: document.getElementById('atropine-result'),
    calcium: document.getElementById('calcium-result'),
    defib: document.getElementById('defib-result'),
    fluid: document.getElementById('fluid-result')
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    ageInput.addEventListener('input', calculateAll);
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            ageInput.blur();
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

// Calculate all values based on age
function calculateAll() {
    const age = parseFloat(ageInput.value);
    
    if (isNaN(age) || age < 0 || age > 18) {
        clearResults();
        return;
    }
    
    // Calculate weight first (needed for other calculations)
    const weight = safeEval(currentEquations.weight, { age });
    if (weight === null) {
        showMessage('Error calculating weight', 'error');
        return;
    }
    
    // Calculate all other values
    const calculations = {
        weight: weight,
        ett: safeEval(currentEquations.ett, { age }),
        'ett-depth': safeEval(currentEquations['ett-depth'], { age }),
        adrenaline: safeEval(currentEquations.adrenaline, { age, weight }),
        amiodarone: safeEval(currentEquations.amiodarone, { age, weight }),
        atropine: safeEval(currentEquations.atropine, { age, weight }),
        calcium: safeEval(currentEquations.calcium, { age, weight }),
        defib: safeEval(currentEquations.defib, { age, weight }),
        fluid: safeEval(currentEquations.fluid, { age, weight })
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
    switch (type) {
        case 'weight':
            return value.toFixed(1) + ' kg';
        case 'ett':
            return value.toFixed(1);
        case 'ett-depth':
            return value.toFixed(1) + ' cm';
        case 'adrenaline':
            return value.toFixed(1) + ' mL';
        case 'amiodarone':
            return value.toFixed(0) + ' mg';
        case 'atropine':
            return value.toFixed(2) + ' mg';
        case 'calcium':
            return value.toFixed(1) + ' mL';
        case 'defib':
            return value.toFixed(0) + ' J';
        case 'fluid':
            return value.toFixed(0) + ' mL';
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
        testResult = safeEval(equation, { age: testAge });
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
    if (ageInput.value) {
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
        if (ageInput.value) {
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
        ageInput.value = '';
        clearResults();
        ageInput.focus();
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
ageInput.addEventListener('focus', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '16px';
    }
});

ageInput.addEventListener('blur', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '';
    }
}); 