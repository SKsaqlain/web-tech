package com.webtech.androidui.productsearch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.Spinner
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.webtech.androidui.R
import com.webtech.androidui.allitems.AllItemsFragment
import com.webtech.androidui.state.UIState
import com.webtech.androidui.services.ebay.EbayService
import org.slf4j.LoggerFactory


class ProductSearchFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)
    private val ebayService = EbayService()
    private val productSearchUtil = ProductSearchUtil()

//    private lateinit var communicator: Communicator

//    val uiState: UIState=ViewModelProvider(requireActivity()).get(UIState::class.java)


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
            false
        )

    }


    fun spinnerAdapter(view: View) {
        val spinner: Spinner = view.findViewById(R.id.category)
        val adapter = ArrayAdapter(
            spinner.context,
            android.R.layout.simple_spinner_item,
            ProductSearchConstants.categoryMap.keys.toList()
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinner.adapter = adapter
    }

    fun moveToAllItemsFragment(response: String) {
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        uiState.setFindAllItemResponse(response)
        val fragmentManager = parentFragmentManager
        val allItemsFragment = AllItemsFragment()
        val transaction = fragmentManager.beginTransaction()

//        transaction.replace(R.id.productSearchFragment, allItemsFragment)
        transaction.replace(R.id.productSearchPage, allItemsFragment).setReorderingAllowed(true)
            .addToBackStack("backStack")
        transaction.commit()
    }

    fun addOnSearchClick(view: View) {
        val searchButton: Button = view.findViewById(R.id.searchBtn)
        searchButton.setOnClickListener {
            logger.info("Search button clicked")
            val formValues = productSearchUtil.extractFormValues(view)
            logger.info("formValues: $formValues")
//            ebayService.healthCheck(view)
            ebayService.findAllItems(
                view,
                formValues["keyword"].toString(),
                formValues["category"].toString(),
                formValues["condition"] as Map<String, Boolean>,
                formValues["shipping"] as Map<String, Boolean>,
                formValues["distance"].toString(),
                formValues["postalCode"].toString(),
                ::moveToAllItemsFragment
            )
        }
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        logger.info("ProductSearchFragment onViewCreated")
        ebayService.healthCheck(view)
        spinnerAdapter(view)
        addOnSearchClick(view)


//        communicator=activity as Communicator

    }
}