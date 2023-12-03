package com.webtech.androidui.model

data class FindAllItemResponse(
    val itemId: String,
    val title: String,
    val image: String,
    val viewItemURL: String,
    val price: String,
    val shipping:String,
    val zip: String,
    //todo: add condition field in the backend
    val condition: String,
    val shippingDetails: ShippingDetails,
    val sellerDetails: SellerDetails,
    var isWishListed: Boolean
)


data class ShippingDetails(
    val shippingCost: String,
    val shippingLocation: String,
    val handlingTime: String,
    val expeditedShipping: String,
    val oneDayShipping: String,
    val returnsAccepted: String,
)

data class SellerDetails(
    val feedBackScore: String,
    val popularity: String,
    val feedbackRatingStar: String,
    val topRated: String,
    val storeName: String,
    val buyProductAt: String
)