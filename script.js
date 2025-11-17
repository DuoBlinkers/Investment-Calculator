let chart;

function calculate() {
    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("interest").value) / 100;
    const years = parseFloat(document.getElementById("years").value);

    const C = parseFloat(document.getElementById("contributionAmount").value) || 0;
    const freq = document.getElementById("contributionFrequency").value;

    // Compounding periods per year
    let n;
    if (freq === "weekly") n = 52;
    else if (freq === "monthly") n = 12;
    else if (freq === "yearly") n = 1;
    else n = 1;  // default yearly compounding

    // If no contributions selected
    if (freq === "none") {
        const finalAmount = P * Math.pow(1 + r, years);

        showResults(P, finalAmount);
        return;
    }

    // Compound interest with recurring contributions
    const finalAmount =
        P * Math.pow(1 + r / n, n * years) + 
        C * ((Math.pow(1 + r / n, n * years) - 1) / (r / n));

    showResults(P + C * n * years, finalAmount); // send invested vs earned
}

function showResults(invested, finalAmount) {
    const interestEarned = finalAmount - invested;

    document.getElementById("chartSection").style.display = "flex";

    new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["Principal + Contributions", "Interest Earned"],
            datasets: [{
                data: [invested, interestEarned]
            }]
        }
    });
}


function updateChart(principal, interest) {

    // show the chart section if hidden
    document.getElementById("chartSection").style.display = "flex";

    let ctx = document.getElementById("pieChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal", "Interest"],
            datasets: [
                {
                    data: [principal, interest],
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 159, 64, 0.7)"
                    ]
                }
            ]
        }
    });
}

