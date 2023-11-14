package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioButton
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.webtech.androidui.R
import com.webtech.androidui.model.currentzipcode.CurrentZipCode
import com.webtech.androidui.services.zipcode.ZipCodeService
import org.slf4j.LoggerFactory

import com.google.gson.Gson
import com.webtech.androidui.state.UIState

/**
 * A simple [Fragment] subclass.
 * Use the [zip_code_fragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ZipCodeFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ZipCodeFragment::class.java)
    private val zipCodeService = ZipCodeService()


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
        defaultBehaviour(view)
    }

    private fun defaultBehaviour(view: View) {
        logger.info("defaultBehaviour onload for zipcode fragment")
        val currentLocationButton: RadioButton = view.findViewById(R.id.currentLocationBtn)
        currentLocationButton.performClick()

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

    private fun updateCurrentZipCodeState(response: String) {
        logger.info("updateCurrentZipCodeState")
        val gson = Gson()
        val currentZipCode = gson.fromJson(response, CurrentZipCode::class.java)
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        uiState.setCurrentZipCode(currentZipCode.postal)
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
            val zipCodeErrorMessage=view.findViewById<TextView>(R.id.enteredZipCodeErrorMessage)
            zipCodeErrorMessage.visibility=View.GONE
            zipCodeService.getCurrentZipCode(view, ::updateCurrentZipCodeState)
        }
    }


}