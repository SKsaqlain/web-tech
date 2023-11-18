package com.webtech.androidui.model.finditemdetails


data class ProductDetailsResponse(
    val productImages: List<String>,
    val price: Double,
    val location: String,
    val returnPolicy: ReturnPolicy,
    val itemSpecifics: List<ItemSpecific>
)

data class ItemSpecific(
    val name: String,
    val value: String
)

data class ReturnPolicy(
    val policy: String,
    val refundMode: String,
    val returnsWithin: String,
    val returnsAccepted: String,
    val shippingCostPaidBy: String
)