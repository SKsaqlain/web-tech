package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.webtech.androidui.R
import com.webtech.androidui.tabs.ProductDetailsTabAdaptor

class ProductFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.product_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val viewPager = view.findViewById<ViewPager2>(R.id.productDetailsPager)
        val tabLayout=view.findViewById<TabLayout>(R.id.productTabLayout)
        val adapter= ProductDetailsTabAdaptor(this)
        viewPager.adapter = adapter
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "PRODUCT"
                1 -> "SHIPPING"
                2 -> "PHOTOS"
                3 -> "SIMILAR ITEMS"
                else -> null
            }
        }.attach()
    }
}
