package com.example.sipherus_android

import org.threeten.bp.Instant
import org.threeten.bp.ZoneId
import org.threeten.bp.format.DateTimeFormatter

fun formatDate(isoDate: String): String {
    return try {
        // Parse ISO 8601 date
        val instant = Instant.parse(isoDate)

        // Format to a readable date-time
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneId.systemDefault()) // Use device's time zone

        formatter.format(instant)
    } catch (e: Exception) {
        "Invalid date"
    }
}
