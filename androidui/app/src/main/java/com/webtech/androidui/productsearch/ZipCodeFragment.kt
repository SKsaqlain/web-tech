package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.RadioButton
import android.widget.TextView
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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        logger.info("onViewCreated for zipcode fragment")
        addOnCurrentLocationClickListener(view)
        addOnZipCodeClickListener(view)

    }

    private fun addOnZipCodeClickListener(view: View) {
        val zipCodeButton: RadioButton = view.findViewById(R.id.zipCodeBtn)
        zipCodeButton.setOnClickListener {
            logger.info("ZipCode button clicked")
//            zipCodeButton.isChecked = true
            zipCodeButton.toggle()
            val zipcodeEditText: TextView = view.findViewById(R.id.enteredZipCode)
            zipcodeEditText.isEnabled = true
            val currentLocationButton: RadioButton = view.findViewById(R.id.currentLocationBtn)
            currentLocationButton.isChecked = false

        }

    }

    private fun addOnCurrentLocationClickListener(view: View) {
        val currentLocationButton: RadioButton = view.findViewById(R.id.currentLocationBtn)
        currentLocationButton.setOnClickListener {
            logger.info("Current Location button clicked")
//            currentLocationButton.isChecked = true
            currentLocationButton.toggle()
                val zipCodeRadioButton: RadioButton = view.findViewById(R.id.zipCodeBtn)
                zipCodeRadioButton.isChecked = false
                val zipcodeEditText: TextView = view.findViewById(R.id.enteredZipCode)
                zipcodeEditText.text = ""
                zipcodeEditText.isEnabled = false
        }
    }


}