package com.example.sipherus_android

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.budiyev.android.codescanner.CodeScanner
import com.budiyev.android.codescanner.CodeScannerView
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException
import com.jakewharton.threetenabp.AndroidThreeTen

class MainActivity : ComponentActivity() {

    private lateinit var codeScanner: CodeScanner
    private lateinit var btnScan: Button
    private lateinit var tvResult: TextView
    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        AndroidThreeTen.init(this)

        btnScan = findViewById(R.id.btn_scan)
        tvResult = findViewById(R.id.tv_result)

        // Request camera permission
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_DENIED
        ) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 123)
        }

        // Set up button click to open scanner
        btnScan.setOnClickListener {
            openScanner()
        }
    }

    private fun openScanner() {
        val scannerView = CodeScannerView(this)
        codeScanner = CodeScanner(this, scannerView)
        setContentView(scannerView)

        codeScanner.setDecodeCallback {
            runOnUiThread {
                val scannedData = it.text
                processScannedData(scannedData)
            }
        }

        codeScanner.setErrorCallback {
            runOnUiThread {
                Toast.makeText(this, "Camera error: ${it.message}", Toast.LENGTH_LONG).show()
                displayResult("Error scanning QR code")
            }
        }

        codeScanner.startPreview()
    }

    private fun processScannedData(data: String) {
        try {
            val json = JSONObject(data)

            // Validate JSON format
            if (!json.has("id") || !json.has("qrSecret")) {
                displayResult("qrCode format is wrong.")
                return
            }

            // Send POST request
            sendPostRequest(json)
        } catch (e: Exception) {
            displayResult("qrCode format is wrong.")
        }
    }

    private fun sendPostRequest(json: JSONObject) {
        val url = "https://sipherus-62.vercel.app/api/employees/toggle-attendance"

        val body = json.toString()
            .toRequestBody("application/json; charset=utf-8".toMediaType())

        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    displayResult("Error: ${e.message}")
                }
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    val responseBody = response.body?.string()
                    if (responseBody != null) {
                        displayResponseData(responseBody)
                    } else {
                        displayResult("No response from server.")
                    }
                } else {
                    displayResult("Failed with status code: ${response.code}")
                }
            }
        })
    }

    private fun displayResponseData(responseBody: String) {
        try {
            val jsonResponse = JSONObject(responseBody)

            // Extract required fields
            val name = jsonResponse.getString("name")
            val employeeId = jsonResponse.getString("employeeId")
            val currentStatus = jsonResponse.getString("currentStatus")
            val lastStatusUpdate = jsonResponse.getString("lastStatusUpdate")
            val formattedDate = formatDate(lastStatusUpdate)

            val result = """
                Name: $name
                Employee ID: $employeeId
                Current Status: $currentStatus
                Last Status Update: $formattedDate
            """.trimIndent()

            runOnUiThread {
                displayResult(result)
            }
        } catch (e: Exception) {
            runOnUiThread {
                displayResult("Error parsing response.")
            }
        }
    }

    private fun displayResult(data: String) {
        setContentView(R.layout.activity_main)
        btnScan = findViewById(R.id.btn_scan)
        tvResult = findViewById(R.id.tv_result)

        tvResult.text = data

        // Reassign button click listener
        btnScan.setOnClickListener {
            openScanner()
        }
    }

    override fun onPause() {
        if (::codeScanner.isInitialized) {
            codeScanner.releaseResources()
        }
        super.onPause()
    }
}
