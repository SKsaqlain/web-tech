package com.webtech.androidui.services.mongodb

import android.view.View
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.webtech.androidui.services.URL
import org.slf4j.LoggerFactory
import java.util.UUID

class MongoDbService {
    private val logger = LoggerFactory.getLogger(MongoDbService::class.java)

    fun addToWishList(view: View, body: String) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Add to Wish List API call with $trackingId")
        val url = "${URL.BackendUrl.url}/mongodb/insertDoc?body=$body&trackingId=$trackingId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
            },
            { error ->
                logger.error("Error occurred while fetching Google Images with trackingId $trackingId: ${error.message}")
            })
        Volley.newRequestQueue(view.context).add(stringRequest)
    }

    fun removeFromWishList(view: View, itemId:String) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Delete from Wish List API call with $trackingId")
        val url = "${URL.BackendUrl.url}/mongodb/deleteDoc?itemId=$itemId&trackingId=$trackingId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
            },
            { error ->
                logger.error("Error occurred while fetching Google Images with trackingId $trackingId: ${error.message}")
            })
        Volley.newRequestQueue(view.context).add(stringRequest)
    }

    fun getAllWishListItems(view: View, updateWishListResponseState: (response: String) -> Unit) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Get All Wish List Items API call with $trackingId")
        val url = "${URL.BackendUrl.url}/mongodb/getAll?trackingId=$trackingId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
                updateWishListResponseState(response)
            },
            { error ->
                logger.error("Error occurred while fetching Google Images with trackingId $trackingId: ${error.message}")
            })
        Volley.newRequestQueue(view.context).add(stringRequest)
    }
}