let chart;

function calculate() {
    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const years = parseFloat(document.getElementById("years").value);

    const C = parseFloat(document.getElementById("contributionAmount").value) || 0;
    const freq = document.getElementById("contributionFrequency").value;

    if (isNaN(P) || isNaN(r) || isNaN(years)) {
        document.getElementById("result").innerHTML = "Please fill all inputs.";
        return;
    }

    let n;
    if (freq === "weekly") n = 52;
    else if (freq === "monthly") n = 12;
    else if (freq === "yearly") n = 1;
    else n = 1;

    let finalAmount;

    if (freq === "none" || C === 0) {
        finalAmount = P * Math.pow(1 + r, years);
    } else {
        finalAmount =
            P * Math.pow(1 + r / n, n * years) +
            C * ((Math.pow(1 + r / n, n * years) - 1) / (r / n));
    }

    const invested = P + (C * n * years);
    const interestEarned = finalAmount - invested;

    // SHOW THE RESULTS BOX
    document.getElementById("resultsBox").style.display = "block";

    document.getElementById("investedVal").innerText = "$" + invested.toFixed(2);
    document.getElementById("finalVal").innerText = "$" + finalAmount.toFixed(2);
    document.getElementById("interestVal").innerText = "$" + interestEarned.toFixed(2);

    updateChart(invested, interestEarned);
}


function updateChart(invested, interest) {
    document.getElementById("chartSection").style.display = "flex";

    const ctx = document.getElementById("pieChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Invested", "Interest Earned"],
            datasets: [{
                data: [invested, interest]
            }]
        }
    });
}
