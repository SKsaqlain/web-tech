package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val itemId = uiState.productDetails.value?.itemId
        if (itemId != null) {
            ebayService.findSimilarItems(view, itemId,::updateSimilarItems)
        }
        uiState.similarProductsResponse.observe(viewLifecycleOwner) {
            if (it == null)
                return@observe
            logger.info("Similar Products Response: $it")
            val similarItemsAdaptor = SimilarItemsAdaptor(it)
            val recyclerView = view.findViewById<RecyclerView>(R.id.similarProductView)
            recyclerView.layoutManager=LinearLayoutManager(context)
            recyclerView.setHasFixedSize(true)
            recyclerView.adapter = similarItemsAdaptor
        }


    }


}