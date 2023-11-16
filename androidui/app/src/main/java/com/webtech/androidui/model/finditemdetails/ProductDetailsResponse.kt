package com.webtech.androidui.model.finditemdetails


data class ProductDetailsResponse(
    val productImages: List<String>,
    val price: Double,
    val location: String,
    val returnPolicy: String,
    val itemSpecifics: List<ItemSpecific>
)

data class ItemSpecific(
    val name: String,
    val value: String
)