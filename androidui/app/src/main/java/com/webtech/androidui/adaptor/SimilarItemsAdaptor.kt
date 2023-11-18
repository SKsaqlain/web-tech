package com.webtech.androidui.adaptor

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.webtech.androidui.R
import com.webtech.androidui.model.SimilarProductResponse
import org.slf4j.LoggerFactory

class SimilarItemsAdaptor(private val similarItems: List<SimilarProductResponse>) :
    RecyclerView.Adapter<SimilarItemsAdaptor.ViewHolder>() {
    private val logger= LoggerFactory.getLogger(SimilarItemsAdaptor::class.java)
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageView: ImageView
        val itemTitle: TextView
        val shippingCost: TextView
        val daysLeft: TextView
        val price: TextView

        init {
            imageView = view.findViewById(R.id.similarItemsImage)
            itemTitle = view.findViewById(R.id.similarItemsCardTitle)
            shippingCost = view.findViewById(R.id.similarItemsShippingCost)
            daysLeft = view.findViewById(R.id.similarItemsDaysLeft)
            price = view.findViewById(R.id.similarItemsPrice)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.product_similar_items_card, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        logger.info("Similar Items Size: ${similarItems.size}")
        return similarItems.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val similarItem = similarItems[position]
        holder.itemTitle.text = similarItem.productName
        holder.shippingCost.text = similarItem.shippingCost
        holder.daysLeft.text = similarItem.daysLeft
        holder.price.text = similarItem.price
        val imageUrl = similarItem.imageURL
        Glide.with(holder.imageView.context)
            .load(imageUrl)
            .into(holder.imageView)
    }


}