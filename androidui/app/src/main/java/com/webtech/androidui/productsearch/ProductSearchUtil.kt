package com.webtech.androidui.productsearch

import android.view.View
import android.widget.CheckBox
import android.widget.EditText
import android.widget.Spinner
import com.webtech.androidui.R

class ProductSearchUtil {
    fun extractFormValues(view: View): Map<String, Any> {
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



        //todo: add logic for distance calculation
        values["distance"]=10

        //todo: add logic for postal code
        values["postalCode"]="90007"


        return values
    }
}