package com.webtech.androidui

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webtech.androidui.model.FindAllItemResponse


    fun main(args:Array<String>){
        val data="""
        [
            {
                "number": 1,
                "itemId": "325234034211",
                "title": "Apple iPhone 12 MINI 64GB│ 128GB│256GB (UNLOCKED) 🔋 100% BATTERY🔋⚫🔴🔵✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/pOIAAOSwxPRgJg2x/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-12-MINI-64GB-128GB-256GB-UNLOCKED-100-BATTERY-SEALED-/325234034211?var=",
                "price": "396.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29707",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 2,
                "itemId": "285426294099",
                "title": "Apple iPhone 7 A1660 (Fully Unlocked) 32GB Silver (Excellent)",
                "image": "https://i.ebayimg.com/thumbs/images/g/66gAAOSw5cRk1twc/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-7-A1660-Fully-Unlocked-32GB-Silver-Excellent-/285426294099",
                "price": "90.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "5197",
                    "popularity": "98.1",
                    "feedbackRatingStar": "Green",
                    "topRated": "false",
                    "storeName": "Wireless Source",
                    "buyProductAt": "http://stores.ebay.com/Wireless-Source"
                },
                "isWishListed": false
            },
            {
                "number": 3,
                "itemId": "325091230666",
                "title": "Apple iPhone 13 PRO MAX 128GB 256GB 512GB (FACTORY UNLOCKED) 🔋100% BATTERY✤O/B✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/0z4AAOSwpThkAqW5/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-13-PRO-MAX-128GB-256GB-512GB-FACTORY-UNLOCKED-100-BATTERY-O-B-/325091230666?var=",
                "price": "789.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29715",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 4,
                "itemId": "354692680795",
                "title": "Apple airpods(3rd generation) Bluetooth wireless earphone charging case - white",
                "image": "https://i.ebayimg.com/thumbs/images/g/SmoAAOSwB4pk4fYJ/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-airpods-3rd-generation-Bluetooth-wireless-earphone-charging-case-white-/354692680795?var=",
                "price": "53.71",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "278",
                    "popularity": "99.6",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "hampdood88",
                    "buyProductAt": "http://stores.ebay.com/hampdood88"
                },
                "isWishListed": false
            },
            {
                "number": 5,
                "itemId": "194935793906",
                "title": "Apple Watch Series 3 38mm 42mm GPS + WiFi + Cellular Pink Gold Space Gray Silver",
                "image": "https://i.ebayimg.com/thumbs/images/g/cZMAAOSwJ6JiPLpz/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-3-38mm-42mm-GPS-WiFi-Cellular-Pink-Gold-Space-Gray-Silver-/194935793906?var=",
                "price": "77.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131850",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 6,
                "itemId": "225396639541",
                "title": "APPLE IPHONE 14 - 128GB 256GB (FACTORY UNLOCKED) 🔋100% BATTERY🔋⚫⚪🔴🔵 ✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/JSwAAOSwd9Nj3aIt/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/APPLE-IPHONE-14-128GB-256GB-FACTORY-UNLOCKED-100-BATTERY-SEALED-/225396639541?var=",
                "price": "739.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29715",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 7,
                "itemId": "225011531757",
                "title": "Apple iPhone 13 MINI - 128GB 256GB (UNLOCKED)  ✅APPLE WARRANTY✅ ⚫⚪🔴🔵 ✤O/B✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/veYAAOSw9KFiaxif/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-13-MINI-128GB-256GB-UNLOCKED-APPLE-WARRANTY-O-B-/225011531757?var=",
                "price": "528.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29702",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 8,
                "itemId": "374561411604",
                "title": "Apple airpods(3rd generation) Bluetooth wireless earphone charging case - white",
                "image": "https://i.ebayimg.com/thumbs/images/g/IOgAAOSw6M1lMGlJ/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-airpods-3rd-generation-Bluetooth-wireless-earphone-charging-case-white-/374561411604?var=",
                "price": "48.97",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "130",
                    "popularity": "99.2",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "finalsale55用户名",
                    "buyProductAt": "http://stores.ebay.com/finalsale55"
                },
                "isWishListed": false
            },
            {
                "number": 9,
                "itemId": "404011999294",
                "title": "Apple Watch Series 3 38mm 42mm GPS + WiFi + Bluetooth Gold Gray Silver - Good",
                "image": "https://i.ebayimg.com/thumbs/images/g/Fz4AAOSwbNdiPLq8/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-3-38mm-42mm-GPS-WiFi-Bluetooth-Gold-Gray-Silver-Good-/404011999294?var=",
                "price": "89.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131853",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 10,
                "itemId": "134760895367",
                "title": "Apple AirPods 2nd Generation With Earphone Earbuds & Wireless Charging Box",
                "image": "https://i.ebayimg.com/thumbs/images/g/Ez4AAOSwe69lI6Vx/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-AirPods-2nd-Generation-Earphone-Earbuds-Wireless-Charging-Box-/134760895367",
                "price": "37.55",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "17",
                    "popularity": "100.0",
                    "feedbackRatingStar": "Yellow",
                    "topRated": "false",
                    "storeName": null,
                    "buyProductAt": null
                },
                "isWishListed": false
            },
            {
                "number": 11,
                "itemId": "155820483451",
                "title": "APPLE AIRPODS 3RD GENERATION BLUETOOTH EARBUDS EARPHONE HEADSET & CHARGING CASE",
                "image": "https://i.ebayimg.com/thumbs/images/g/nQoAAOSwZEllJL3O/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/APPLE-AIRPODS-3RD-GENERATION-BLUETOOTH-EARBUDS-EARPHONE-HEADSET-CHARGING-CASE-/155820483451",
                "price": "51.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "44",
                    "popularity": "97.9",
                    "feedbackRatingStar": "Yellow",
                    "topRated": "false",
                    "storeName": null,
                    "buyProductAt": null
                },
                "isWishListed": false
            },
            {
                "number": 12,
                "itemId": "325559911949",
                "title": "Apple iPhone 13 PRO MAX 128GB 256GB 1TB (UNLOCKED) ✅1 YEAR WARRNTY✅⚫🔴🔵✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/G3YAAOSwbMxkAqjJ/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-13-PRO-MAX-128GB-256GB-1TB-UNLOCKED-1-YEAR-WARRNTY-SEALED-/325559911949?var=",
                "price": "1098.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29707",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 13,
                "itemId": "285362811513",
                "title": "Apple iPhone 8 64GB 128GB 256GB Verizon AT&T T-Mobile Unlocked (Excellent)",
                "image": "https://i.ebayimg.com/thumbs/images/g/zlYAAOSw3ItlMMq4/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-8-64GB-128GB-256GB-Verizon-AT-T-T-Mobile-Unlocked-Excellent-/285362811513?var=",
                "price": "179.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "5197",
                    "popularity": "98.1",
                    "feedbackRatingStar": "Green",
                    "topRated": "false",
                    "storeName": "Wireless Source",
                    "buyProductAt": "http://stores.ebay.com/Wireless-Source"
                },
                "isWishListed": false
            },
            {
                "number": 14,
                "itemId": "334793713108",
                "title": "2022 Apple AirPods Pro 2nd Generation Wireless Earbuds & MagSafe Charging Case",
                "image": "https://i.ebayimg.com/thumbs/images/g/OuUAAOSwl4JlRa0z/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/2022-Apple-AirPods-Pro-2nd-Generation-Wireless-Earbuds-MagSafe-Charging-Case-/334793713108?var=",
                "price": "92.87",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "3",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "123",
                    "popularity": "98.4",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "thegearless",
                    "buyProductAt": "http://stores.ebay.com/thegearless"
                },
                "isWishListed": false
            },
            {
                "number": 15,
                "itemId": "285420448943",
                "title": "New Open Box Apple iPad 7th Gen 2019 MW742LL/A (Wi-Fi) 32GB Space Gray",
                "image": "https://i.ebayimg.com/thumbs/images/g/V2YAAOSwre1k3~Hz/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/New-Open-Box-Apple-iPad-7th-Gen-2019-MW742LL-A-Wi-Fi-32GB-Space-Gray-/285420448943",
                "price": "189.0",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "5197",
                    "popularity": "98.1",
                    "feedbackRatingStar": "Green",
                    "topRated": "false",
                    "storeName": "Wireless Source",
                    "buyProductAt": "http://stores.ebay.com/Wireless-Source"
                },
                "isWishListed": false
            },
            {
                "number": 16,
                "itemId": "224853342585",
                "title": "Apple iPhone 13 - 128GB 256GB 512GB (UNLOCKED)  ✅APPLE WARRANTY✅ ⚫⚪🔴🔵 ✤O/B✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/lJIAAOSwHidjpkEB/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-13-128GB-256GB-512GB-UNLOCKED-APPLE-WARRANTY-O-B-/224853342585?var=",
                "price": "578.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29702",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 17,
                "itemId": "314674675867",
                "title": "APPLE AIRPODS 3RD GENERATION BLUETOOTH EARBUDS EARPHONE HEADSET & CHARGING CASE",
                "image": "https://i.ebayimg.com/thumbs/images/g/IVsAAOSwrndlQPmQ/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/APPLE-AIRPODS-3RD-GENERATION-BLUETOOTH-EARBUDS-EARPHONE-HEADSET-CHARGING-CASE-/314674675867?var=",
                "price": "47.99",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "56",
                    "popularity": "100.0",
                    "feedbackRatingStar": "Blue",
                    "topRated": "true",
                    "storeName": "headphone-949",
                    "buyProductAt": "http://stores.ebay.com/headphone-949"
                },
                "isWishListed": false
            },
            {
                "number": 18,
                "itemId": "334793668101",
                "title": "Apple AirPods 2nd Generation Bluetooth headset with Charging Case - White",
                "image": "https://i.ebayimg.com/thumbs/images/g/R5QAAOSwB7tlA6Li/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-AirPods-2nd-Generation-Bluetooth-headset-Charging-Case-White-/334793668101?var=",
                "price": "41.88",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "123",
                    "popularity": "98.4",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "thegearless",
                    "buyProductAt": "http://stores.ebay.com/thegearless"
                },
                "isWishListed": false
            },
            {
                "number": 19,
                "itemId": "324879899612",
                "title": "Apple iPhone 11 PRO 64GB 256GB 512GB (UNLOCKED) ⚫🟢🟠 🔋 100% BATTERY 🔋❖SEALED❖",
                "image": "https://i.ebayimg.com/thumbs/images/g/LUYAAOSwxhhhjc7N/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-11-PRO-64GB-256GB-512GB-UNLOCKED-100-BATTERY-SEALED-/324879899612?var=",
                "price": "478.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29707",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 20,
                "itemId": "314285776503",
                "title": "Apple Watch SE 40mm 44mm GPS + WiFi + Cellular Pink Gold Gray Silver - Good",
                "image": "https://i.ebayimg.com/thumbs/images/g/gAAAAOSwa~di7QKG/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-SE-40mm-44mm-GPS-WiFi-Cellular-Pink-Gold-Gray-Silver-Good-/314285776503?var=",
                "price": "139.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131838",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 21,
                "itemId": "325444241958",
                "title": "Apple iPhone 12 PRO 128GB │256GB│512GB (UNLOCKED) 🔋 100% BATTERY 🔋 ✤O/B✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/N4oAAOSwwy5hmDbq/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-12-PRO-128GB-256GB-512GB-UNLOCKED-100-BATTERY-O-B-/325444241958?var=",
                "price": "549.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29707",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 22,
                "itemId": "404210681222",
                "title": "Apple AirPods 2nd Generation With Earphone Earbuds &amp; Wireless Charging Box",
                "image": "https://i.ebayimg.com/thumbs/images/g/p4wAAOSwrtBlBAx0/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-AirPods-2nd-Generation-Earphone-Earbuds-amp-Wireless-Charging-Box-/404210681222?var=",
                "price": "38.87",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "143",
                    "popularity": "99.3",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "evergreen7",
                    "buyProductAt": "http://stores.ebay.com/evergreen7"
                },
                "isWishListed": false
            },
            {
                "number": 23,
                "itemId": "324832360477",
                "title": "Apple iPhone 11 - 64GB 128GB 256GB (FACTORY UNLOCKED) 🔋100% BATTERY🔋 ❖SEALED❖",
                "image": "https://i.ebayimg.com/thumbs/images/g/1IcAAOSwsKFfG48x/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-11-64GB-128GB-256GB-FACTORY-UNLOCKED-100-BATTERY-SEALED-/324832360477?var=",
                "price": "378.94",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29678",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 24,
                "itemId": "323807027361",
                "title": "Apple iPhone 8 Plus 64GB 128GB 256GB (UNLOCKED) 🔋100% BATTERY🔋 ALL COLORS❖O/B❖",
                "image": "https://i.ebayimg.com/thumbs/images/g/STIAAOSwy~Jb07kZ/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-8-Plus-64GB-128GB-256GB-UNLOCKED-100-BATTERY-ALL-COLORS-O-B-/323807027361?var=",
                "price": "198.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29574",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 25,
                "itemId": "225247495043",
                "title": "Apple iPhone 13 PRO 128GB 256GB 512GB (UNLOCKED) ✅1 YEAR WARRANTY✅⚫🔴🔵✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/KaYAAOSwF8djXH3P/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-13-PRO-128GB-256GB-512GB-UNLOCKED-1-YEAR-WARRANTY-SEALED-/225247495043?var=",
                "price": "826.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29719",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 26,
                "itemId": "165764042427",
                "title": "For Apple iPhone 15 14 13 12 11 Pro Max Xr Clear Case Slim Plating MagSafe Cover",
                "image": "https://i.ebayimg.com/thumbs/images/g/xysAAOSwf~llCIJI/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-15-14-13-12-11-Pro-Max-Xr-Clear-Case-Slim-Plating-MagSafe-Cover-/165764042427?var=",
                "price": "8.99",
                "shipping": "Free Shipping",
                "zip": "917**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "84245",
                    "popularity": "99.5",
                    "feedbackRatingStar": "PurpleShooting",
                    "topRated": "true",
                    "storeName": "monster-electronics-626 ",
                    "buyProductAt": "http://stores.ebay.com/monster-electronics-626"
                },
                "isWishListed": false
            },
            {
                "number": 27,
                "itemId": "195487959196",
                "title": "Apple Watch Series 3 38mm 42mm GPS+ WIFI + LTE UNLOCKED Gold Gray Silver - Good",
                "image": "https://i.ebayimg.com/thumbs/images/g/nXcAAOSwAwFetQI1/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-3-38mm-42mm-GPS-WIFI-LTE-UNLOCKED-Gold-Gray-Silver-Good-/195487959196?var=",
                "price": "99.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131838",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 28,
                "itemId": "225805925025",
                "title": "For iPhone 14 Pro Max 14 14 Pro 14 Plus Apple Leather Phone Case with MagSafe",
                "image": "https://i.ebayimg.com/thumbs/images/g/K9gAAOSwHvVlIFsj/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/iPhone-14-Pro-Max-14-14-Pro-14-Plus-Apple-Leather-Phone-Case-MagSafe-/225805925025?var=",
                "price": "21.22",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "3",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "9121",
                    "popularity": "99.5",
                    "feedbackRatingStar": "Green",
                    "topRated": "true",
                    "storeName": "tianshan666",
                    "buyProductAt": "http://stores.ebay.com/tianshan666"
                },
                "isWishListed": false
            },
            {
                "number": 29,
                "itemId": "325007801737",
                "title": "Apple iPhone 12 64GB / 128GB / 256GB (UNLOCKED) 🔋 100% BATTERY🔋 ⚫⚪🔴🔵✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/pOIAAOSwxPRgJg2x/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-12-64GB-128GB-256GB-UNLOCKED-100-BATTERY-SEALED-/325007801737?var=",
                "price": "534.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29678",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 30,
                "itemId": "313943952880",
                "title": "Apple Watch Series 5 40mm 44mm GPS + WiFi + Cellular Pink Gold Space Gray Silver",
                "image": "https://i.ebayimg.com/thumbs/images/g/L8EAAOSwXtFiS7Km/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-5-40mm-44mm-GPS-WiFi-Cellular-Pink-Gold-Space-Gray-Silver-/313943952880?var=",
                "price": "129.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131833",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 31,
                "itemId": "374960355385",
                "title": "For iPhone 13 Pro 13 Pro Max Original Apple Leather Phone Case W/ Magsafe",
                "image": "https://i.ebayimg.com/thumbs/images/g/LFIAAOSwyeVlHqWI/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/iPhone-13-Pro-13-Pro-Max-Original-Apple-Leather-Phone-Case-W-Magsafe-/374960355385?var=",
                "price": "23.74",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "3",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "2132",
                    "popularity": "99.5",
                    "feedbackRatingStar": "Red",
                    "topRated": "true",
                    "storeName": "nicecase8",
                    "buyProductAt": "http://stores.ebay.com/nicecase8"
                },
                "isWishListed": false
            },
            {
                "number": 32,
                "itemId": "314203359300",
                "title": "for Apple Watch Band Silicone Strap 2 3 4 5 6 7 8 9 SE Sport 38/40/41/42/44/45mm",
                "image": "https://i.ebayimg.com/thumbs/images/g/ZpsAAOSwxrljV3iy/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Band-Silicone-Strap-2-3-4-5-6-7-8-9-SE-Sport-38-40-41-42-44-45mm-/314203359300?var=",
                "price": "2.99",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "123389",
                    "popularity": "99.0",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "false",
                    "storeName": "Esukceso",
                    "buyProductAt": "http://stores.ebay.com/Esukceso"
                },
                "isWishListed": false
            },
            {
                "number": 33,
                "itemId": "325353561740",
                "title": "Apple iPhone 12 PRO 128GB │256GB│512GB (UNLOCKED) 🔋 100% BATTERY 🔋 ✤SEALED✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/N4oAAOSwwy5hmDbq/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-12-PRO-128GB-256GB-512GB-UNLOCKED-100-BATTERY-SEALED-/325353561740?var=",
                "price": "698.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29650",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 34,
                "itemId": "355085735117",
                "title": "APPLE AirPods (2nd Generation) With Earphone Earbuds & Wireless Charging Case",
                "image": "https://i.ebayimg.com/thumbs/images/g/tzcAAOSwYiRlH73a/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/APPLE-AirPods-2nd-Generation-Earphone-Earbuds-Wireless-Charging-Case-/355085735117",
                "price": "37.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "2",
                    "popularity": "100.0",
                    "feedbackRatingStar": "None",
                    "topRated": "false",
                    "storeName": "siupakkongtr-0",
                    "buyProductAt": "http://stores.ebay.com/siupakkongtr-0"
                },
                "isWishListed": false
            },
            {
                "number": 35,
                "itemId": "325785680385",
                "title": "Apple AirPods 3rd Generation Replacement Earbud Right Left Ear  A2565 part",
                "image": "https://i.ebayimg.com/thumbs/images/g/S2YAAOSwSANk5rpI/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-AirPods-3rd-Generation-Replacement-Earbud-Right-Left-Ear-A2565-part-/325785680385?var=",
                "price": "57.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "true",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29570",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 36,
                "itemId": "404012047939",
                "title": "Apple Watch Series 6 40mm 44mm GPS+ WIFI + LTE UNLOCKED - All Colors - Good",
                "image": "https://i.ebayimg.com/thumbs/images/g/LCsAAOSw33Vi7PbX/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-6-40mm-44mm-GPS-WIFI-LTE-UNLOCKED-All-Colors-Good-/404012047939?var=",
                "price": "169.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131826",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 37,
                "itemId": "314253434118",
                "title": "Apple Watch Series 4 40mm 44mm GPS+ WIFI + LTE UNLOCKED Gold Gray Silver - Good",
                "image": "https://i.ebayimg.com/thumbs/images/g/Z7YAAOSwtupiReLz/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-4-40mm-44mm-GPS-WIFI-LTE-UNLOCKED-Gold-Gray-Silver-Good-/314253434118?var=",
                "price": "139.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131826",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 38,
                "itemId": "394832104756",
                "title": "For Apple Pencil 2nd Generation iPad Pro Stylus with Wireless Charging Bluetooth",
                "image": "https://i.ebayimg.com/thumbs/images/g/MYgAAOSw5Bdk5WMf/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Pencil-2nd-Generation-iPad-Pro-Stylus-Wireless-Charging-Bluetooth-/394832104756",
                "price": "22.99",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "5",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "344",
                    "popularity": "95.8",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "false",
                    "storeName": null,
                    "buyProductAt": null
                },
                "isWishListed": false
            },
            {
                "number": 39,
                "itemId": "404432141576",
                "title": "Apple Liquid Silicone Phone Case With MagSafe For iPhone 12/12Pro/12 Pro Max",
                "image": "https://i.ebayimg.com/thumbs/images/g/sjEAAOSwkSVkpOA2/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Liquid-Silicone-Phone-Case-MagSafe-iPhone-12-12Pro-12-Pro-Max-/404432141576?var=",
                "price": "18.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "237",
                    "popularity": "100.0",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "posada-one",
                    "buyProductAt": "http://stores.ebay.com/posada-one"
                },
                "isWishListed": false
            },
            {
                "number": 40,
                "itemId": "235254405885",
                "title": "✅ Apple iPhone 8 Space Gray - 64GB - (Verizon) A1863 (CDMA + GSM) Unlocked",
                "image": "https://i.ebayimg.com/thumbs/images/g/wqsAAOSwbexjPOi3/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-8-Space-Gray-64GB-Verizon-A1863-CDMA-GSM-Unlocked-/235254405885",
                "price": "199.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "36703",
                    "popularity": "99.8",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Cell Store USA",
                    "buyProductAt": "http://stores.ebay.com/Cell-Store-USA"
                },
                "isWishListed": false
            },
            {
                "number": 41,
                "itemId": "314203300132",
                "title": "Woven Nylon Band For Apple Watch iWatch Series 9 8 7 6 SE 5 4 Ultra 2 38/45/44mm",
                "image": "https://i.ebayimg.com/thumbs/images/g/c9kAAOSw3lBjV3z9/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Woven-Nylon-Band-Apple-Watch-iWatch-Series-9-8-7-6-SE-5-4-Ultra-2-38-45-44mm-/314203300132?var=",
                "price": "2.99",
                "shipping": "Free Shipping",
                "zip": "918**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "123364",
                    "popularity": "99.0",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "false",
                    "storeName": "Esukceso",
                    "buyProductAt": "http://stores.ebay.com/Esukceso"
                },
                "isWishListed": false
            },
            {
                "number": 42,
                "itemId": "314716240101",
                "title": "Official Apple Silicone Magsafe Rear Case Cover For iPhone 14 PRO MAX 14 Pro",
                "image": "https://i.ebayimg.com/thumbs/images/g/bzYAAOSwwthlEBkX/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Official-Apple-Silicone-Magsafe-Rear-Case-Cover-iPhone-14-PRO-MAX-14-Pro-/314716240101?var=",
                "price": "19.98",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "3",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "785",
                    "popularity": "99.5",
                    "feedbackRatingStar": "Purple",
                    "topRated": "true",
                    "storeName": "lifecase",
                    "buyProductAt": "http://stores.ebay.com/lifecase"
                },
                "isWishListed": false
            },
            {
                "number": 43,
                "itemId": "225805901006",
                "title": "HOT For iPhone 13 Pro Max 13 13 Pro 13mini Apple Leather With Magsafe Phone Case",
                "image": "https://i.ebayimg.com/thumbs/images/g/uEgAAOSwwW5lIFcw/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/HOT-iPhone-13-Pro-Max-13-13-Pro-13mini-Apple-Leather-Magsafe-Phone-Case-/225805901006?var=",
                "price": "21.22",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "3",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "9123",
                    "popularity": "99.5",
                    "feedbackRatingStar": "Green",
                    "topRated": "true",
                    "storeName": "tianshan666",
                    "buyProductAt": "http://stores.ebay.com/tianshan666"
                },
                "isWishListed": false
            },
            {
                "number": 44,
                "itemId": "295871622687",
                "title": "Apple Liquid Silicone Phone Case With MagSafe For iPhone 14/14 Pro Max/14 Plus",
                "image": "https://i.ebayimg.com/thumbs/images/g/ZL0AAOSwJ19kz2gN/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Liquid-Silicone-Phone-Case-MagSafe-iPhone-14-14-Pro-Max-14-Plus-/295871622687?var=",
                "price": "18.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "247",
                    "popularity": "99.5",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "TEQCASE",
                    "buyProductAt": "http://stores.ebay.com/TEQCASE"
                },
                "isWishListed": false
            },
            {
                "number": 45,
                "itemId": "225695008595",
                "title": "APPLE IPHONE 14 PRO MAX 128GB 256GB 512GB (FACTORY UNLOCKED) ALL COLORS ✤O/B✤",
                "image": "https://i.ebayimg.com/thumbs/images/g/n08AAOSwNFxkuJIV/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/APPLE-IPHONE-14-PRO-MAX-128GB-256GB-512GB-FACTORY-UNLOCKED-ALL-COLORS-O-B-/225695008595?var=",
                "price": "1148.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29715",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 46,
                "itemId": "225246017765",
                "title": "Apple iPhone SE 3rd 5G 64GB 128GB 256GB (FACTORY UNLOCKED) ✅1 YR WARNTY✅❖SEALED❖",
                "image": "https://i.ebayimg.com/thumbs/images/g/U1YAAOSwspFkn1MV/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-SE-3rd-5G-64GB-128GB-256GB-FACTORY-UNLOCKED-1-YR-WARNTY-SEALED-/225246017765?var=",
                "price": "337.95",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "29716",
                    "popularity": "99.5",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Santa Monica Wireless",
                    "buyProductAt": "http://stores.ebay.com/Santa-Monica-Wireless"
                },
                "isWishListed": false
            },
            {
                "number": 47,
                "itemId": "285413694722",
                "title": "Apple iPhone 7 64GB 128GB 256GB Verizon AT&T T-Mobile Unlocked (Excellent)",
                "image": "https://i.ebayimg.com/thumbs/images/g/qxQAAOSwoB1lAlY9/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-7-64GB-128GB-256GB-Verizon-AT-T-T-Mobile-Unlocked-Excellent-/285413694722?var=",
                "price": "104.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "5197",
                    "popularity": "98.1",
                    "feedbackRatingStar": "Green",
                    "topRated": "false",
                    "storeName": "Wireless Source",
                    "buyProductAt": "http://stores.ebay.com/Wireless-Source"
                },
                "isWishListed": false
            },
            {
                "number": 48,
                "itemId": "404432106299",
                "title": "Apple Liquid Silicone Soft Phone Case With MagSafe For iPhone 13 Pro Max Series",
                "image": "https://i.ebayimg.com/thumbs/images/g/W8gAAOSw6pVk0RIt/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Liquid-Silicone-Soft-Phone-Case-MagSafe-iPhone-13-Pro-Max-Series-/404432106299?var=",
                "price": "18.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "2",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "237",
                    "popularity": "100.0",
                    "feedbackRatingStar": "Turquoise",
                    "topRated": "true",
                    "storeName": "posada-one",
                    "buyProductAt": "http://stores.ebay.com/posada-one"
                },
                "isWishListed": false
            },
            {
                "number": 49,
                "itemId": "313937850044",
                "title": "Apple Watch Series 4 40mm 44mm GPS + WiFi + Cellular Pink Gold Space Gray Silver",
                "image": "https://i.ebayimg.com/thumbs/images/g/Z7YAAOSwtupiReLz/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-Watch-Series-4-40mm-44mm-GPS-WiFi-Cellular-Pink-Gold-Space-Gray-Silver-/313937850044?var=",
                "price": "104.99",
                "shipping": "Free Shipping",
                "zip": "903**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "false",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "131778",
                    "popularity": "99.6",
                    "feedbackRatingStar": "RedShooting",
                    "topRated": "true",
                    "storeName": "dealscaly",
                    "buyProductAt": "http://stores.ebay.com/dealscaly"
                },
                "isWishListed": false
            },
            {
                "number": 50,
                "itemId": "225245645838",
                "title": "Apple iPhone 8 64GB / 256GB (Factory Unlocked ✅) AT&T T-MOBILE VERIZON",
                "image": "https://i.ebayimg.com/thumbs/images/g/BoYAAOSwPsNjbUSU/s-l140.jpg",
                "viewItemURL": "https://www.ebay.com/itm/Apple-iPhone-8-64GB-256GB-Factory-Unlocked-AT-T-T-MOBILE-VERIZON-/225245645838?var=",
                "price": "199.99",
                "shipping": "Free Shipping",
                "zip": "900**",
                "shippingDetails": {
                    "shippingCost": "Free Shipping",
                    "shippingLocation": "Worldwide",
                    "handlingTime": "1",
                    "expeditedShipping": "false",
                    "oneDayShipping": "true",
                    "returnsAccepted": "true"
                },
                "sellerDetails": {
                    "feedBackScore": "36735",
                    "popularity": "99.8",
                    "feedbackRatingStar": "TurquoiseShooting",
                    "topRated": "true",
                    "storeName": "Cell Store USA",
                    "buyProductAt": "http://stores.ebay.com/Cell-Store-USA"
                },
                "isWishListed": false
            }
        ]
    """.trimIndent()
        val listType=object : TypeToken<List<FindAllItemResponse>>() {}.type
        val findAllItemResponse: List<FindAllItemResponse> = Gson().fromJson(data, listType)
        println(findAllItemResponse)
    }

