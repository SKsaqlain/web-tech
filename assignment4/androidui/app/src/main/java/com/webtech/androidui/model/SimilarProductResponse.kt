package com.webtech.androidui.model

data class SimilarProductResponse(
    val itemId: String,
    val productName: String,
    val imageURL: String,
    val viewItemURL: String,
    val price: String,
    val shippingCost: String,
    val daysLeft: String
)
