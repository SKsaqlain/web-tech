package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.Spinner
import androidx.fragment.app.Fragment
import com.webtech.androidui.R

import org.slf4j.LoggerFactory

class ProductSearchFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)

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


    fun spinnerAdapter( view: View) {
        val spinner: Spinner = view.findViewById(R.id.category)
        val adapter = ArrayAdapter.createFromResource(
            spinner.context,
            R.array.categories,
            android.R.layout.simple_spinner_item
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinner.adapter = adapter
    }

    fun extractFormValues(view:View): Map<String, Any> {
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
        val checkBoxNew: CheckBox = view.findViewById(R.id.checkBoxNew)
        val checkBoxUsed: CheckBox = view.findViewById(R.id.checkBox4)
        val checkBoxUnspecified: CheckBox = view.findViewById(R.id.checkBox3)

        val checkBoxNewValue = checkBoxNew.isChecked
        val checkBoxUsedValue = checkBoxUsed.isChecked
        val checkBoxUnspecifiedValue = checkBoxUnspecified.isChecked

        values["checkBoxNew"] = checkBoxNewValue
        values["checkBoxUsed"] = checkBoxUsedValue
        values["checkBoxUnspecified"] = checkBoxUnspecifiedValue

        // Extract values from other CheckBoxes
        val checkBoxLocalPickup: CheckBox = view.findViewById(R.id.checkBoxLocalPickup)
        val checkBoxFreeShipping: CheckBox = view.findViewById(R.id.checkBoxFreeShipping)
        val checkBoxLocalPickupValue = checkBoxLocalPickup.isChecked
        val checkBoxFreeShippingValue = checkBoxFreeShipping.isChecked
        values["checkBoxLocalPickup"] = checkBoxLocalPickupValue
        values["checkBoxFreeShipping"] = checkBoxFreeShippingValue

        // Extract values from enableNearbySearch CheckBox
        val enableNearbySearch: CheckBox = view.findViewById(R.id.enableNearbySearch)
        val enableNearbySearchValue = enableNearbySearch.isChecked
        values["enableNearbySearch"] = enableNearbySearchValue

        return values
    }
    fun addOnSearchClink(view: View){
        val searchButton: Button = view.findViewById(R.id.searchBtn)
        searchButton.setOnClickListener {
            logger.info("Search button clicked")
            val formValues= extractFormValues(view)
            logger.info("formValues: $formValues")

        }
    }



    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        logger.info("ProductSearchFragment onViewCreated")

        spinnerAdapter(view)
        addOnSearchClink(view)

    }
}