package com.webtech.androidui

import TabAdaptor
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator


class MainActivity : AppCompatActivity() {

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



//        if (findViewById<FragmentContainerView>(R.id.productSearchFragment) != null) {
//            if (savedInstanceState == null) {
//                supportFragmentManager.beginTransaction()
//                    .replace(R.id.productSearchFragment, ProductSearchFragment())
//                    .commit()
//            }
//        }
    }


//    override fun passDataCom(editTextInput: String) {
//        val bundle = Bundle()
//        bundle.putString("message", editTextInput)
//        val transaction = this.supportFragmentManager.beginTransaction()
//        val frag2 = AllItemsFragment()
//        frag2.arguments = bundle
//        transaction.replace(R.id.productSearchFragment, frag2)
//        transaction.commit()
//    }

//    override fun transferAllItemResponse(findAllItemResponse: String) {
//        uiState.findAllItemResponse = findAllItemResponse
//        val transaction = this.supportFragmentManager.beginTransaction()
//        val frag2 = AllItemsFragment()
//        transaction.replace(R.id.productSearchFragment, frag2)
//        transaction.commit()
//    }


}