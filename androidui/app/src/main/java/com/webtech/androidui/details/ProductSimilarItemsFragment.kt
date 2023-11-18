package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.R
import com.webtech.androidui.adaptor.SimilarItemsAdaptor
import com.webtech.androidui.model.SimilarProductResponse
import com.webtech.androidui.model.google.GoogleImageResponse
import com.webtech.androidui.services.ebay.EbayService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory

class ProductSimilarItemsFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductSimilarItemsFragment::class.java)
    private val ebayService = EbayService()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.product_similar_items_fragment, container, false)
    }

    fun updateSimilarItems(response: String) {
        val gson = Gson()
        val itemType = object : TypeToken<List<SimilarProductResponse>>() {}.type
        val similarProductsResponse: List<SimilarProductResponse> =
            gson.fromJson(response, itemType)
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        uiState.setSimilarProductsResponse(similarProductsResponse)
    }

    fun sortData(spinnerSortMethod: Spinner, spinnerSortOrder: Spinner) {
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val sortMethod = spinnerSortMethod.selectedItem.toString()
        val sortOrder = spinnerSortOrder.selectedItem.toString()

        val sortedList = uiState.similarProductsResponse.value?.sortedWith(Comparator { o1, o2 ->
            when (sortMethod) {
                "Price" -> compareValuesBy(o1, o2, { it.price.toDouble() })
                "Name" -> compareValuesBy(o1, o2, { it.productName })
                "Days" -> compareValuesBy(o1, o2, { it.daysLeft.toInt() })
                else -> 0
            }
        })

        if (sortOrder == "Descending") {
            sortedList?.reversed()
        }

        uiState.similarProductsResponse.postValue(sortedList)
    }


    fun createSortDropDown(view: View) {
        logger.info("Creating Sort Drop Down for similar items")
        val spinnerSortMethod: Spinner = view.findViewById(R.id.spinnerSortMethod)
        val spinnerSortOrder: Spinner = view.findViewById(R.id.spinnerSortOrder)


        val sortMethods = arrayOf("Default", "Name", "Price", "Days")
        val sortOrders = arrayOf("Ascending", "Descending")


        val adapterSortMethods =
            ArrayAdapter(requireContext(), android.R.layout.simple_spinner_item, sortMethods)
        adapterSortMethods.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerSortMethod.adapter = adapterSortMethods

        val adapterSortOrders =
            ArrayAdapter(requireContext(), android.R.layout.simple_spinner_item, sortOrders)
        adapterSortOrders.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerSortOrder.adapter = adapterSortOrders

        spinnerSortMethod.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                sortData(spinnerSortMethod, spinnerSortOrder)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }

        spinnerSortOrder.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                sortData(spinnerSortMethod, spinnerSortOrder)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }


    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        createSortDropDown(view)
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val itemId = uiState.productDetails.value?.itemId
        if (itemId != null) {
            ebayService.findSimilarItems(view, itemId, ::updateSimilarItems)
        }
        uiState.similarProductsResponse.observe(viewLifecycleOwner) {
            if (it == null)
                return@observe
            logger.info("Similar Products Response: $it")
            val similarItemsAdaptor = SimilarItemsAdaptor(it)
            val recyclerView = view.findViewById<RecyclerView>(R.id.similarProductView)
            recyclerView.layoutManager = LinearLayoutManager(context)
            recyclerView.setHasFixedSize(true)
            recyclerView.adapter = similarItemsAdaptor
        }


    }


}