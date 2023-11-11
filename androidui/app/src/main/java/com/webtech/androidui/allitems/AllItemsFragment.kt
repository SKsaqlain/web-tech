package com.webtech.androidui.allitems

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.ViewModelProvider
import com.webtech.androidui.R
import com.webtech.androidui.modal.UIState
import com.webtech.androidui.productsearch.ProductSearchFragment
import org.slf4j.LoggerFactory

class AllItemsFragment : Fragment(){
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)
//    val uiState:UIState= ViewModelProvider(requireActivity()).get(UIState::class.java)

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
        val displayM:TextView=view.findViewById(R.id.displayMessage)
//
//        displayMessage=arguments?.getString("message")
//        displayM.text=uiState.findAllItemResponse.value
        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val displayM:TextView=view.findViewById(R.id.displayMessage)
        val uiState: UIState=ViewModelProvider(requireActivity()).get(UIState::class.java)
        uiState.findAllItemResponse.observe(viewLifecycleOwner) {
            displayM.text = it
        }
//        displayM.text=uiState.findAllItemResponse.value
    }
}