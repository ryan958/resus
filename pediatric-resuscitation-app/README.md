# Pediatric Resuscitation Calculator

A mobile-optimized web application for rapidly calculating pediatric resuscitation doses based on age.

## Features

- **Simple Interface**: Single age input field with instant calculations
- **Mobile Optimized**: Designed for use on mobile devices during emergencies
- **Customizable Equations**: Modify calculation formulas in the settings
- **Offline Capable**: Works without internet connection
- **Local Storage**: Saves your custom equations

## How to Use

### Calculator Page
1. Enter the patient's age in years (0-18)
2. All resuscitation doses will automatically calculate and display:
   - Weight (kg)
   - ETT Size
   - ETT Depth (cm)
   - Adrenaline (1:10,000) dose
   - Amiodarone dose
   - Atropine dose
   - Calcium Gluconate dose
   - Defibrillation energy (J)
   - Fluid bolus volume (mL)

### Settings Page
1. Navigate to the Settings tab
2. Modify any equation using mathematical expressions
3. Use `age` and `weight` as variables in your equations
4. Click "Save" for each equation you modify
5. Use "Reset to Defaults" to restore original formulas

## Default Equations

- **Weight**: `age * 2 + 8` kg
- **ETT Size**: `(age / 4) + 4`
- **ETT Depth**: `age / 2 + 12` cm
- **Adrenaline**: `weight * 0.1` mL
- **Amiodarone**: `weight * 5` mg
- **Atropine**: `weight * 0.02` mg
- **Calcium Gluconate**: `weight * 0.2` mL
- **Defibrillation**: `weight * 4` J
- **Fluid Bolus**: `weight * 20` mL

## Keyboard Shortcuts

- **Enter**: Calculate and blur input
- **Escape**: Clear age input
- **Ctrl/Cmd + S**: Save current equation (in settings)

## Mobile Features

- Touch-optimized interface
- Prevents zoom on input focus
- Responsive design for all screen sizes
- Touch feedback on buttons

## Installation

1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. No additional software required

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Safety Notice

This application is designed as a quick reference tool for healthcare professionals. Always:
- Verify calculations independently
- Follow local protocols and guidelines
- Use clinical judgment in all cases
- Double-check doses before administration

## Technical Details

- Pure HTML/CSS/JavaScript
- No external dependencies
- Local storage for settings
- Safe mathematical expression evaluation
- Mobile-first responsive design

## File Structure

```
pediatric-resuscitation-app/
├── index.html          # Main application file
├── styles.css          # Styling and mobile optimization
├── script.js           # Calculation logic and functionality
└── README.md           # This file
```

## Support

For technical issues or suggestions, please refer to the source code or contact your IT department. 