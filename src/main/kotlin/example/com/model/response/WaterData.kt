package example.com.model.response

import kotlinx.serialization.Serializable

@Serializable
data class ChartData(
    val time: List<String>,
    val tank1: List<Int>,
    val tank2: List<Int>
)

@Serializable
data class WaterData(
    val chartData: ChartData,
    val uvLightState: Boolean,
    val pumpState: Boolean,
    val valve1State: Boolean,
    val valve2State: Boolean
)
