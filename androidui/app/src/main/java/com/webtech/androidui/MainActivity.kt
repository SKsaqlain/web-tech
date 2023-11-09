package com.webtech.androidui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.webtech.androidui.productsearch.ProductSearch


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
        setContentView(R.layout.form_search_fragment)
        val productSearch: ProductSearch = ProductSearch()
        productSearch.spinnerAdapter(findViewById(R.id.category))
    }
}