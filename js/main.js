"use strict";

// ============ LOGIN SETUP ======================
const navBtn = document.querySelector(".nav_btn");
const loginForm = document.querySelector(".login_page");
const overlay = document.querySelector(".background");
const closeBtn = document.querySelector(".close_btn");

navBtn.addEventListener("click", () => {
  loginForm.classList.add("show");
  overlay.classList.add("overlay");
  wrongCredential.forEach((cred) => (cred.style.border = "2px solid #39b385"));
  document.querySelector(".warning").style.display = "none";
  inputLoginPin.value = inputLoginUsername.value = "";
});

closeBtn.addEventListener("click", () => {
  loginForm.classList.remove("show");
  overlay.classList.remove("overlay");
  inputLoginPin.value = inputLoginUsername.value = "";
});

// ===================== DATA =============================
const account1 = {
  owner: "Ganesh Saud",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2020-08-01T21:31:17.178Z",
    "2020-03-28T07:42:02.383Z",
    "2021-05-30T09:15:04.904Z",
    "2021-01-02T10:17:24.185Z",
    "2021-08-27T14:11:59.604Z",
    "2021-08-30T17:01:17.194Z",
    "2021-09-02T23:36:17.929Z",
    "2021-09-03T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Sunil Gyawali",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2020-08-01T21:31:17.178Z",
    "2020-03-28T07:42:02.383Z",
    "2021-05-30T09:15:04.904Z",
    "2021-01-02T10:17:24.185Z",
    "2021-08-27T14:11:59.604Z",
    "2021-08-30T17:01:17.194Z",
    "2021-09-02T23:36:17.929Z",
    "2021-09-03T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Bhupen Saud",
  movements: [200, -200, 340, -300, -20, 500, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2020-08-01T21:31:17.178Z",
    "2020-03-28T07:42:02.383Z",
    "2021-05-30T09:15:04.904Z",
    "2021-01-02T10:17:24.185Z",
    "2021-08-27T14:11:59.604Z",
    "2021-08-30T17:01:17.194Z",
    "2021-09-02T23:36:17.929Z",
    "2021-09-03T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "A bc",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 1,
  movementsDates: [
    "2020-08-01T21:31:17.178Z",
    "2020-03-28T07:42:02.383Z",
    "2021-05-30T09:15:04.904Z",
    "2021-01-02T10:17:24.185Z",
    "2021-08-27T14:11:59.604Z",
    "2021-08-30T17:01:17.194Z",
    "2021-09-02T23:36:17.929Z",
    "2021-09-03T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// ====================== DOME ELEMENTS ========================
const wrongCredential = document.querySelectorAll(".login__input");

const mainContainer = document.querySelector(".app");

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// ============= DISPLAY DATES ===================
const displayDate = function (date, local) {
  const calcDay = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const beforeDays = calcDay(new Date(), date);

  if (beforeDays === 0) {
    return "Today";
  } else if (beforeDays === 1) {
    return "Yesterday";
  } else if (beforeDays <= 7) {
    return `${beforeDays} days ago`;
  }
  return new Intl.DateTimeFormat(local).format(date);
};

// =============== FORMATING CURRENCY ======================
const formatCurrency = function (ammount, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(ammount);
};

// =========== DISPLAY MOVEMENT METHOD ==================
const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";

    const moveDate = displayDate(new Date(acc.movementsDates[i]), acc.locale);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${moveDate}</div>
      <div class="movements__value">${formatCurrency(
        move,
        acc.currency,
        acc.locale
      )}</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// =========== LABEL BALANCE ====================
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((amt, curr) => amt + curr);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    currentAccount.currency,
    acc.locale
  );
};

// ================ DISPLAY SUMMARY ==================
const displaySummery = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr);

  labelSumIn.textContent = formatCurrency(
    incomes,
    account.currency,
    account.locale
  );

  const outgoing = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr);

  labelSumOut.textContent = formatCurrency(
    Math.abs(outgoing),
    account.currency,
    account.locale
  );

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, curr) => acc + curr);

  labelSumInterest.textContent = formatCurrency(
    interest,
    account.currency,
    account.locale
  );
};

// ============ USERNAME ================
const userName = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner.toLowerCase().split(" ")[0];
  });
};
userName(accounts);

// =============== UPDATE UI ===================
function updateUi(acc) {
  // ======= Display Movements ===============
  displayMovement(acc);

  // =========== Display Balance ==============
  displayBalance(acc);

  // ============== Display Summery ===============
  displaySummery(acc);

  // ===========Reseting inputs==================
  inputLoginPin.value = inputLoginUsername.value = "";
}

const displayTime = function () {
  let time = 300;

  const tick = () => {
    let sec = String(Math.floor(time % 60)).padStart(2, 0);
    let min = String(Math.floor(time / 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timeOut);
      containerApp.style.opacity = 0;
      navBtn.textContent = "LOGIN";
      labelWelcome.textContent = "Log in to get started";
    }

    time--;
  };
  tick();
  const timeOut = setInterval(tick, 1000);

  return timeOut;
};

// ================= EVENT HANDLER ============================
let currentAccount, timer;

// ================ TODAYS DATE ==================;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // --------Diaplay UI------------
    labelWelcome.textContent = `Welcome ${currentAccount.owner.slice(
      0,
      currentAccount.owner.indexOf(" ")
    )}`;
    loginForm.classList.remove("show");
    overlay.classList.remove("overlay");
    navBtn.textContent = "Switch account";
    containerApp.style.opacity = 100;

    // =========== SHOWING DATES ===================
    const currentDate = new Date();
    const local = currentAccount.locale;
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(local, options).format(
      currentDate
    );

    // ========= Showing time ==============

    if (timer) {
      clearInterval(timer);
    }
    timer = displayTime();

    // ======= calling update ui ================
    updateUi(currentAccount);

    // =============== Reseting warnings =================
    document.querySelector(".warning").style.display = "none";
    wrongCredential.forEach((cred) => (cred.style.border = "none"));
  } else {
    wrongCredential.forEach((cred) => (cred.style.border = "2px solid red"));
    document.querySelector(".warning").style.display = "block";
  }
});

// ==================== TRANSFERING AMMOUNTS =======================
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const transferAmmount = +inputTransferAmount.value;
  const receiver = accounts.find(
    (acc) => acc.username == inputTransferTo.value
  );

  if (
    transferAmmount > 0 &&
    receiver?.username != currentAccount.username &&
    currentAccount.balance >= transferAmmount
  ) {
    // ======== TRANSFER FUNCATIONALITY ================
    receiver.movements.push(transferAmmount);
    currentAccount.movements.push(-transferAmmount);

    // ========== ADDING DATES TO NEW TRNASFER =====================
    receiver.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    // ============= CALLING UPDATEUI ================
    updateUi(receiver);
    updateUi(currentAccount);

    // ============== RESETING TIMER ===============
    clearInterval(timer);
    timer = displayTime();
  }

  inputTransferAmount.value = inputTransferTo.value = "";
});

// ============= REQUESTING LOAN ======================
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmmount = +inputLoanAmount.value;

  if (
    loanAmmount > 0 &&
    currentAccount.movements.some((mov) => mov >= 0.1 * loanAmmount)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 2000);

    // =========== RESETING TIMER ===============
    clearInterval(timer);
    timer = displayTime();
  }
  inputLoanAmount.value = "";
});

// ============== CLOSING ACCOUNT ================
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username == inputCloseUsername.value &&
    currentAccount.pin == +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username == currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    navBtn.textContent = "LOGIN";
    mainContainer.style.transition = "0s";
  }
});

// =================== SORTING MOVEMENTS =========================
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});
