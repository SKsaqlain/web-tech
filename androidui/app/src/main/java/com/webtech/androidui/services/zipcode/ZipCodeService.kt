package com.webtech.androidui.services.zipcode

import android.view.View
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.slf4j.LoggerFactory
import java.util.UUID

class ZipCodeService {
    private val logger = LoggerFactory.getLogger(ZipCodeService::class.java)
    //    private val serverUrl = "https://sms-wt-assgn3.uw.r.appspot.com"
    private val  ipURL="https://ipinfo.io/json"
    private val TOKEN="ef88210eb36381";

    fun getCurrentZipCode(view: View, updateCurrentZipCodeState: (String) -> Unit) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making Get Current Zip Code API call with $trackingId")
        val url = "$ipURL?token=$TOKEN"
        logger.info("Current ZipCode URL is: $url")
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Current ZipCode Response is: $response")
                updateCurrentZipCodeState(response)
            },
            { error ->

                logger.error("Error in Get Current ZipCode API call", error)
            }
        )
        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)
    }

}