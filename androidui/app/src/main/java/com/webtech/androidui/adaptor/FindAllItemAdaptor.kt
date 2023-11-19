package com.webtech.androidui.adaptor

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.internal.ContextUtils.getActivity
import com.google.gson.Gson
import com.squareup.picasso.Picasso
import com.webtech.androidui.R
import com.webtech.androidui.allitems.AllItemsFragment
import com.webtech.androidui.details.ProductFragment
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.services.ebay.EbayService
import com.webtech.androidui.services.mongodb.MongoDbService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory

class FindAllItemAdaptor: BaseAdapter {
    private val logger= LoggerFactory.getLogger(FindAllItemAdaptor::class.java)
    private val mongoDbService = MongoDbService()

    private var findAllItemResponse= listOf<FindAllItemResponse>()
    private var context: Context?=null
    private var fragmentManager: FragmentManager ?=null

    constructor(findAllItemResponse: List<FindAllItemResponse>, context: Context?, fragmentManager: FragmentManager?) : super() {
        this.findAllItemResponse = findAllItemResponse
        this.context = context
        this.fragmentManager = fragmentManager
    }

    override fun getCount(): Int {
        return findAllItemResponse.size
    }

    override fun getItem(position: Int): Any {
        return findAllItemResponse[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val item=this.findAllItemResponse[position]
        var inflator= context!!.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var cardItemView=inflator.inflate(R.layout.card_item, null)

        val itemImage = cardItemView.findViewById<ImageView>(R.id.item_image)
        val title = cardItemView.findViewById<TextView>(R.id.productTitle)
        val zipcode = cardItemView.findViewById<TextView>(R.id.zipcode)
        val condition = cardItemView.findViewById<TextView>(R.id.condition)
        val shipping = cardItemView.findViewById<TextView>(R.id.shipping)
        val cartIcon =  cardItemView.findViewById<ImageView>(R.id.cartIcon)
        val price = cardItemView.findViewById<TextView>(R.id.price)

        // Set values based on the item
        if(item.image!=null)
            Picasso.get().load(item.image).into(itemImage)

        var truncatedTitle: String=item.title
        if (item.title.length > 30) {
            truncatedTitle = item.title.substring(0, 30) + "..."
        }

        title.text = truncatedTitle
        zipcode.text = item.zip
        condition.text = item.condition
        shipping.text = item.shipping
        price.text = item.price

        cardItemView.tag=item.itemId

        if(item.isWishListed) {
            cartIcon.setImageResource(R.drawable.cart_remove_icon)
        } else {
            cartIcon.setImageResource(R.drawable.cart_icon)
        }

        cardItemView.setOnClickListener(){
            val itemId=cardItemView.tag.toString()
            val pos=position
            Toast.makeText(context, "Item  $pos $itemId is clicked", Toast.LENGTH_SHORT).show()
        }


        itemImage.setOnClickListener() {
            val itemId=cardItemView.tag.toString()
            val pos=position
            Toast.makeText(context, "Item  $pos $itemId is added to cart", Toast.LENGTH_SHORT).show()
            val productFragment= ProductFragment()
            val bundle = Bundle()
            bundle.putString("itemId", itemId)
            productFragment.arguments = bundle
            val transaction = this.fragmentManager?.beginTransaction()
            transaction?.replace(R.id.allItemsPage,productFragment)?.setReorderingAllowed(false)
                ?.addToBackStack(null)
            transaction?.commit()
        }

        cartIcon.setOnClickListener() {
            val itemId=cardItemView.tag.toString()
            val gson=Gson()
            val payload:String =gson.toJson(item)
            logger.info("Item $itemId is clicked with payload $payload")
            Toast.makeText(context, "Item $itemId is added to cart", Toast.LENGTH_SHORT).show()
            if(item.isWishListed) {
                item.isWishListed = !item.isWishListed
                Toast.makeText(context, " Removing Item $itemId from cart", Toast.LENGTH_SHORT).show()
                mongoDbService.removeFromWishList(cardItemView, itemId)
            }else{
                item.isWishListed = !item.isWishListed
                Toast.makeText(context, " Removing Item $itemId from cart", Toast.LENGTH_SHORT).show()
                mongoDbService.addToWishList(cardItemView, payload)
            }

            if(item.isWishListed) {
                cartIcon.setImageResource(R.drawable.cart_remove_icon)
            } else {
                cartIcon.setImageResource(R.drawable.cart_icon)
            }
        }

        return cardItemView
    }
}