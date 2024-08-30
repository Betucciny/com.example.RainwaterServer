package example.com.model.request

import kotlinx.serialization.Serializable

@Serializable
data class SensorsData(
    val tank1: Int,
    val tank2: Int,
    val uvLight: Boolean,
    val pump: Boolean,
)