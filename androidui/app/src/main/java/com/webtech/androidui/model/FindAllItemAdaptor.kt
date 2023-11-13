package com.webtech.androidui.model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import com.squareup.picasso.Picasso
import com.webtech.androidui.R

class FindAllItemAdaptor: BaseAdapter {

    private var findAllItemResponse= listOf<FindAllItemResponse>()
    private var context: Context?=null

    constructor(findAllItemResponse: List<FindAllItemResponse>, context: Context?) : super() {
        this.findAllItemResponse = findAllItemResponse
        this.context = context
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
        val title = cardItemView.findViewById<TextView>(R.id.title)
        val zipcode = cardItemView.findViewById<TextView>(R.id.zipcode)
        val condition = cardItemView.findViewById<TextView>(R.id.condition)
        val shipping = cardItemView.findViewById<TextView>(R.id.shipping)
        val cartIcon = cardItemView.findViewById<ImageView>(R.id.cartIcon)
        val price = cardItemView.findViewById<TextView>(R.id.price)

        // Set values based on the item
        if(item.image!=null)
            Picasso.get().load(item.image).into(itemImage)
        title.text = item.title
        zipcode.text = item.zip
        condition.text = item.condition
        shipping.text = item.shipping
        price.text = item.price

        cardItemView.tag=item.itemId

        return cardItemView
    }
}