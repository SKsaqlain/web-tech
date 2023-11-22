package com.webtech.androidui.details

import android.content.Intent
import android.graphics.PorterDuff
import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.google.gson.Gson
import com.webtech.androidui.R
import com.webtech.androidui.services.mongodb.MongoDbService
import com.webtech.androidui.state.UIState
import com.webtech.androidui.tabs.ProductDetailsTabAdaptor
import org.slf4j.LoggerFactory

class ProductFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductFragment::class.java)
    private val mongoDbService = MongoDbService()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun extItemDetailsForItemIdAndSetState(itemId: String) {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val allItems = uiState.findAllItemResponse.value
        val itemDetails = allItems?.filter { item -> item.itemId == itemId }
        uiState.setProductDetails(itemDetails!![0])
        uiState.setProductDetailsItemId(itemId!!)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val arguments = requireArguments()
        val itemId= arguments.getString("itemId")
        logger.info("Item click with Item id: $itemId")
        extItemDetailsForItemIdAndSetState(itemId!!)
        return inflater.inflate(R.layout.product_fragment, container, false)
    }

    fun trimTitle(title: String): String {
        var trimmedTitle = title
        if (title.length > 21) {
            trimmedTitle = title.substring(0, 21) + "..."
        }
        return trimmedTitle
    }

    fun enableProgressBar(){
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val progressBar = view?.findViewById<LinearLayout>(R.id.productDetailsProgressBarLayout)
        progressBar?.visibility = View.VISIBLE

        val productTabLayout=view?.findViewById<TabLayout>(R.id.productTabLayout)
        productTabLayout?.visibility=View.INVISIBLE
        val viewPager = view?.findViewById<ViewPager2>(R.id.productDetailsPager)
        viewPager?.visibility=View.INVISIBLE
        val productDetailsWishListBtn=view?.findViewById<ImageView>(R.id.productDetailsWishListBtn)
        productDetailsWishListBtn?.visibility=View.INVISIBLE
    }

    fun disableProgressBar() {
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val progressBar = view?.findViewById<LinearLayout>(R.id.productDetailsProgressBarLayout)
        progressBar?.visibility = View.INVISIBLE

        val productTabLayout = view?.findViewById<TabLayout>(R.id.productTabLayout)
        productTabLayout?.visibility = View.VISIBLE
        val viewPager = view?.findViewById<ViewPager2>(R.id.productDetailsPager)
        viewPager?.visibility = View.VISIBLE
        val productDetailsWishListBtn =
            view?.findViewById<ImageView>(R.id.productDetailsWishListBtn)
        productDetailsWishListBtn?.visibility = View.VISIBLE
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val viewPager = view.findViewById<ViewPager2>(R.id.productDetailsPager)
        val tabLayout=view.findViewById<TabLayout>(R.id.productTabLayout)
        val adapter= ProductDetailsTabAdaptor(this)
        viewPager.adapter = adapter
        viewPager.isUserInputEnabled = false
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "PRODUCT"
                1 -> "SHIPPING"
                2 -> "PHOTOS"
                3 -> "SIMILAR"
                else -> null
            }
            tab.icon=when(position){
                0->resources.getDrawable(R.drawable.productinfo)
                1->resources.getDrawable(R.drawable.shipping)
                2->resources.getDrawable(R.drawable.photos)
                3->resources.getDrawable(R.drawable.similar)
                else->null
            }

        }.attach()

        val defaultTabIconColor = ContextCompat.getColor(requireContext(), R.color.unselectedTabColor)
        val selectedTabIconColor = ContextCompat.getColor(requireContext(), R.color.selectedTabColor)

        for (i in 0 until tabLayout.tabCount) {
            tabLayout.getTabAt(i)?.icon?.setColorFilter(defaultTabIconColor, PorterDuff.Mode.SRC_IN)
        }
        tabLayout.getTabAt(0)?.icon?.setColorFilter(selectedTabIconColor, PorterDuff.Mode.SRC_IN)

        tabLayout.addOnTabSelectedListener(
            object : TabLayout.OnTabSelectedListener {
                override fun onTabSelected(tab: TabLayout.Tab) {
                    val tabIconColor = ContextCompat.getColor(requireContext(), R.color.selectedTabColor)
                    tab.icon?.setColorFilter(tabIconColor, PorterDuff.Mode.SRC_IN)
                }

                override fun onTabUnselected(tab: TabLayout.Tab) {
                    val tabIconColor = ContextCompat.getColor(requireContext(), R.color.unselectedTabColor)
                    tab.icon?.setColorFilter(tabIconColor, PorterDuff.Mode.SRC_IN)
                }

                override fun onTabReselected(tab: TabLayout.Tab) {
                    logger.info("Tab reselected: ${tab.text}")
                }
            }
        )

        val goBackBtn: ImageView = view.findViewById(R.id.productDetailsGoBackBtn)
        goBackBtn.setOnClickListener() {
            logger.info("Go back button clicked on all items fragment")
            parentFragmentManager.popBackStack()
            val uiState=ViewModelProvider(requireActivity()).get(UIState::class.java)
            uiState.setProductDetailsProgressBar(true)
            enableProgressBar()

        }

        val productTitle=view.findViewById<TextView>(R.id.productDetailsTitle)
        val title=ViewModelProvider(requireActivity()).get(UIState::class.java).productDetails.value?.title
        if(title!=null)
            productTitle.text=trimTitle(title)
        else
            productTitle.text="Product Title"


        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val productDetailsProgressBar=uiState.productDetailsProgressBar
        productDetailsProgressBar.observe(viewLifecycleOwner) { progressBar ->
            if (progressBar) {
                enableProgressBar()
            } else {
                disableProgressBar()
            }
        }
        val wishListBtn=view.findViewById<ImageView>(R.id.productDetailsWishListBtn)
        if(uiState.productDetails.value?.isWishListed==true){
            wishListBtn.setImageResource(R.drawable.cart_remove_icon)
        }else{
            wishListBtn.setImageResource(R.drawable.cart_icon)
        }
        wishListBtn.setOnClickListener(){
            logger.info("WishList button clicked on product details fragment")
            val itemId=uiState.productDetailsItemId.value
            val item=uiState.productDetails.value
            if(uiState.productDetails.value?.isWishListed==true){
                if(itemId!=null && item!=null){
                    item.isWishListed=false
                    mongoDbService.removeFromWishList(view,itemId)
                    logger.info("Item removed from wishList with itemId: $itemId")
                }
                updateWishListState(uiState,itemId!!,false)
                wishListBtn.setImageResource(R.drawable.cart_icon)
            }else{
                if(itemId!=null && item!=null){
                    item.isWishListed=true
                    val gson= Gson()
                    val payload:String =gson.toJson(item)
                    mongoDbService.addToWishList(view,payload)
                    logger.info("Item added to wishList with itemId: $itemId")
                }
                updateWishListState(uiState,itemId!!,true)
                wishListBtn.setImageResource(R.drawable.cart_remove_icon)
            }
            uiState.setProductDetails(item!!)
        }

        val fgImg=view.findViewById<ImageView>(R.id.productDetailsFacebookBtn)
        fgImg.setOnClickListener(){
            logger.info("Facebook button clicked on product details fragment")
            val itemUrl:String=uiState.productDetails.value?.viewItemURL!!
            if(itemUrl!=null){
                val url="https://www.facebook.com/sharer/sharer.php?u="+itemUrl+"&amp;src=sdkpreparse"
                val urlIntent= Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse(url)
                )
                this.startActivity(urlIntent)
            }
        }


    }

    private fun updateWishListState(uiState: UIState, itemId: String,wishListState:Boolean) {
        val findAllItemResponse = uiState.findAllItemResponse.value
        val itemDetails = findAllItemResponse?.map { item -> if (item.itemId == itemId) item.copy(isWishListed = wishListState) else item }
        uiState.findAllItemResponse.postValue(itemDetails!!)
    }
}
