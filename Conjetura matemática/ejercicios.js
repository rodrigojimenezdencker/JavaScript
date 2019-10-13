function conjecture(value) {
  let values = [value];
  while (value != 1) {
    if (value % 2 == 0) {
      value = value / 2;
      values.push(value);
    } else {
      value = value * 3 + 1;
      values.push(value);
    }
  }
  return values;
}

function conjectureSteps(value) {
  steps = 0;
  while (value != 1) {
    if (value % 2 == 0) {
      value = value / 2;
      steps++;
    } else {
      value = value * 3 + 1;
      steps++;
    }
  }
  return steps;
}

//El usuario pasa el valor máximo que se quiere comprobar
function conjectureStepsMax(value) {
  let stepsArray = [];
  for (let i = 1; i <= value; i++) {
    steps = 0;
    number = i;
    while (number != 1) {
      if (number % 2 == 0) {
        number = number / 2;
        steps++;
      } else {
        number = number * 3 + 1;
        steps++;
      }
    }
    stepsArray.push(steps);
  }
  let MaxSteps = stepsArray[0];
  let numberMaxSteps;
  for (let i = 0; i < stepsArray.length; i++) {
    if (stepsArray[i] > MaxSteps) {
      MaxSteps = stepsArray[i];
      numberMaxSteps = i + 1;
    }
  }
  return numberMaxSteps;
}

validPhone = phone => Number.isInteger(phone) && phone.toString().length == 9;

function formatPhone(phone) {
  if (validPhone(phone)) {
    phone = phone.toString();
    var formattedPhone = "";
    for (let i = 0; i < phone.length; i++) {
      formattedPhone += phone[i];
      if ((i + 1) % 3 == 0 && i + 1 != phone.length) {
        formattedPhone += "-";
      }
    }
  }
  return formattedPhone;
}

function validCif(cif) {
  let regexCif = new RegExp("[a-zA-Z]{1}\\d{8}");
  return regexCif.test(cif);
}

function longerWord(word1, word2) {
  return word1.length >= word2.length ? word1 : word2;
}