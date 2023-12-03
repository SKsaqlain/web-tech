package com.webtech.androidui.services.ebay

class EbayServiceUtil {
    companion object{
        val categoryOptions = mutableMapOf<Int,String>(
            1 to "All Categories",
            2 to "Art",
            3 to "Baby",
            4 to "Books",
            5 to "Clothing,Shoes & Accessories",
            6 to "Health & Beauty",
            7 to "Music",
            8 to "Video Games & Console"
        );
    }

    fun getCategoryId(category:String):String{
        return categoryOptions.filterValues { it == category }.values.first()
    }

    fun filterCondition(condition:Map<String,Boolean>):List<String>{
        val conditionList = mutableListOf<String>()
        condition.forEach{
            if(it.value){
                conditionList.add(it.key)
            }
        }
        return conditionList
    }

    fun filterShipping(shipping:Map<String,Boolean>):List<String>{
        val shippingList = mutableListOf<String>()
        shipping.forEach{
            if(it.value){
                shippingList.add(it.key)
            }
        }
        return shippingList
    }




}