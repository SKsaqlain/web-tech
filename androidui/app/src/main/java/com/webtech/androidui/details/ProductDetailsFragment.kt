package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.R
import com.webtech.androidui.model.finditemdetails.ProductDetailsResponse
import com.webtech.androidui.services.ebay.EbayService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ProductDetailsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ProductDetailsFragment : Fragment() {

    private val logger= LoggerFactory.getLogger(ProductDetailsFragment::class.java)
    private val ebayService=EbayService()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun updateProductDetailsState(response:String){
        logger.info("updating product details state")
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val gson = Gson()
        val itemType = object : TypeToken<ProductDetailsResponse>() {}.type
        val productDetailsResponse: ProductDetailsResponse = gson.fromJson(response, itemType)
        uiState.setProductDetailsResponse(productDetailsResponse)

    }
    fun fetchProductDetails(itemId: String) {
        logger.info("Fetching product details for item id: $itemId")
        view?.let { ebayService.findItemDetails(it,itemId,::updateProductDetailsState) }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.product_details_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        fetchProductDetails(uiState.productDetailsItemId.value!!)
    }
}