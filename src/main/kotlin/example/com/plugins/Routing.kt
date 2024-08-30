package example.com.plugins

import example.com.model.request.SensorsData
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
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
        }
    }
}
