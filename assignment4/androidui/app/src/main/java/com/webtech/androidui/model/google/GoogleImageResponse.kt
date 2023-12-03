package com.webtech.androidui.model.google


data class GoogleImageResponse(
    val kind: String,
    val url: Url,
    val queries: Queries,
    val context: Context,
    val searchInformation: SearchInformation,
    val items: List<Item>
)

data class Url(
    val type: String,
    val template: String
)

data class Queries(
    val request: List<Request>,
    val nextPage: List<Request>
)

data class Request(
    val title: String,
    val totalResults: String,
    val searchTerms: String,
    val count: Int,
    val startIndex: Int,
    val inputEncoding: String,
    val outputEncoding: String,
    val safe: String,
    val cx: String,
    val searchType: String,
    val imgSize: String,
    val imgType: String
)

data class Context(
    val title: String
)

data class SearchInformation(
    val searchTime: Double,
    val formattedSearchTime: String,
    val totalResults: String,
    val formattedTotalResults: String
)

data class Item(
    val kind: String,
    val title: String,
    val htmlTitle: String,
    val link: String,
    val displayLink: String,
    val snippet: String,
    val htmlSnippet: String,
    val mime: String,
    val fileFormat: String,
    val image: Image
)

data class Image(
    val contextLink: String,
    val height: Int,
    val width: Int,
    val byteSize: Int,
    val thumbnailLink: String,
    val thumbnailHeight: Int,
    val thumbnailWidth: Int
)

