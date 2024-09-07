package example.com.functions

import example.com.model.response.ChartData
import example.com.model.response.WaterData
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun getWaterData(range: String): WaterData {
    val formatter = DateTimeFormatter.ofPattern("HH:mm")
    val now = LocalDateTime.now()
    val labels = mutableListOf<String>()
    val values = mutableListOf<Int>()

    // Simulate different data based on range (you can replace this with actual data fetching logic)
    when (range) {
        "last-hour" -> {
            for (i in 0..6) {
                labels.add(now.minusMinutes(i * 10L).format(formatter))
                values.add((350..400).random())
            }
        }
        "last-day" -> {
            for (i in 0..6) {
                labels.add(now.minusHours(i.toLong()).format(formatter))
                values.add((300..400).random())
            }
        }
        // Add more cases for "last-week", "last-month", etc.
    }
    val uvLight = (0..1).random() == 1
    val pump = (0..1).random() == 1

    return WaterData(
        chartData = ChartData(labels, values),
        uvLightState = uvLight,
        pumpState = pump
    )
}