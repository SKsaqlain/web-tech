package com.webtech.androidui

import TabAdaptor
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.model.FindAllItemResponse
import com.webtech.androidui.services.mongodb.MongoDbService
import com.webtech.androidui.state.UIState
import org.slf4j.LoggerFactory


class MainActivity : AppCompatActivity() {
    private val logger= LoggerFactory.getLogger(MainActivity::class.java)
    private val mongoDbService = MongoDbService()

    private fun updateWishListState(response: String) {
        val gson= Gson()
        val type=object : TypeToken<List<FindAllItemResponse>>() {}.type
        val wishListResponse: List<FindAllItemResponse> = gson.fromJson(response, type)
        val uiState: UIState = ViewModelProvider(this).get(UIState::class.java)
        uiState.wishListResponse.postValue(wishListResponse)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Thread.sleep(1000)
        installSplashScreen()

        setContentView(R.layout.activity_main)
        val viewPager: ViewPager2 = findViewById(R.id.viewPager)
        val tabLayout=findViewById<TabLayout>(R.id.productTabLayout)
        val adapter= TabAdaptor(this)
        viewPager.adapter = adapter
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "SEARCH"
                1 -> "WISH LIST"
                else -> null
            }
        }.attach()

    }


}