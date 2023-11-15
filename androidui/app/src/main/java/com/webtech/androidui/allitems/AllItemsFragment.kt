package com.webtech.androidui.allitems

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.GridView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.findFragment
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

class AllItemsFragment : Fragment() {
    private val logger = LoggerFactory.getLogger(ProductSearchFragment::class.java)

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.all_items_fragment,
            container,
            false
        )

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val progressBarFragment = view.findViewById<LinearLayout>(R.id.allItemsProgressBarLayout)
        val gridView: GridView = view.findViewById(R.id.allItemsGridView)

        uiState.allItemProgressBar.observe(viewLifecycleOwner) { progressBar ->
            val progressBarFragment = view.findViewById<LinearLayout>(R.id.allItemsProgressBarLayout)
            val gridView: GridView = view.findViewById(R.id.allItemsGridView)
            if (progressBar) {
                progressBarFragment.visibility = View.VISIBLE
                gridView.visibility = View.INVISIBLE
            } else {
                progressBarFragment.visibility = View.INVISIBLE
                gridView.visibility = View.VISIBLE
            }
        }

        uiState.findAllItemResponse.observe(viewLifecycleOwner) { response ->
//            progressBarFragment.visibility = View.INVISIBLE
            if (response == null) {
                Toast.makeText(
                    requireContext(),
                    "No items found",
                    Toast.LENGTH_LONG
                ).show()
                return@observe
            }

            logger.info("Response is: $response")
            gridView.visibility = View.VISIBLE
            val adapter = FindAllItemAdaptor(response, requireContext())
            val gridView: GridView = view.findViewById(R.id.allItemsGridView)
            gridView.adapter = adapter
        }
        val goBackBtn: ImageView = view.findViewById(R.id.allItemsBackArrow)
        goBackBtn.setOnClickListener() {
            logger.info("Go back button clicked on all items fragment")
            parentFragmentManager.popBackStack()
            uiState.setAllItemProgressBar(true)
            uiState.setFindAllItemResponse(emptyList())
        }
    }
}