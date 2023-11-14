package com.webtech.androidui.productsearch

import android.view.View
import android.widget.CheckBox
import android.widget.EditText
import android.widget.RadioButton
import android.widget.Spinner
import android.widget.TextView
import androidx.fragment.app.FragmentManager
import com.webtech.androidui.R
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory

class ProductSearchUtil {
    private val logger = LoggerFactory.getLogger(ProductSearchUtil::class.java)
    fun extractFormValues(view: View, uiState: UIState): Map<String, Any> {
        val values = mutableMapOf<String, Any>()

        // Extract values from EditText
        val keywordEditText: EditText = view.findViewById(R.id.keyword)
        val keywordValue = keywordEditText.text.toString()
        values["keyword"] = keywordValue

        // Extract values from Spinner
        val categorySpinner: Spinner = view.findViewById(R.id.category)
        val categoryValue = categorySpinner.selectedItem.toString()
        values["category"] = categoryValue

        // Extract values from CheckBoxes
        val checkBox= mutableMapOf<String,Boolean>()
        checkBox["New"]=view.findViewById<CheckBox?>(R.id.checkBoxNew).isChecked
        checkBox["Used"]=view.findViewById<CheckBox?>(R.id.checkBoxUsed).isChecked
        values["condition"]=checkBox



        // Extract values from other CheckBoxes
        val shipping= mutableMapOf<String,Boolean>()
        shipping["Free-Shipping"]=view.findViewById<CheckBox?>(R.id.checkBoxFreeShipping).isChecked
        shipping["Local-Pickup"]=view.findViewById<CheckBox?>(R.id.checkBoxLocalPickup).isChecked
        values["shipping"]=shipping


        val nearbySearch= view.findViewById<CheckBox?>(R.id.enableNearbySearch).isChecked
        if(nearbySearch==false){
            values["distance"]=10
            values["postalCode"]=uiState.currentZipCode.value.toString()
        }
        else{
            values["distance"]=view.findViewById<EditText?>(R.id.distance).text.toString()
            if(values["distance"].toString().isEmpty())
                values["distance"]=10
            else if(values["distance"].toString().isNotEmpty() && view.findViewById<EditText?>(R.id.distance).text.toString().toInt()<10)
                values["distance"]=10
            else
                values["distance"]=view.findViewById<EditText?>(R.id.distance).text.toString()

            val currentLocation= view.findViewById<RadioButton>(R.id.currentLocationBtn).isChecked
            if(currentLocation==true)
                values["postalCode"]=uiState.currentZipCode.value.toString()
            else{
                values["postalCode"]=view.findViewById<EditText?>(R.id.enteredZipCode).text.toString()
            }
        }
//
//        //todo: add logic for distance calculation
//
//        values["distance"]=10
//
//        //todo: add logic for postal code
//
//        values["postalCode"]=uiState.currentZipCode


        return values
    }

    fun validateForm(formValues: Map<String, Any>, view: View): Boolean {
        val keywordErrorMessage=view.findViewById<TextView>(R.id.keywordErrorMessage)

        if(formValues["keyword"].toString().isEmpty()){
            logger.info("keyword is Empty displaying error message")
            keywordErrorMessage.visibility=View.VISIBLE
            return false
        }
        else if (formValues["keyword"].toString().isNotEmpty()){
            logger.info("keyword is not Empty")
            keywordErrorMessage.visibility=View.GONE
        }
        return true
    }

}