package com.webtech.androidui.allitems

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.GridView
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.squareup.picasso.Picasso
import com.webtech.androidui.R
import com.webtech.androidui.model.FindAllItemAdaptor
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.state.UIState
import com.webtech.androidui.productsearch.ProductSearchFragment
import org.slf4j.LoggerFactory

class AllItemsFragment : Fragment(){
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view=inflater.inflate(
            R.layout.all_items_fragment,
            container,
            false
        )

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val uiState: UIState=ViewModelProvider(requireActivity()).get(UIState::class.java)
        uiState.findAllItemResponse.observe(viewLifecycleOwner) {
            if(it==null)
                return@observe

            logger.info("Response is: $it")

            val listType=object : TypeToken<List<FindAllItemResponse>>() {}.type
            val findAllItemResponse: List<FindAllItemResponse> = Gson().fromJson(it, listType)

            logger.info("Response is: $findAllItemResponse")

            val adapter= FindAllItemAdaptor(findAllItemResponse, requireContext())
            val gridView: GridView = view.findViewById(R.id.allItemsGridView)
            gridView.adapter = adapter
        }
    }
}