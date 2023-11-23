package com.webtech.androidui.details

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.R
import com.webtech.androidui.model.google.GoogleImageResponse
import com.webtech.androidui.model.google.Image
import com.webtech.androidui.services.google.GoogleService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory


class ProductPhotosFragment : Fragment() {

    private val logger = LoggerFactory.getLogger(ProductPhotosFragment::class.java)
    private val googleService = GoogleService()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }


    fun updateGooglePhotosImageState(response: String) {
        logger.info("updating google photos image state")
        val uiState: UIState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val gson = Gson()
        val itemType = object : TypeToken<GoogleImageResponse>() {}.type
        val googleImagesResponse: GoogleImageResponse = gson.fromJson(response, itemType)
        uiState.setGoogleImagesResponse(googleImagesResponse)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.product_photos_fragment, container, false)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val uiState = ViewModelProvider(requireActivity()).get(UIState::class.java)
        val title = uiState.productDetails.value?.title
        if (title != null) {
            googleService.getGoogleImages(view,title,::updateGooglePhotosImageState)
        }
        uiState.googleImagesResponse.observe(viewLifecycleOwner) {
            if (it == null)
                return@observe
            logger.info("Google Images Response: $it")
            val image1 = view.findViewById<ImageView>(R.id.googlePhoto1)
            val image2 = view.findViewById<ImageView>(R.id.googlePhoto2)
            val image3 = view.findViewById<ImageView>(R.id.googlePhoto3)
            val image4 = view.findViewById<ImageView>(R.id.googlePhoto4)
            val image5 = view.findViewById<ImageView>(R.id.googlePhoto5)
            val image6 = view.findViewById<ImageView>(R.id.googlePhoto6)
            val image7 = view.findViewById<ImageView>(R.id.googlePhoto7)
            val image8 = view.findViewById<ImageView>(R.id.googlePhoto8)
            val images = listOf(image1, image2, image3, image4, image5, image6, image7, image8)
            if (it.items!=null && it.items.size == 0) {
                return@observe
            }
            for (i in 0..7) {
                if(it.items==null ||it.items[i]==null){
                    continue
                }
                val imageUrl = it.items[i].link
                if (imageUrl != null) {
                    Glide.with(images[i].context)
                        .load(imageUrl)
                        .into(images[i])
                }

            }
        }

    }
}