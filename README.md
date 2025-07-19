# Pediatric Resuscitation Calculator

A mobile-optimized web application for rapidly calculating pediatric resuscitation doses based on age, organized into clear clinical sections.

## Features

- **Simple Interface**: Single age input field with instant calculations
- **Organized Sections**: Medications grouped by clinical category
- **Mobile Optimized**: Designed for use on mobile devices during emergencies
- **Customizable Equations**: Modify calculation formulas in the settings
- **Offline Capable**: Works without internet connection
- **Local Storage**: Saves your custom equations

## How to Use

### Calculator Page
1. Enter the patient's age in years (0-18)
2. All resuscitation doses will automatically calculate and display, organized by section:

#### 🔄 **Resuscitation**
- Adrenaline (1:10,000) dose
- Defibrillation energy (J)
- Fluid bolus volume (mL)
- Glucose 10% (mL)
- Amiodarone dose
- Adenosine dose
- Atropine dose

#### 🫁 **Intubation**
- ETT Size
- ETT Length (cm)

#### 💉 **Induction**
- Fentanyl dose
- Ketamine dose
- Propofol dose
- Midazolam dose

#### 🦴 **Paralysis**
- Rocuronium dose
- Suxamethonium dose
- Vecuronium dose

#### 🔄 **Reversal**
- Sugammadex dose
- Flumazenil dose
- Naloxone dose

#### 🫁 **Respiratory**
- Nebulized Adrenaline dose
- Dexamethasone dose
- Hydrocortisone dose
- Methylprednisolone dose
- Magnesium Sulfate dose
- IV Salbutamol dose

#### 🧠 **Neurology**
- Midazolam IV dose
- Midazolam IM dose
- Midazolam IN dose
- Levetiracetam dose

#### 💊 **Analgesia**
- Fentanyl IN dose
- Fentanyl IV dose
- Morphine IV dose

#### 🩸 **Trauma**
- Blood volume (mL)
- Tranexamic Acid dose

### Settings Page
1. Navigate to the Settings tab
2. Modify any equation using mathematical expressions
3. Use `age` and `weight` as variables in your equations
4. Click "Save" for each equation you modify
5. Use "Reset to Defaults" to restore original formulas

## Default Equations

### Weight Calculation
- **Weight**: `age * 2 + 8` kg

### 🔄 Resuscitation
- **Adrenaline**: `weight * 0.1` mL
- **Defibrillation**: `weight * 4` J
- **Fluid Bolus**: `weight * 20` mL
- **Glucose 10%**: `weight * 5` mL
- **Amiodarone**: `weight * 5` mg
- **Adenosine**: `weight * 0.1` mg
- **Atropine**: `weight * 0.02` mg

### 🫁 Intubation
- **ETT Size**: `(age / 4) + 4`
- **ETT Length**: `age / 2 + 12` cm

### 💉 Induction
- **Fentanyl**: `weight * 1` mcg
- **Ketamine**: `weight * 2` mg
- **Propofol**: `weight * 2.5` mg
- **Midazolam**: `weight * 0.1` mg

### 🦴 Paralysis
- **Rocuronium**: `weight * 1` mg
- **Suxamethonium**: `weight * 2` mg
- **Vecuronium**: `weight * 0.1` mg

### 🔄 Reversal
- **Sugammadex**: `weight * 2` mg
- **Flumazenil**: `weight * 0.01` mg
- **Naloxone**: `weight * 0.01` mg

### 🫁 Respiratory
- **Nebulized Adrenaline**: `weight * 0.5` mL
- **Dexamethasone**: `weight * 0.15` mg
- **Hydrocortisone**: `weight * 2` mg
- **Methylprednisolone**: `weight * 1` mg
- **Magnesium Sulfate**: `weight * 0.2` g
- **IV Salbutamol**: `weight * 0.15` mcg

### 🧠 Neurology
- **Midazolam IV**: `weight * 0.1` mg
- **Midazolam IM**: `weight * 0.2` mg
- **Midazolam IN**: `weight * 0.3` mg
- **Levetiracetam**: `weight * 20` mg

### 💊 Analgesia
- **Fentanyl IN**: `weight * 1.5` mcg
- **Fentanyl IV**: `weight * 1` mcg
- **Morphine IV**: `weight * 0.1` mg

### 🩸 Trauma
- **Blood**: `weight * 10` mL
- **Tranexamic Acid**: `weight * 15` mg

## Keyboard Shortcuts

- **Enter**: Calculate and blur input
- **Escape**: Clear age input
- **Ctrl/Cmd + S**: Save current equation (in settings)

## Mobile Features

- Touch-optimized interface
- Prevents zoom on input focus
- Responsive design for all screen sizes
- Touch feedback on buttons
- Organized sections for easy navigation

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
- Consider individual patient factors and contraindications

## Clinical Sections Overview

The calculator is organized into 9 clinical sections to facilitate rapid access during emergencies:

1. **🔄 Resuscitation**: Core emergency medications and interventions
2. **🫁 Intubation**: Airway management equipment sizing
3. **💉 Induction**: Anesthetic induction agents
4. **🦴 Paralysis**: Neuromuscular blocking agents
5. **🔄 Reversal**: Antidotes and reversal agents
6. **🫁 Respiratory**: Respiratory medications and steroids
7. **🧠 Neurology**: Neurological medications and antiepileptics
8. **💊 Analgesia**: Pain management medications
9. **🩸 Trauma**: Blood products and hemostatic agents

## Technical Details

- Pure HTML/CSS/JavaScript
- No external dependencies
- Local storage for settings
- Safe mathematical expression evaluation
- Mobile-first responsive design
- Organized section-based layout

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