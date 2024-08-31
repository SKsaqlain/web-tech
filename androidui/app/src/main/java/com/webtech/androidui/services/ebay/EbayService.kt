package com.webtech.androidui.services.ebay

import android.view.View
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.webtech.androidui.productsearch.ProductSearchFragment
import com.webtech.androidui.services.URL
import org.slf4j.LoggerFactory
import java.util.UUID

class EbayService {
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)

    fun healthCheck(view: View) {

        logger.info("Backend Health check")
        val url = "${URL.BackendUrl.url}/health"
        val requestQueue = Volley.newRequestQueue(view.context)
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
            },
            { logger.info("That didn't work!") })
        requestQueue.add(stringRequest)
    }

    fun findAllItems(
        view: View,
        keyword: String,
        category: String,
        condition: Map<String, Boolean>,
        shipping: Map<String, Boolean>,
        distance: String,
        postalCode: String,
        updateAllItemResponseState: (response:String)->Unit
    ) {
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Find All Items API call with $trackingId")

        val catId = EbayServiceUtil().getCategoryId(category)
        val condArray = EbayServiceUtil().filterCondition(condition)
        val shipArray = EbayServiceUtil().filterShipping(shipping)

        logger.info("keyword: $keyword category: $catId condition: $condArray shipping: $shipArray distance: $distance postalCode: $postalCode")

        val url =
            "${URL.BackendUrl.url}/ebay/findAllItems?trackingId=$trackingId&keywords=$keyword&category=$catId&condition=$condArray&shipping=$shipArray&distance=$distance&postalCode=$postalCode"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Response is: $response")
                updateAllItemResponseState(response)

            },
            { logger.info("That didn't work!") })

        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)

    }

    fun findItemDetails(
        view:View,
        itemId:String,
        updateItemDetailsResponseState: (response:String)->Unit
    ){
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Find Item Details API call with $trackingId")

        val url =
            "${URL.BackendUrl.url}/ebay/findItem?trackingId=$trackingId&itemId=$itemId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Find Item Details Response with trackingId $trackingId is: $response")
                updateItemDetailsResponseState(response)

            },
            { error ->
                logger.error("Error occurred with trackingId $trackingId: ${error.message}")
            }
        )

        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)
    }

    fun findSimilarItems(
        view:View,
        itemId:String,
        updateSimilarItemsResponseState: (response:String)->Unit
    ){
        val trackingId = UUID.randomUUID().toString()
        logger.info("Making backend Find Similar Items API call with $trackingId and itemId $itemId")

        val url =
            "${URL.BackendUrl.url}/ebay/getSimilarItems?trackingId=$trackingId&itemId=$itemId"

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                logger.info("Find Similar Items Response with trackingId $trackingId is: $response")
                updateSimilarItemsResponseState(response)

            },
            { error ->
                logger.error("Error occurred with trackingId $trackingId: ${error.message}")
            }
        )

        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)
    }

}