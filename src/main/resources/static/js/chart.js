$(document).ready(function() {
    let waterLevelChart;

    function createChart(data) {
        const ctx = document.getElementById('water-level-chart')?.getContext('2d');
        if (!ctx) {
            console.error('Canvas element not found');
            return;
        }

        if (waterLevelChart) {
            waterLevelChart.destroy(); // Destroy the old chart before creating a new one
        }

        waterLevelChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Water Level (Liters)',
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Liters'
                        }
                    }
                }
            }
        });
    }

    function updateDashboardData() {
        const range = $('#time-range').val();
        $.ajax({
            url: `/update-chart?range=${range}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                createChart(data.chartData);

                // Update pump state with appropriate class
                const pumpClass = data.pumpState ? 'state-on' : 'state-off';
                $('#pump-state').text(`Pump State: ${data.pumpState ? 'ON' : 'OFF'}`).removeClass('state-on state-off').addClass(pumpClass);

                // Update UV light state with appropriate class
                const uvLightClass = data.uvLightState ? 'state-on' : 'state-off';
                $('#uv-light-state').text(`UV Light State: ${data.uvLightState ? 'ON' : 'OFF'}`).removeClass('state-on state-off').addClass(uvLightClass);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching dashboard data:', error);
            }
        });
    }

    // Initialize dashboard with default data
    updateDashboardData();

    // Set up an interval to update the dashboard every 30 seconds
    setInterval(updateDashboardData, 30000); // 30000 milliseconds = 30 seconds

    // Update dashboard data when time range changes
    $('#time-range').change(updateDashboardData);

    // Handle valve form submission
    $('#valve-form').submit(function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the auth token from the input field
        const authToken = $('input[name="auth-token"]').val();

        $.ajax({
            url: '/open-valve',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}` // Set the Authorization header
            },
            data: $(this).serialize(),
            success: function(response) {
                $('#valve-response').text(response);
            },
            error: function(xhr, status, error) {
                console.error('Error opening valve:', error);
            }
        });
    });
});
