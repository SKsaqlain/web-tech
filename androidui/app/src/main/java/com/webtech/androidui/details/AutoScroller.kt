package com.webtech.androidui.details

import android.os.Handler
import android.os.Looper
import android.widget.HorizontalScrollView

class AutoScroller(val scrollView: HorizontalScrollView) {
    private var scrollHandler = Handler(Looper.getMainLooper())
    private val scrollRunnable = object : Runnable {
        override fun run() {
            scrollView.smoothScrollBy(1, 0) // Scroll right by 1 pixel
            scrollHandler.postDelayed(this, 10) // Repeat every 10 milliseconds
        }
    }

    fun startAutoScrolling() {
        scrollHandler.post(scrollRunnable)
    }

    fun stopAutoScrolling() {
        scrollHandler.removeCallbacks(scrollRunnable)
    }
}
