// const budgetValue = document.querySelector('#budget-value');
// const expensesName = document.querySelector('#expenses-name');
// const expensesAmount = document.querySelector('#expenses-amount');
// const visualItemBudget = document.querySelector('#visual-item-budget-value');
// const visualItemExpenses = document.querySelector('#visual-item-expenses-value');
// const visualItemBalance = document.querySelector('#visual-item-balance-value');
// const template = document.querySelector('#expenses-row');
// const tbody = document.querySelector('tbody');

class BudgetApp{
    constructor(addBudget, addExpenses, table){
        addBudget.addEventListener('click', this.budget.bind(this))
        addExpenses.addEventListener('click', this.expense.bind(this));
        this.budgetValue = document.querySelector('#budget-value');
        this.error = document.querySelectorAll('.error');
        this.visualItemBudget = document.querySelector('#visual-item-budget-value');
        this.visualItemExpenses = document.querySelector('#visual-item-expenses-value');
        this.visualItemBalance = document.querySelector('#visual-item-balance-value');
        this.expensesName = document.querySelector('#expenses-name');
        this.expensesAmount = document.querySelector('#expenses-amount');
        this.template = document.querySelector('#expenses-row');
        this.tbody = document.querySelector('tbody');
        this.clone;
        table.addEventListener('click', this.deleteExpenses.bind(this));
        table.addEventListener('click', this.editExpenses.bind(this));
    }
    budget(){
        if (+this.budgetValue.value <= 0 || isNaN(+this.budgetValue.value)){
            this.error[0].classList.add('error-show');
            this.budgetValue.classList.add('input-error');
            setTimeout(() => {
                this.error[0].classList.remove('error-show');
                this.budgetValue.classList.remove('input-error');
            }, 2500);
        }
        else {
            this.visualItemBudget.innerText = +this.budgetValue.value;
            this.visualItemBalance.innerText = +this.budgetValue.value - +this.visualItemExpenses.innerText;
            this.budgetValue.value = '';
        }
    }

    expense(){
        if(this.expensesName.value === ""){
            this.error[1].classList.add('error-show');
            this.expensesName.classList.add('input-error');
            setTimeout(() => {
                this.error[1].classList.remove('error-show');
                this.expensesName.classList.remove('input-error');
            }, 2500);
        }
        else if(+this.expensesAmount.value <= 0 || isNaN(+this.expensesAmount.value)){
                this.error[2].classList.add('error-show');
                this.expensesAmount.classList.add('input-error');
                setTimeout(() => {
                    this.error[2].classList.remove('error-show');
                    this.expensesAmount.classList.remove('input-error');
                }, 2500);
        }
        else{
            this.clone = this.template.content.cloneNode(true);
            let td = this.clone.querySelectorAll('td');
            td[0].innerText = this.expensesName.value;
            td[1].innerText = +this.expensesAmount.value;
            this.tbody.appendChild(this.clone);

            this.visualItemExpenses.innerText = +this.visualItemExpenses.innerText + +this.expensesAmount.value;
            this.visualItemBalance.innerText = +this.visualItemBalance.innerText - +this.expensesAmount.value;

            this.expensesName.value = "";
            this.expensesAmount.value = "";

        }

    }

    deleteExpenses(x){
        if (x.target.classList.contains('deleteRow')){
            this.visualItemBalance.innerText = +this.visualItemBalance.innerText + +x.target.closest('tr').children[1].innerText;
            this.visualItemExpenses.innerText = +this.visualItemExpenses.innerText - +x.target.closest('tr').children[1].innerText;
            x.target.closest('tr').remove();
        }
            
    }

    editExpenses(x){
        if (x.target.classList.contains('editRow')){
            this.visualItemBalance.innerText = +this.visualItemBalance.innerText + +x.target.closest('tr').children[1].innerText;
            this.visualItemExpenses.innerText = +this.visualItemExpenses.innerText - +x.target.closest('tr').children[1].innerText;

            this.expensesName.value = x.target.closest('tr').children[0].innerText;
            this.expensesAmount.value = x.target.closest('tr').children[1].innerText;
            this.expensesName.focus(); 

            x.target.closest('tr').remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const addBudget = document.querySelector('#budget-add');
    const addExpenses = document.querySelector('#expenses-add');
    const table = document.querySelector('table');
    new BudgetApp(addBudget, addExpenses, table);
}