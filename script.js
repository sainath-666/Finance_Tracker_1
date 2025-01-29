// DOM Elements
const form = document.getElementById("transactionForm");
const totalIncomeCard = document.getElementById("totalIncome");
const totalExpensesCard = document.getElementById("totalExpenses");
const netBalanceCard = document.getElementById("netBalance");
const reportBody = document.getElementById("reportBody");
const ctx = document.getElementById("incomeExpenseChart").getContext("2d");

// Data Tracking
let totalIncome = 0;
let totalExpenses = 0;

// Chart.js Initialization
let incomeExpenseChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Finance Data",
        data: [0, 0],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  },
});

// Function to Update Dashboard and Chart
function updateDashboard() {
  const netBalance = totalIncome - totalExpenses;

  // Update Cards
  totalIncomeCard.textContent = `Total Income: $${totalIncome}`;
  totalExpensesCard.textContent = `Total Expenses: $${totalExpenses}`;
  netBalanceCard.textContent = `Net Balance: $${netBalance}`;

  // Update Chart
  incomeExpenseChart.data.datasets[0].data = [totalIncome, totalExpenses];
  incomeExpenseChart.update();
}

// Handle Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get Form Data
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!date || !description || !category || isNaN(amount)) return;

  // Update Income or Expense
  if (category === "income") {
    totalIncome += amount;
  } else {
    totalExpenses += amount;
  }

  // Add to Reports Table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${description}</td>
    <td>${category.charAt(0).toUpperCase() + category.slice(1)}</td>
    <td>${category === "income" ? `$${amount}` : `-$${amount}`}</td>
  `;
  reportBody.appendChild(row);

  // Update Dashboard and Chart
  updateDashboard();

  // Reset Form
  form.reset();
});
