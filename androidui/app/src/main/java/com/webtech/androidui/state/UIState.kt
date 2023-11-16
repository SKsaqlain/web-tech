package com.webtech.androidui.state

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.model.finditemdetails.ProductDetailsResponse

class UIState: ViewModel() {
    //form state
    val currentZipCode=MutableLiveData<String>()
    val nearByZipCodes=MutableLiveData<Array<String>>()
    fun setCurrentZipCode(currentZipCode: String) {
        this.currentZipCode.value = currentZipCode
    }

    fun setNearByZipCodes(nearByZipCodes: Array<String>) {
        this.nearByZipCodes.value = nearByZipCodes
    }

    //product search state
    val findAllItemResponse = MutableLiveData<List<FindAllItemResponse>>()
    val allItemProgressBar=MutableLiveData<Boolean>(true)
    fun setFindAllItemResponse(findAllItemResponse: List<FindAllItemResponse>) {
        this.findAllItemResponse.value = findAllItemResponse
    }

    fun setAllItemProgressBar(allItemProgressBar: Boolean) {
        this.allItemProgressBar.value = allItemProgressBar
    }


    //product details state
    val productDetails=MutableLiveData<FindAllItemResponse>()
    val productDetailsItemId=MutableLiveData<String>()
    val productDetailsResponse=MutableLiveData<ProductDetailsResponse>()
    fun setProductDetails(productDetails: FindAllItemResponse) {
        this.productDetails.value = productDetails
    }
    fun setProductDetailsItemId(productDetailsItemId: String) {
        this.productDetailsItemId.value = productDetailsItemId
    }
    fun setProductDetailsResponse(productDetailsResponse: ProductDetailsResponse) {
        this.productDetailsResponse.value = productDetailsResponse
    }


}