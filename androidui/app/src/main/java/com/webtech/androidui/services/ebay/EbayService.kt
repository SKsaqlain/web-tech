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
//    private val serverUrl = "https://sms-wt-assgn3.uw.r.appspot.com"
    private val serverUrl = "http://10.0.2.2:8080"
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
        moveToAllItemsFragment: (response:String)->Unit
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
                moveToAllItemsFragment(response)

            },
            { logger.info("That didn't work!") })

        val requestQueue = Volley.newRequestQueue(view.context)
        requestQueue.add(stringRequest)

    }

}