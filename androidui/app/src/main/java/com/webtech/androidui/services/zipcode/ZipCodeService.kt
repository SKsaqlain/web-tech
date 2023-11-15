package com.webtech.androidui.services.zipcode

import android.view.View
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.webtech.androidui.services.URL
import org.slf4j.LoggerFactory
import java.util.UUID

class ZipCodeService {
    private val logger = LoggerFactory.getLogger(ZipCodeService::class.java)
    //    private val serverUrl = "https://sms-wt-assgn3.uw.r.appspot.com"
//    private val  ipURL="https://ipinfo.io/json"
//    private val TOKEN="ef88210eb36381";

    fun getCurrentZipCode(view: View, updateCurrentZipCodeState: (String) -> Unit) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making Get Current Zip Code API call with $trackingId")
        val url = "${URL.IpUrl.url}?token=${URL.IpUrl.TOKEN}"
        logger.info("Current ZipCode URL is: ${URL.IpUrl.url}")
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

    fun getNearbyZipCode(view: View, postalCode: String) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making Get Nearby Zip Code API call with $trackingId")
        val url = "${URL.BackendUrl.url}/zipcode?zipcode=$postalCode&trackingId=$trackingId"
        logger.info("Nearby ZipCode URL is: ${URL.BackendUrl.url}")
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Nearby ZipCode Response is: $response")
//                updateNearbyZipCodeState(response)
            },
            { error ->

                logger.error("Error in Get Nearby ZipCode API call", error)
            }
        )
        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)
    }

}