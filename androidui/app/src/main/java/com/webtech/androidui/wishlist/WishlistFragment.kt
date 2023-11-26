package com.webtech.androidui.wishlist

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.GridView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.cardview.widget.CardView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
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
import java.math.RoundingMode
import kotlin.math.roundToLong

class WishlistFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(WishlistFragment::class.java)
    private val mongoDbService = MongoDbService()
    private var view: View? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        view = inflater.inflate(
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
        val recycleView: RecyclerView = view.findViewById(R.id.wishListRecycleView)
        val wishlistTotalLayout: LinearLayout = view.findViewById(R.id.wishlistTotalLayout)
        uiState.wishListResponse.observe(viewLifecycleOwner) { response ->
            if (response.isNullOrEmpty()) {
                recycleView.adapter = null
                val noResultsWishlistCardView: CardView =
                    view.findViewById(R.id.noResultsWishlistCardView)
                noResultsWishlistCardView.visibility = View.VISIBLE
                wishlistTotalLayout.visibility = View.INVISIBLE

//                Toast.makeText(
//                    requireContext(),
//                    "No items found",
//                    Toast.LENGTH_LONG
//                ).show()
                logger.info("No items found")
                return@observe
            }else{
                view?.findViewById<CardView>(R.id.noResultsWishlistCardView)?.visibility = View.INVISIBLE
                view?.findViewById<ConstraintLayout>(R.id.wishlistLayout)?.visibility= View.VISIBLE
                wishlistTotalLayout.visibility = View.VISIBLE
            }
            logger.info("Items found")

            val wishListAdapter = WishListAdapter(response, uiState)
            recycleView.layoutManager = GridLayoutManager(
                requireContext(),
                2,
                GridLayoutManager.VERTICAL,
                false
            )
            recycleView.adapter = wishListAdapter
            val itemCount = response.size
            val totalPrice = response.map { it.price.toFloat() }.sum().toBigDecimal()
                .setScale(2, RoundingMode.FLOOR).toDouble()

            val itemCountTextView: TextView = view.findViewById(R.id.wishlistTotalLabel)
            if (itemCount == 1) {
                itemCountTextView.text = "Wishlist Total($itemCount item)"
            } else {
                itemCountTextView.text = "Wishlist Total($itemCount items)"
            }
            val totalPriceTextView: TextView = view.findViewById(R.id.wishlistTotal)
            totalPriceTextView.text = "$${totalPrice}"
            view?.findViewById<CardView>(R.id.noResultsWishlistCardView)?.visibility = View.INVISIBLE
            view?.findViewById<ConstraintLayout>(R.id.wishlistLayout)?.visibility= View.VISIBLE
            wishlistTotalLayout.visibility = View.VISIBLE
        }

    }

    override fun onResume() {
        super.onResume()

//        view?.findViewById<CardView>(R.id.noResultsWishlistCardView)?.visibility = View.VISIBLE
//        view?.findViewById<ConstraintLayout>(R.id.wishlistLayout)?.visibility = View.INVISIBLE

        view?.let { mongoDbService.getAllWishListItems(it, ::updateWishListState) }

    }

}