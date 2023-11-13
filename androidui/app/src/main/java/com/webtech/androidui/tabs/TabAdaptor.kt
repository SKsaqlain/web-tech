import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.webtech.androidui.MainActivity
import com.webtech.androidui.productsearch.ProductSearchFragment
import com.webtech.androidui.wishlist.WishlistFragment

class TabAdaptor(activity: AppCompatActivity): FragmentStateAdapter(activity) {
    override fun getItemCount(): Int {
        return 2
    }

    override fun createFragment(position: Int): Fragment {
        return when(position){
            0-> ProductSearchFragment()
            1-> WishlistFragment()
            else -> throw IllegalArgumentException("Invalid position: $position")
        }
    }
}

//class TabAdapter(fm: FragmentManager) : FragmentStateAdapter(activity) {
//
//    override fun getItem(position: Int): Fragment {
//        return when (position) {
//            0 -> ProductSearchFragment()
//            1 -> WishlistFragment()  // Create a WishlistFragment class
//            else -> throw IllegalArgumentException("Invalid position: $position")
//        }
//    }
//
//    override fun getCount(): Int {
//        return 2  // Number of tabs
//    }
//
//    override fun getPageTitle(position: Int): CharSequence? {
//        return when (position) {
//            0 -> "SEARCH"
//            1 -> "WISH LIST"
//            else -> null
//        }
//    }
//}
