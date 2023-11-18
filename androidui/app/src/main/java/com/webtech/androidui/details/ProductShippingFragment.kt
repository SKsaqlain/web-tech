package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.lifecycle.ViewModelProvider
import com.webtech.androidui.R
import com.webtech.androidui.state.UIState

class ProductShippingFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun updateShippingFragmentWithValues() {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val productDetails=uiState.productDetails.value
        val productDetailsResponse=uiState.productDetailsResponse.value
        val shipping=productDetails?.shippingDetails
        val sellerDetails=productDetails?.sellerDetails
        //sold by details
        view?.findViewById<TextView>(R.id.shippingStoreNameValue)?.text= sellerDetails?.storeName.toString()
        view?.findViewById<TextView>(R.id.shippingFeedbackScoreValue)?.text= sellerDetails?.feedBackScore.toString()
        view?.findViewById<TextView>(R.id.shippingPopularityValue)?.text= sellerDetails?.popularity.toString()
        view?.findViewById<TextView>(R.id.shippingFeedbackStarValue)?.text= sellerDetails?.feedbackRatingStar.toString()

        //shipping info
        view?.findViewById<TextView>(R.id.shippingCostValue)?.text= shipping?.shippingCost.toString()
        view?.findViewById<TextView>(R.id.shippingGlobalShippingValue)?.text= shipping?.shippingLocation.toString()
        view?.findViewById<TextView>(R.id.shippingHandlingTimeValue)?.text= shipping?.handlingTime.toString()


        //return policy
        view?.findViewById<TextView>(R.id.returnPolicyPolicyValue)?.text= productDetailsResponse?.returnPolicy?.policy.toString()
        view?.findViewById<TextView>(R.id.returnPolicyWithinValue)?.text= productDetailsResponse?.returnPolicy?.returnsWithin.toString()
        view?.findViewById<TextView>(R.id.returnPolicyRefundValue)?.text= productDetailsResponse?.returnPolicy?.refundMode.toString()
        view?.findViewById<TextView>(R.id.returnPolicyShippingByValue)?.text= productDetailsResponse?.returnPolicy?.shippingCostPaidBy.toString()


    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.product_shipping_fragment, container, false)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        updateShippingFragmentWithValues()
    }

}