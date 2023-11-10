package com.webtech.androidui.productsearch

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import com.webtech.androidui.R

class ProductSearch(){

    fun spinnerAdapter( spinner: Spinner) {
        val adapter = ArrayAdapter.createFromResource(
            spinner.context,
            R.array.categories,
            android.R.layout.simple_spinner_item
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinner.adapter = adapter
    }

    fun addBtnOnClickListener(searchBtn: Button){}
}