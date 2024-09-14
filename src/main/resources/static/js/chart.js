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
                labels: data.time,
                datasets: [
                    {
                        label: 'Tanque 1 (Litros)',
                        data: data.tank1,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Tanque 2 (Litros)',
                        data: data.tank2,
                        borderColor: 'rgba(192, 75, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
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

                // Update Valve 1 state
                const valve1Class = data.valve1State ? 'state-on' : 'state-off';
                $('#valve1-state').text(`Valve 1 State: ${data.valve1State ? 'OPEN' : 'CLOSED'}`).removeClass('state-on state-off').addClass(valve1Class);

                // Update Valve 2 state
                const valve2Class = data.valve2State ? 'state-on' : 'state-off';
                $('#valve2-state').text(`Valve 2 State: ${data.valve2State ? 'OPEN' : 'CLOSED'}`).removeClass('state-on state-off').addClass(valve2Class);
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

    // Handle valve 1 form submission
    $('#valve1-form').submit(function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the auth token from the input field
        const authToken = $('input[name="auth-token"]').val();

        $.ajax({
            url: '/open-valve1',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}` // Set the Authorization header
            },
            data: $(this).serialize(),
            success: function(response) {
                $('#valve1-response').text(response);
            },
            error: function(xhr, status, error) {
                console.error('Error opening Valve 1:', error);
            }
        });
    });

    // Handle valve 2 form submission
    $('#valve2-form').submit(function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the auth token from the input field
        const authToken = $('input[name="auth-token"]').val();

        $.ajax({
            url: '/open-valve2',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}` // Set the Authorization header
            },
            data: $(this).serialize(),
            success: function(response) {
                $('#valve2-response').text(response);
            },
            error: function(xhr, status, error) {
                $('#valve2-response').text('Unauthorized');
            }
        });
    });

    // Handle pump toggle button click
    $('#toggle-pump').click(function() {
        $.ajax({
            url: '/toggle-pump',
            method: 'POST',
            success: function(response) {
                updateDashboardData(); // Refresh the dashboard to reflect pump state
            },
            error: function(xhr, status, error) {
                console.error('Error toggling pump:', error);
            }
        });
    });
});
