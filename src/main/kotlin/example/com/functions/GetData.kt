package example.com.functions

import example.com.model.response.ChartData
import example.com.model.response.WaterData
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun getWaterData(range: String): WaterData {
    val formatter = DateTimeFormatter.ofPattern("HH:mm")
    val now = LocalDateTime.now()
    val times = mutableListOf<String>()
    val tank1 = mutableListOf<Int>()
    val tank2 = mutableListOf<Int>()

    when (range) {
        "last-hour" -> {
            for (i in 0..6) {
                times.add(now.minusMinutes(i * 10L).format(formatter))
                tank1.add((100..200).random())
                tank2.add((200..300).random())
            }
        }
        "last-day" -> {
            for (i in 0..6) {
                times.add(now.minusHours(i.toLong()).format(formatter))
                tank1.add((100..200).random())
                tank2.add((200..300).random())
            }
        }
    }
    val uvLight = (0..1).random() == 1
    val pump = (0..1).random() == 1
    val valve1 = (0..1).random() == 1
    val valve2 = (0..1).random() == 1

    return WaterData(
        chartData = ChartData(
            time = times,
            tank1 = tank1,
            tank2 = tank2
        ),
        uvLightState = uvLight,
        pumpState = pump,
        valve1State = valve1,
        valve2State = valve2
    )
}