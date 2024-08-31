package com.webtech.androidui.allitems

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.GridView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.cardview.widget.CardView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.R
import com.webtech.androidui.adaptor.FindAllItemAdaptor
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.state.UIState
import com.webtech.androidui.productsearch.ProductSearchFragment
import com.webtech.androidui.services.mongodb.MongoDbService
import org.slf4j.LoggerFactory

class AllItemsFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)
    private val mongoDbService = MongoDbService()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.all_items_fragment,
            container,
            false
        )

        return view
    }

    fun updateWishListState(response: String) {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val type = object : TypeToken<List<FindAllItemResponse>>() {}.type
        val wishListResponse: List<FindAllItemResponse> = Gson().fromJson(response, type)
        uiState.setWishListResponse(wishListResponse)
        uiState.wishListResponse.postValue(wishListResponse)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val progressBarFragment = view.findViewById<LinearLayout>(R.id.allItemsProgressBarLayout)
        val noResultsAllItemsCardView = view.findViewById<CardView>(R.id.noResultsAllItemsCardView)
        val gridView: GridView = view.findViewById(R.id.allItemsGridView)

        uiState.allItemProgressBar.observe(viewLifecycleOwner) { progressBar ->
            val progressBarFragment = view.findViewById<LinearLayout>(R.id.allItemsProgressBarLayout)
            val gridView: GridView = view.findViewById(R.id.allItemsGridView)
            if (progressBar) {
                noResultsAllItemsCardView.visibility = View.INVISIBLE
                progressBarFragment.visibility = View.VISIBLE
                gridView.visibility = View.INVISIBLE

            } else {
                progressBarFragment.visibility = View.INVISIBLE
                noResultsAllItemsCardView.visibility = View.VISIBLE
                gridView.visibility = View.VISIBLE
            }
        }

        uiState.findAllItemResponse.observe(viewLifecycleOwner) { response ->
            if (response == null || response.isEmpty()) {
                return@observe
            }

            noResultsAllItemsCardView.visibility = View.INVISIBLE
            logger.info("Response is: $response")
            gridView.visibility = View.VISIBLE
            val adapter = FindAllItemAdaptor(response, requireContext(), parentFragmentManager)
            val gridView: GridView = view.findViewById(R.id.allItemsGridView)
            gridView.adapter = adapter
        }
        mongoDbService.getAllWishListItems(view, ::updateWishListState)
        uiState.wishListResponse.observe(viewLifecycleOwner) { response ->
            if (response == null || response.isEmpty()) {
                return@observe
            }

            logger.info("Response is: $response")
            val allItemResponse=uiState.findAllItemResponse.value
            for (item in allItemResponse!!) {
                for (wishListItem in response) {
                    if (item.itemId == wishListItem.itemId) {
                        item.isWishListed = true
                    }
                }
            }
            uiState.findAllItemResponse.postValue(allItemResponse)

        }

        val goBackBtn: ImageView = view.findViewById(R.id.allItemsBackArrow)
        goBackBtn.setOnClickListener() {
            logger.info("Go back button clicked on all items fragment")
            parentFragmentManager.popBackStack()
            uiState.setAllItemProgressBar(true)
            uiState.setFindAllItemResponse(emptyList())
            noResultsAllItemsCardView.visibility = View.INVISIBLE
        }
    }
}