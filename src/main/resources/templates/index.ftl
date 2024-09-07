<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Water Tank Dashboard</title>

    <!-- Include the external CSS -->
    <link rel="stylesheet" href="/static/css/styles.css">

    <!-- Include Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

<div class="dashboard">
    <h1>Water Tank Dashboard</h1>

    <div class="controls">
        <label for="time-range">Select Time Range:</label>
        <select id="time-range" name="range">
            <option value="last-hour">Last Hour</option>
            <option value="last-day">Last Day</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
        </select>
    </div>

    <!-- Chart Container -->
    <div id="chart-container">
        <canvas id="water-level-chart"></canvas>
    </div>

    <!-- State Information -->
    <div id="state-info">
        <p id="pump-state">Pump State: Loading...</p>
        <p id="uv-light-state">UV Light State: Loading...</p>
    </div>

    <form id="valve-form" class="valve-form">
        <input type="password" name="auth-token" placeholder="Enter Auth Token" required>
        <button type="submit">Open Valve</button>
        <div id="valve-response" class="valve-response"></div>
    </form>

</div>

<!-- Include the custom JS to handle AJAX and chart updates -->
<script src="/static/js/chart.js"></script>
</body>
</html>
