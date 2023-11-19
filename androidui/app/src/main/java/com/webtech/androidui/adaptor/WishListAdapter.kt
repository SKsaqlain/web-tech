package com.webtech.androidui.adaptor

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.webtech.androidui.R
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.services.mongodb.MongoDbService
import com.webtech.androidui.state.UIState
import com.webtech.androidui.wishlist.WishlistFragment
import org.slf4j.LoggerFactory
import org.w3c.dom.Text

class WishListAdapter(
    private val wishListItems: List<FindAllItemResponse>,
    private val uiState: UIState
) :
    RecyclerView.Adapter<WishListAdapter.ViewHolder>() {
    private val logger = LoggerFactory.getLogger(WishListAdapter::class.java)
    private val mongoDbService = MongoDbService()

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageView: ImageView
        val itemTitle: TextView
        val zipCode: TextView
        val condition: TextView
        val shipping: TextView
        val cartIcon: ImageView
        val price: TextView

        init {
            imageView = view.findViewById(R.id.item_image)
            itemTitle = view.findViewById(R.id.productTitle)
            zipCode = view.findViewById(R.id.zipcode)
            condition = view.findViewById(R.id.condition)
            shipping = view.findViewById(R.id.shipping)
            cartIcon = view.findViewById(R.id.cartIcon)
            price = view.findViewById(R.id.price)

        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_item, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return wishListItems.size
    }

    // Function to adjust text to occupy exactly three lines
    private fun adjustTextToThreeLines(text: String): String {
        val newline = "\n"
        return when (text.count { it == '\n' }) {
            0 -> text + newline.repeat(1) // Add two newlines if no newline exists
            else -> text // If there are already two or more, do nothing
        }
    }
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val wishList = wishListItems[position]
        var truncatedTitle: String=adjustTextToThreeLines(wishList.title)
//        if (wishList.title.length > 30) {
//            truncatedTitle = wishList.title.substring(0, 30) + "..."
//        }
//        else{
//            truncatedTitle = truncatedTitle+"\n"
//        }



        holder.itemTitle.text = truncatedTitle
        holder.zipCode.text = "Zip:"+wishList.zip
        holder.condition.text = wishList.condition
        holder.shipping.text = wishList.shipping
        holder.price.text = wishList.price
        val imageUrl = wishList.image
        Glide.with(holder.imageView.context)
            .load(imageUrl)
            .into(holder.imageView)

        holder.cartIcon.setImageResource(R.drawable.cart_remove_icon)

        holder.cartIcon.setOnClickListener {
            logger.info("Remove from wish list clicked on wishlist for itemId ${wishList.itemId}")
            val itemResponse = uiState.findAllItemResponse.value
            for (item in itemResponse!!) {
                if (item.itemId == wishList.itemId) {
                    item.isWishListed = false
                    break
                }
            }
            uiState.findAllItemResponse.postValue(itemResponse)
            val filteredWishlist = wishListItems.filter { item -> item.itemId != wishList.itemId }
            uiState.wishListResponse.postValue(filteredWishlist)
            mongoDbService.removeFromWishList(holder.cartIcon, wishList.itemId)


        }

    }
}