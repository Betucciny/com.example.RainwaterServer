package example.com.model.response

import kotlinx.serialization.Serializable

@Serializable
data class ChartData(
    val labels: List<String>,
    val values: List<Int>,
)

@Serializable
data class WaterData(
    val chartData: ChartData,
    val uvLightState: Boolean,
    val pumpState: Boolean
)
