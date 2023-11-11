package com.webtech.androidui.modal

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class UIState: ViewModel() {
    val findAllItemResponse = MutableLiveData<String>()
    fun setFindAllItemResponse(findAllItemResponse: String) {
        this.findAllItemResponse.value = findAllItemResponse
    }
}