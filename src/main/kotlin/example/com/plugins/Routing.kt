package example.com.plugins

import example.com.functions.getWaterData
import example.com.model.request.SensorsData
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.freemarker.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*



fun Application.configureRouting() {
    routing {
        staticResources("/static", "static")
        get("/") {
            call.respond(FreeMarkerContent("index.ftl", null))
        }
        get("/update-chart") {
            val range = call.request.queryParameters["range"] ?: "last-hour"
            val data = getWaterData(range)
            println(data)
            call.respond(data)
        }
        post("/toggle-pump") {
            call.respond(HttpStatusCode.OK, "Pump toggled")
        }
        authenticate("auth") {
            post("/data") {
                try {
                    val sensorsData = call.receive<SensorsData>()
                    println("Data received: $sensorsData")
                    call.respond(HttpStatusCode.OK)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, "Error: ${e.message}")
                }
            }
            post("/open-valve1") {
                call.respond(HttpStatusCode.OK, "Opened valve 1")
            }
            post("/open-valve2") {
                call.respond(HttpStatusCode.OK, "Opened valve 2")
            }
        }
    }
}
