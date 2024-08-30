package example.com.plugins

import io.ktor.server.application.*
import io.ktor.server.auth.*

fun Application.configureSecurity() {
    val token = environment.config.propertyOrNull("token")?.getString() ?: "1234"
    install(Authentication){
        bearer("auth") {
            realm = "Ktor Server"
            authenticate { bearerTokenCredential -> 
                if (bearerTokenCredential.token == token) {
                    UserIdPrincipal("Arduino")
                } else {
                    null
                }
            }
        }
    }
}
