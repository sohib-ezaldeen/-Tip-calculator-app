// Selecting  Element
let billField = document.querySelector(".bill-field");
let btnOfTip = document.querySelectorAll(".box-select-tip button");
let peopleFiled = document.querySelector(".people-filed");
let amountPerson = document.querySelector(".amount-person");
let totalPerson = document.querySelector(".total-person");
let peopleValidation = document.querySelector(".people-validation");
let tipInputFiled = document.querySelector(".tip-filed");
let btnReset = document.querySelector(".btn-reset");

//global  so that it can be accessed
let billValue;
let peopleValue;
let tipValue;

// Event input in biilField
billField.addEventListener("input", (e) => {
  billValue = Number(e.target.value);
  divisionTipOfPerson(billValue, tipValue, peopleValue);
});

// Event Click the buttons to select the percentage
btnOfTip.forEach((ele, index, arry) => {
  ele.addEventListener("click", () => {
    arry.forEach((e) => {
      e.classList.remove("check");
    });
    ele.classList.add("check");
    tipValue = Number(ele.dataset.tip);
    tipInputFiled.value = "";
    divisionTipOfPerson(billValue, tipValue, peopleValue);
  });
});

// Event input to Enter the percentage manually to select it
tipInputFiled.addEventListener("input", function (e) {
  tipValue = Number(e.target.value);
  btnOfTip.forEach((ele) => {
    ele.classList.remove("check");
  });
  divisionTipOfPerson(billValue, tipValue, peopleValue);
});

// Event: Number of people entered
peopleFiled.addEventListener("input", (e) => {
  peopleValue = Number(e.target.value);

  divisionTipOfPerson(billValue, tipValue, peopleValue);
});

//  Event click btnReset Clear all fields
btnReset.addEventListener("click", () => {
  billValue = 0;
  peopleValue = 0;
  tipValue = 0;
  btnOfTip.forEach((ele) => {
    ele.classList.remove("check");
  });
  amountPerson.textContent = "$00.00";
  totalPerson.textContent = "$00.00";
  billField.value = "";
  peopleFiled.value = "";
  tipInputFiled.value = "";
});


//  Value Calculation Function 
function divisionTipOfPerson(bill, tip, countpepole) {
  // Validation
  if (!bill || !tip || bill <= 0 || tip <= 0) {
    amountPerson.textContent = "$00.00";
    totalPerson.textContent = "$00.00";
    return;
  }

  if (!countpepole || countpepole === 0 || countpepole < 0) {
    peopleValidation.classList.remove("none");
    peopleFiled.style.border = "2px solid #ff4500";
    amountPerson.textContent = "$00.00";
    totalPerson.textContent = "$00.00";
    return;
  } else {
    peopleValidation.classList.add("none");
    peopleFiled.style.border = "";
  }

  let tipTotal = (bill * tip) / 100;
  let tipPerPerson = tipTotal / countpepole;
  amountPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
  let totalResult = (tipTotal + bill) / countpepole;
  totalPerson.textContent = `$${totalResult.toFixed(2)}`;
}
