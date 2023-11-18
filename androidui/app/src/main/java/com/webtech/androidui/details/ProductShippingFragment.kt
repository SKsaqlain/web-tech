package com.webtech.androidui.details

import android.graphics.Color
import android.graphics.ColorFilter
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.SpannableString
import android.text.style.URLSpan
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.HorizontalScrollView
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import androidx.lifecycle.ViewModelProvider
import com.webtech.androidui.R
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.model.SellerDetails
import com.webtech.androidui.model.ShippingDetails
import com.webtech.androidui.model.finditemdetails.ProductDetailsResponse
import com.webtech.androidui.state.UIState

class ProductShippingFragment : Fragment() {
    private val colorHexValues = mapOf(
        "None" to "#000000", // Black
        "Yellow" to "#FFFF00",
        "Blue" to "#0000FF",
        "Turquoise" to "#40E0D0",
        "Purple" to "#800080",
        "Red" to "#FF0000",
        "Green" to "#008000",
        "YellowShooting" to "#FFD700",
        "TurquoiseShooting" to "#00BFFF",
        "PurpleShooting" to "#A020F0",
        "RedShooting" to "#DC143C",
        "GreenShooting" to "#008000",
        "SilverShooting" to "#C0C0C0" // Silver
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun addLinkProperty(
        productDetails: FindAllItemResponse?,
        productDetailsResponse: ProductDetailsResponse?,
        sellerDetails: SellerDetails?,
        shipping: ShippingDetails?
    ) {
        val spannableString = SpannableString(sellerDetails?.storeName)
        val urlSpan = URLSpan(productDetails?.viewItemURL.toString())
        spannableString.setSpan(
            urlSpan,
            0,
            spannableString.length,
            SpannableString.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        view?.findViewById<TextView>(R.id.shippingStoreNameValue)?.text = spannableString

        view?.findViewById<TextView>(R.id.shippingStoreNameValue)?.movementMethod =
            android.text.method.LinkMovementMethod.getInstance()
    }
//    fun addScrollPropertyOnStoreName(){
//
//        val scrollView = view?.findViewById<HorizontalScrollView>(R.id.shippingStoreNameValueScroll)
//        val autoScroller= AutoScroller(scrollView!!)
//        var scrollHandler = Handler(Looper.getMainLooper())
//        val scrollRunnable = object : Runnable {
//            override fun run() {
//                scrollView?.smoothScrollBy(1, 0) // Scroll right by 1 pixel
//                scrollHandler.postDelayed(this, 10) // Repeat every 10 milliseconds
//            }
//        }
//
//        view?.findViewById<TextView>(R.id.shippingStoreNameValue)?.setOnHoverListener { v, event ->
//            when (event.action) {
//                MotionEvent.ACTION_HOVER_ENTER -> {
//                    // Start auto-scrolling
//                    autoScroller.startAutoScrolling()
//                    true
//                }
//                MotionEvent.ACTION_HOVER_EXIT -> {
//                    // Stop auto-scrolling
//                    autoScroller.stopAutoScrolling()
//                    true
//                }
//                else -> false
//            }
//        }
//    }

    // TODO: fix horizontal scroll

    fun updateShippingFragmentWithValues() {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val productDetails = uiState.productDetails.value
        val productDetailsResponse = uiState.productDetailsResponse.value
        val shipping = productDetails?.shippingDetails
        val sellerDetails = productDetails?.sellerDetails
        //sold by details

        addLinkProperty(productDetails, productDetailsResponse, sellerDetails, shipping)
//        addScrollPropertyOnStoreName()

        view?.findViewById<TextView>(R.id.shippingFeedbackScoreValue)?.text =
            sellerDetails?.feedBackScore.toString()

        view?.findViewById<ProgressBar>(R.id.shippingPopularityProgressBar)?.progress =
            sellerDetails?.popularity?.toFloat()?.toInt() ?: 0
        view?.findViewById<TextView>(R.id.shippingPopularityValue)?.text =
            sellerDetails?.popularity.toString()+"%"


        view?.findViewById<ImageView>(R.id.shippingFeedbackStarImg)?.setColorFilter(Color.parseColor(colorHexValues.get(sellerDetails?.feedbackRatingStar.toString())))


        //shipping info
        view?.findViewById<TextView>(R.id.shippingCostValue)?.text =
            shipping?.shippingCost.toString()
        view?.findViewById<TextView>(R.id.shippingGlobalShippingValue)?.text =
            shipping?.shippingLocation.toString()
        view?.findViewById<TextView>(R.id.shippingHandlingTimeValue)?.text =
            shipping?.handlingTime.toString()


        //return policy
        view?.findViewById<TextView>(R.id.returnPolicyPolicyValue)?.text =
            productDetailsResponse?.returnPolicy?.policy.toString()
        view?.findViewById<TextView>(R.id.returnPolicyWithinValue)?.text =
            productDetailsResponse?.returnPolicy?.returnsWithin.toString()
        view?.findViewById<TextView>(R.id.returnPolicyRefundValue)?.text =
            productDetailsResponse?.returnPolicy?.refundMode.toString()
        view?.findViewById<TextView>(R.id.returnPolicyShippingByValue)?.text =
            productDetailsResponse?.returnPolicy?.shippingCostPaidBy.toString()


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