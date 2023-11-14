package com.webtech.androidui.state

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.webtech.androidui.model.FindAllItemResponse

class UIState: ViewModel() {
    val findAllItemResponse = MutableLiveData<List<FindAllItemResponse>>()
    val currentZipCode=MutableLiveData<String>()
    fun setFindAllItemResponse(findAllItemResponse: List<FindAllItemResponse>) {
        this.findAllItemResponse.value = findAllItemResponse
    }

    fun setCurrentZipCode(currentZipCode: String) {
        this.currentZipCode.value = currentZipCode
    }
}