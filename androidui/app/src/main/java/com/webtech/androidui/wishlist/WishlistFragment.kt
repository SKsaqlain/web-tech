package com.webtech.androidui.wishlist

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.GridView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.RecyclerView
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.R
import com.webtech.androidui.adaptor.FindAllItemAdaptor
import com.webtech.androidui.adaptor.WishListAdapter
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.services.mongodb.MongoDbService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory

class WishlistFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(WishlistFragment::class.java)
    private val mongoDbService = MongoDbService()
    private var view:View?=null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        view =inflater.inflate(
            R.layout.wishlist_fragment,
            container,
            false
        )
        return view
    }

    private fun updateWishListState(response: String) {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val type = object : TypeToken<List<FindAllItemResponse>>() {}.type
        val wishListResponse: List<FindAllItemResponse> = Gson().fromJson(response, type)
        uiState.setWishListResponse(wishListResponse)
        uiState.wishListResponse.postValue(wishListResponse)

//        val recycleView: RecyclerView? = view?.findViewById(R.id.wishListRecycleView)
//        val wishListAdapter = WishListAdapter(wishListResponse,uiState)
//        recycleView?.layoutManager  = androidx.recyclerview.widget.GridLayoutManager(requireContext(), 2, androidx.recyclerview.widget.GridLayoutManager.VERTICAL, false)
//        recycleView.adapter = wishListAdapter

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
//        mongoDbService.getAllWishListItems(view, ::updateWishListState)
        val recycleView: RecyclerView = view.findViewById(R.id.wishListRecycleView)

        uiState.wishListResponse.observe(viewLifecycleOwner) { response ->
            if (response == null) {
                Toast.makeText(
                    requireContext(),
                    "No items found",
                    Toast.LENGTH_LONG
                ).show()
                logger.info("No items found")
                return@observe
            }
            logger.info("Items found")

//            val adapter = FindAllItemAdaptor(response, requireContext(), parentFragmentManager)
//            gridView.adapter = adapter
            val wishListAdapter = WishListAdapter(response, uiState)
            recycleView.layoutManager = androidx.recyclerview.widget.GridLayoutManager(
                requireContext(),
                2,
                androidx.recyclerview.widget.GridLayoutManager.VERTICAL,
                false
            )
            recycleView.adapter = wishListAdapter

        }
    }

    override fun onResume() {
        super.onResume()
        view?.let { mongoDbService.getAllWishListItems(it, ::updateWishListState) }

    }

}