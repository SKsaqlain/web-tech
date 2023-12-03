package com.webtech.androidui.services.google

import android.view.View
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.webtech.androidui.productsearch.ProductSearchFragment
import com.webtech.androidui.services.URL
import org.slf4j.LoggerFactory
import java.net.URLEncoder
import java.util.UUID

class GoogleService {
    private val logger = LoggerFactory.getLogger(GoogleService::class.java)

    fun getGoogleImages(view: View, title: String, updateGoogleImageResponseState: (response: String) -> Unit) {
        val trackingId = UUID.randomUUID().toString()
        val titleEncoded=URLEncoder.encode(title, "UTF-8")
        logger.info("Making backend Google Images API call with $title")

        val url = "${URL.BackendUrl.url}/googleImg?keyword=$titleEncoded&trackingId=$trackingId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
                updateGoogleImageResponseState(response)

            },
            { error ->
                logger.error("Error occurred while fetching Google Images with trackingId $trackingId: ${error.message}")
            })
        Volley.newRequestQueue(view.context).add(stringRequest)
    }
}