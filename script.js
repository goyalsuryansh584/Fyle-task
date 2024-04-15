document.addEventListener('DOMContentLoaded', function () {
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageInput = document.getElementById('age');
    const incomeErrorIcon = document.getElementById('incomeError');
    const extraIncomeErrorIcon = document.getElementById('extraIncomeError');
    const deductionsErrorIcon = document.getElementById('deductionsError');
    const ageErrorIcon = document.getElementById('ageError'); 
    const taxcalci = document.getElementById('taxcalci');
    const modal = document.getElementById('modal');
    const popup = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close');

    taxcalci.addEventListener('submit', function (e) {
        e.preventDefault();
        calculateTax();
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    function calculateTax() {
        const age = parseFloat(ageInput.value);
        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);

        if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions) || isNaN(age)) {
            alert('Please enter valid numbers in all fields.');
            return;
        }

        let taxRate = 0;
        if (age < 40) {
            taxRate = 0.3;
        } else if (age >= 40 && age < 60) {
            taxRate = 0.4;
        } else if (age >= 60) {
            taxRate = 0.1;
        }

        const totalIncome = income + extraIncome - deductions;
        let tax = 0;
        if (totalIncome > 800000) {
            tax = taxRate * (totalIncome - 800000);
        }

        showModal(totalIncome, tax);
    }

    function showModal(totalIncome, tax) {
        const popup = document.querySelector('.modal-content');
        const overallIncome = totalIncome - tax; 
        popup.innerHTML = `
            <span class="close">&times;</span>
            <p>Your overall income will be: ${overallIncome.toFixed(2)} Lakhs</p>
            <p>After tax deduction: ${tax.toFixed(2)} Lakhs</p>
        `;
        modal.style.display = 'block';

        const closeButton = popup.querySelector('.close');
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    function enableFields() {
        incomeInput.removeAttribute('disabled');
        extraIncomeInput.removeAttribute('disabled');
        deductionsInput.removeAttribute('disabled');
    }

    function disableFields() {
        incomeInput.setAttribute('disabled', true);
        extraIncomeInput.setAttribute('disabled', true);
        deductionsInput.setAttribute('disabled', true);
    }

    ageInput.addEventListener('input', function () {
        if (!this.value) {
            ageErrorIcon.style.display = 'inline';
        } else {
            ageErrorIcon.style.display = 'none';
        }
    });

    ageInput.addEventListener('change', function () {
        const selectAge = parseFloat(this.value);
    
        if (selectAge < 40 || (selectAge >= 40 && selectAge < 60) || selectAge >= 60) {
            enableFields(); 
        } else {
            disableFields(); 
        }
    });

    incomeInput.addEventListener('input', function () {
        if (!this.value) {
            incomeErrorIcon.style.display = 'inline';
        } else {
            incomeErrorIcon.style.display = 'none';
        }
    });

    extraIncomeInput.addEventListener('input', function () {
        if (!this.value) {
            extraIncomeErrorIcon.style.display = 'inline';
        } else {
            extraIncomeErrorIcon.style.display = 'none';
        }
    });

    deductionsInput.addEventListener('input', function () {
        if (!this.value) {
            deductionsErrorIcon.style.display = 'inline';
        } else {
            deductionsErrorIcon.style.display = 'none';
        }
    });

});
