package com.webtech.androidui.tabs

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.webtech.androidui.details.ProductDetailsFragment
import com.webtech.androidui.details.ProductPhotosFragment
import com.webtech.androidui.details.ProductShippingFragment
import com.webtech.androidui.details.ProductSimilarItemsFragment

class ProductDetailsTabAdaptor(fragment: Fragment) : FragmentStateAdapter(fragment){
    override fun getItemCount(): Int {
        return 4
    }

    override fun createFragment(position: Int): Fragment {
        return when(position){
            0-> ProductDetailsFragment()
            1-> ProductShippingFragment()
            2-> ProductPhotosFragment()
            3-> ProductSimilarItemsFragment()
            else -> throw IllegalArgumentException("Invalid position: $position")
        }
    }

}