package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.webtech.androidui.R
import org.slf4j.LoggerFactory

/**
 * A simple [Fragment] subclass.
 * Use the [zip_code_fragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ZipCodeFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ZipCodeFragment::class.java)


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        logger.info("Inflate the layout for zipcode fragment fragment")
        return inflater.inflate(R.layout.zip_code_fragment, container, false)
    }


}