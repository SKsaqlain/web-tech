package com.webtech.androidui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.FragmentContainerView
import com.webtech.androidui.productsearch.ProductSearchFragment


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        if (findViewById<FragmentContainerView>(R.id.productSearchFragment) != null) {
            if (savedInstanceState == null) {
                supportFragmentManager.beginTransaction()
                    .replace(R.id.productSearchFragment, ProductSearchFragment())
                    .commit()
            }
        }
    }


}