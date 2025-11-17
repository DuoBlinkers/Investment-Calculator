let chart;

function calculateReturn() {
    let principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseFloat(document.getElementById("years").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        document.getElementById("result").innerHTML = "Please fill all inputs.";
        return;
    }

    let finalAmount = principal * Math.pow(1 + rate, years);
    let interest = finalAmount - principal;

    document.getElementById("result").innerHTML =
        "Final Value: $" + finalAmount.toFixed(2);

    updateChart(principal, interest);
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

