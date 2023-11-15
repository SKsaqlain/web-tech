package com.webtech.androidui.state

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.webtech.androidui.model.FindAllItemResponse

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


    fun setFindAllItemResponse(findAllItemResponse: List<FindAllItemResponse>) {
        this.findAllItemResponse.value = findAllItemResponse
    }


}