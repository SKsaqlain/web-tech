package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.webtech.androidui.R

class ProductSearchFragment : Fragment() {
    companion object {
        fun newInstance(): ProductSearchFragment {
            return ProductSearchFragment()
        }
    }


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(
                R.layout.form_search_fragment,
                container,
                false)

    }
}