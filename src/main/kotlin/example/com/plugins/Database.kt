package example.com.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.*


fun Application.configureDatabases() {
//    val port = environment.config.propertyOrNull("storage.db_port")?.getString() ?: "1433"
//    val host = environment.config.propertyOrNull("storage.host")?.getString() ?: "localhost"
//    val databaseName = environment.config.propertyOrNull("storage.db_name")?.getString() ?: "test"
//    val user = environment.config.propertyOrNull("storage.user")?.getString() ?: "root"
//    val password = environment.config.propertyOrNull("storage.password")?.getString() ?: ""
//    val driver = environment.config.propertyOrNull("storage.driver")?.getString() ?: ""
//
//    val url = "jdbc:mysql://$host:$port;databaseName=$databaseName"
//    println("url: $url")
//
//
//
//    val database = Database.connect(
//        url = url,
//        user = user,
//        password = password,
//        driver = driver
//    )



}