// Enhanced Product data with LOCAL IMAGES - 39 products total
const products = [
  // Tablets (01-30 products)
  {
    id: 1,
    name: "Montix-L Tablet",
    category: "tablet",
    price: 12.99,
    image: "images/Tablets/Montix-L.png",
    description: "Antihistaminic Antileukotrienic",
  },
  {
    id: 2,
    name: "Montix-LKid Tablet",
    category: "tablet",
    price: 15.5,
    image: "images/Tablets/Montix-LKid.png",
    description: "Anti-inflammatory pain reliever for muscle and joint pain",
  },
  {
    id: 3,
    name: "Care-200",
    category: "tablet",
    price: 8.99,
    image: "images/Tablets/Care-200.png",
    description: "Heart health and pain relief medication",
  },
  {
    id: 4,
    name: "Iten-200",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/Iten-200.png",
    description: "Essential vitamin D supplement for bone health",
  },
  {
    id: 5,
    name: "Nixclav-625",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/Nixclav-625.png",
    description: "Essential vitamin D supplement for bone health",
  },
  {
    id: 6,
    name: "Nixpod-CV",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/Nixpod-CV.png",
    description: "Essential vitamin D supplement for bone health",
  },
  {
    id: 7,
    name: "XIM-O 100mg",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/XIM-100.png",
    description: "Essential vitamin D supplement for bone health",
  },
  {
    id: 8,
    name: "XIM-O 200mg",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/XIM-200.png",
    description: "Essential vitamin D supplement for bone health",
  },
  {
    id: 9,
    name: "XIM-O 200mg",
    category: "tablet",
    price: 19.99,
    image: "images/Tablets/XIM-200.png",
    description: "Essential vitamin D supplement for bone health",
  },
  // Syrups (31-60 products)
  {
    id: 31,
    name: "MV-Syrup",
    category: "syrup",
    price: 18.5,
    image: "images/Syrups/MV_Syrup.png",
    description: "Natural honey-based cough suppressant for all ages",
  },
  {
    id: 32,
    name: "Paracetamol",
    category: "syrup",
    price: 22.0,
    image: "images/Syrups/Paracetamol.png",
    description: "Complete vitamin supplement for children and adults",
  },
  // {
  //   id: 33,
  //   name: "Anix-LS",
  //   category: "syrup",
  //   price: 16.75,
  //   iimage: "images/Syrups/Anix-LS.png",
  //   description: "Iron deficiency treatment with natural ingredients",
  // },
  {
    id: 34,
    name: "Altaliv-CF",
    category: "syrup",
    price: 14.25,
    image: "images/Syrups/Altaliv-CF.png",
    description: "Herbal digestive aid for better gut health",
  },
  // {
  //   id: 35,
  //   name: "Alkanix",
  //   category: "syrup",
  //   price: 19.99,
  //   iimage: "images/Syrups/Alkanix.png",
  //   description: "Calcium supplement for growing children",
  // },
  // Drops (61-80 products)
  {
    id: 61,
    name: "Antibiotic Eye Drops",
    category: "drops",
    price: 16.75,
    image: "images/Drops/Drop.jpg",
    description: "Prescription antibiotic eye drops",
  },
  // Injection (81-100 product)
  {
    id: 81,
    name: "MV-Injection",
    category: "injection",
    price: 25.0,
    image: "images/Injection/MV_injection.png",
    description: "Essential vitamin B12 supplement injection",
  },
  // Others (101->.. products)
  {
    id: 101,
    name: "First Aid Kit",
    category: "other",
    price: 35.99,
    image: "images/Others/kit.jpg",
    description: "Complete emergency medical kit for home and travel",
  },
]

// Product Filtering
let searchTerm = ""
let displayedProducts = 12
let currentSort = "name"
let currentCategory = "all"
const currentView = "grid" // Always default to grid view
let filteredProducts = []

function initProductFiltering() {
  const categoryTabs = document.querySelectorAll(".category-tab")
  const searchInput = document.getElementById("productSearch")
  const searchBtn = document.getElementById("searchBtn")
  const sortSelect = document.getElementById("sortSelect")
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  // const viewButtons = document.querySelectorAll(".view-btn") // Removed view buttons

  // Category filtering
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category")
      console.log(`Category clicked: ${category}`)
      setActiveCategory(category)
    })
  })

  // View toggle functionality - REMOVED
  // viewButtons.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     const view = btn.getAttribute("data-view")
  //     setActiveView(view)
  //   })
  // })

  // Automatic view switch based on screen size - REMOVED
  // checkAndSetMobileView()
  // window.addEventListener("resize", debounce(checkAndSetMobileView, 200))

  // Search functionality with improved handling
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        searchTerm = e.target.value.trim()
        console.log(`Search term: "${searchTerm}"`)

        // Change category to "all" when user starts searching
        if (searchTerm && currentCategory !== "all") {
          console.log(`Changing category from ${currentCategory} to "all" due to search`)
          setActiveCategory("all")
          return // setActiveCategory will call renderProducts, so return here
        }

        displayedProducts = 12
        renderProducts()
        updateSearchSuggestions()
      }, 300),
    )

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        performSearch()
      }
    })

    // Clear search when clicking outside
    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        const suggestionsContainer = document.getElementById("searchSuggestions")
        if (suggestionsContainer) {
          suggestionsContainer.style.display = "none"
        }
      }, 200)
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault()
      performSearch()
    })
  }

  // Sort functionality
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value
      console.log(`Sort changed to: ${currentSort}`)
      displayedProducts = 12
      renderProducts()
      showToast(`Products sorted by ${getSortDisplayName(currentSort)}`, "success")
    })
  }

  // Load more functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      displayedProducts += 12
      renderProducts()
      showToast("More products loaded!", "success")
    })
  }
}

// Set Active Category
function setActiveCategory(category) {
  console.log(`Setting active category to: ${category}`)

  // Remove active class from all tabs
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Add active class to selected tab
  const activeTab = document.querySelector(`[data-category="${category}"]`)
  if (activeTab) {
    activeTab.classList.add("active")
    console.log(`Active tab set for category: ${category}`)
  } else {
    console.error(`No tab found for category: ${category}`)
  }

  currentCategory = category
  displayedProducts = 12
  renderProducts()

  const categoryName = category === "all" ? "All Products" : getCategoryDisplayName(category)
  showToast(`Showing ${categoryName}`, "info")
}

// Update Category Counts
function updateCategoryCounts() {
  const counts = {
    all: products.length,
    tablet: products.filter((p) => p.category === "tablet").length,
    syrup: products.filter((p) => p.category === "syrup").length,
    drops: products.filter((p) => p.category === "drops").length,
    other: products.filter((p) => p.category === "other").length,
    injection: products.filter((p) => p.category === "injection").length,
  }

  console.log("Category counts:", counts)

  Object.keys(counts).forEach((category) => {
    const countElement = document.getElementById(`count-${category}`)
    if (countElement) {
      countElement.textContent = counts[category]
    }
  })
}

// Perform Search
function performSearch() {
  const searchInput = document.getElementById("productSearch")
  if (searchInput) {
    searchTerm = searchInput.value.trim()
  }

  console.log(`Performing search for: "${searchTerm}"`)

  // Change to "all" category when performing search
  if (searchTerm && currentCategory !== "all") {
    console.log(`Changing category to "all" for search: "${searchTerm}"`)
    setActiveCategory("all")
    return // setActiveCategory will call renderProducts
  }

  displayedProducts = 12
  renderProducts()

  if (searchTerm) {
    showToast(`Searching for "${searchTerm}"`, "info")
  }
}

// Update Search Suggestions
function updateSearchSuggestions() {
  const suggestionsContainer = document.getElementById("searchSuggestions")

  if (!suggestionsContainer) return

  if (!searchTerm.trim()) {
    suggestionsContainer.style.display = "none"
    return
  }

  const searchTermLower = searchTerm.toLowerCase().trim()

  const suggestions = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        getCategoryDisplayName(product.category).toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower),
    )
    .slice(0, 2) // Limit to maximum 2 suggestions

  if (suggestions.length > 0) {
    suggestionsContainer.innerHTML = suggestions
      .map(
        (product) => `
              <div class="search-suggestion" onclick="selectSuggestion('${product.name.replace(/'/g, "\\'")}'); event.stopPropagation();">
                  <div class="suggestion-content">
                      <strong>${highlightSearchTerm(product.name, searchTerm)}</strong>
                      <span class="suggestion-category">${getCategoryDisplayName(product.category)}</span>
                  </div>
              </div>
          `,
      )
      .join("")
    suggestionsContainer.style.display = "block"
  } else {
    suggestionsContainer.innerHTML = `
          <div class="search-suggestion no-results">
              <div class="suggestion-content">
                  <span>No products found for "${searchTerm}"</span>
              </div>
          </div>
      `
    suggestionsContainer.style.display = "block"
  }
}

// Highlight Search Term in Suggestions
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}

// Select Search Suggestion
function selectSuggestion(productName) {
  const searchInput = document.getElementById("productSearch")
  const suggestionsContainer = document.getElementById("searchSuggestions")

  console.log(`Selecting suggestion: ${productName}`)

  if (searchInput) {
    searchInput.value = productName
    searchInput.focus() // Focus the input to show the filled value
    searchTerm = productName.trim()
  }

  if (suggestionsContainer) {
    suggestionsContainer.style.display = "none"
  }

  // Change to "all" category when selecting a suggestion
  if (currentCategory !== "all") {
    setActiveCategory("all")
    return // setActiveCategory will call renderProducts
  }

  displayedProducts = 12
  renderProducts()
  showToast(`Searching for "${productName}"`, "info")
}

// Render Products
function renderProducts() {
  const productGrid = document.getElementById("productGrid")
  const resultsCount = document.getElementById("resultsCount")
  const loadMoreContainer = document.getElementById("loadMoreContainer")
  const showingCount = document.getElementById("showingCount")
  const totalCount = document.getElementById("totalCount")

  if (!productGrid) return

  // Filter products with improved case-insensitive search
  filteredProducts = products.filter((product) => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory

    const searchTermLower = searchTerm.toLowerCase().trim()
    const matchesSearch =
      !searchTermLower ||
      product.name.toLowerCase().includes(searchTermLower) ||
      product.description.toLowerCase().includes(searchTermLower) ||
      getCategoryDisplayName(product.category).toLowerCase().includes(searchTermLower) ||
      product.category.toLowerCase().includes(searchTermLower)

    return matchesCategory && matchesSearch
  })

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (currentSort) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
        return b.id - a.id // Since we removed ratings, use ID as popularity indicator
      case "newest":
        return b.id - a.id
      case "name":
      default:
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    }
  })

  // Update results count
  if (resultsCount) {
    resultsCount.textContent = filteredProducts.length
  }

  // Show products
  const productsToShow = filteredProducts.slice(0, displayedProducts)

  if (productsToShow.length === 0) {
    productGrid.innerHTML = `
          <div class="empty-state">
              <i class="fas fa-search"></i>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button class="btn btn-outline-primary" onclick="clearFilters()">
                  <i class="fas fa-refresh me-2"></i>
                  Clear Filters
              </button>
          </div>
      `
    if (loadMoreContainer) {
      loadMoreContainer.style.display = "none"
    }
    return
  }

  productGrid.innerHTML = ""
  productsToShow.forEach((product, index) => {
    const productCard = createProductCard(product)
    productCard.setAttribute("data-aos", "fade-up")
    productCard.setAttribute("data-aos-delay", (index % 12) * 50)
    productGrid.appendChild(productCard)
  })

  // Update pagination info
  if (showingCount && totalCount) {
    showingCount.textContent = productsToShow.length
    totalCount.textContent = filteredProducts.length
  }

  // Show/hide load more button
  if (loadMoreContainer) {
    if (displayedProducts < filteredProducts.length) {
      loadMoreContainer.style.display = "flex"
    } else {
      loadMoreContainer.style.display = "none"
    }
  }

  // Update grid view - always grid now
  productGrid.classList.remove("list-view") // Ensure list-view is never applied

  // Refresh AOS
  if (window.AOS) {
    window.AOS.refresh()
  }

  console.log(`Filtered ${filteredProducts.length} products for category: ${currentCategory}, search: "${searchTerm}"`)
}

// Create Product Card
function createProductCard(product) {
  const productCard = document.createElement("div")
  productCard.className = "product-card"

  // Fallback image if local image fails
  const fallbackImage = `https://via.placeholder.com/1024x1600/e5e7eb/6b7280?text=${encodeURIComponent(product.name)}`

  productCard.innerHTML = `
      <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" 
               width="300" height="300" 
               onerror="this.src='${fallbackImage}'">
          <div class="product-badge">${getCategoryDisplayName(product.category)}</div>
      </div>
      <div class="product-content">
          <div class="product-header">
              <h5 class="product-title">${product.name}</h5>
          </div>
          <p class="product-description">${product.description}</p>
          <!-- Price and Add to Cart options removed as per request -->
      </div>
  `

  return productCard
}

// Get Category Display Name
function getCategoryDisplayName(category) {
  const categoryNames = {
    tablet: "Tablets",
    syrup: "Syrups",
    drops: "Drops",
    other: "Others",
    injection: "Injections",
  }
  return categoryNames[category] || "Other"
}

// Get Sort Display Name
function getSortDisplayName(sort) {
  const sortNames = {
    name: "Name (A-Z)",
    "price-low": "Price (Low to High)",
    "price-high": "Price (High to Low)",
    popular: "Most Popular",
    newest: "Newest First",
  }
  return sortNames[sort] || "Name"
}

// Set Active View - REMOVED as only grid view is supported
// function setActiveView(view) {
//   document.querySelectorAll(".view-btn").forEach((btn) => {
//     btn.classList.remove("active")
//   })

//   const activeBtn = document.querySelector(`[data-view="${view}"]`)
//   if (activeBtn) {
//     activeBtn.classList.add("active")
//   }

//   currentView = view
//   updateProductGridView()
//   showToast(`Switched to ${view} view`, "info")
// }

// Update Product Grid View - Simplified as only grid view is supported
// function updateProductGridView() {
//   const productGrid = document.getElementById("productGrid")
//   if (!productGrid) return

//   // Remove all view classes
//   productGrid.classList.remove("list-view")

//   // Add appropriate class based on current view
//   if (currentView === "list") {
//     productGrid.classList.add("list-view")
//   }
// }

// Clear Filters
function clearFilters() {
  console.log("Clearing all filters")

  searchTerm = ""
  currentCategory = "all"
  currentSort = "name"
  displayedProducts = 12

  const searchInput = document.getElementById("productSearch")
  const sortSelect = document.getElementById("sortSelect")

  if (searchInput) searchInput.value = ""
  if (sortSelect) sortSelect.value = "name"

  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  const allTab = document.querySelector('[data-category="all"]')
  if (allTab) {
    allTab.classList.add("active")
  }

  // Hide search suggestions
  const suggestionsContainer = document.getElementById("searchSuggestions")
  if (suggestionsContainer) {
    suggestionsContainer.style.display = "none"
  }

  renderProducts()
  showToast("Filters cleared", "info")
}

// Clear search after viewing product
function clearSearchAfterView() {
  const searchInput = document.getElementById("productSearch")
  const suggestionsContainer = document.getElementById("searchSuggestions")

  if (searchInput) {
    searchInput.value = ""
  }

  if (suggestionsContainer) {
    suggestionsContainer.style.display = "none"
  }

  searchTerm = ""
  displayedProducts = 12
  renderProducts()
}

// Removed addToCart function as per request
// function addToCart(productId) {
//   const product = products.find((p) => p.id === productId)
//   if (product) {
//     showToast(`${product.name} added to cart!`, "success")

//     // Add animation effect
//     const button = event.target.closest(".add-to-cart-btn")
//     if (button) {
//       button.style.transform = "scale(0.95)"
//       setTimeout(() => {
//         button.style.transform = "scale(1)"
//       }, 150)
//     }

//     // Clear search after adding to cart (viewing product)
//     setTimeout(() => {
//       clearSearchAfterView()
//     }, 1000)

//     console.log("Added to cart:", product)
//   }
// }

// Debounce function
function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Show Toast function
function showToast(message, type) {
  const toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  toastContainer.appendChild(toast)

  setTimeout(() => {
    toastContainer.removeChild(toast)
  }, 3000)
}

// Add a new function to check and set view based on screen size - REMOVED
// function checkAndSetMobileView() {
//   const isMobileOrTablet = window.innerWidth <= 992 // Using Bootstrap's 'lg' breakpoint as a general tablet/mobile cutoff

//   if (isMobileOrTablet && currentView !== "list") {
//     setActiveView("list")
//     console.log("Automatically switched to list view for mobile/tablet.")
//   } else if (!isMobileOrTablet && currentView !== "grid") {
//     // Optionally switch back to grid on larger screens if it was list
//     setActiveView("grid")
//     console.log("Automatically switched to grid view for desktop.")
//   }
// }

console.log("NIXIES Pharmaceuticals products functionality initialized! 💊")
console.log("Total products loaded:", products.length)
console.log("Product breakdown:", {
  tablets: products.filter((p) => p.category === "tablet").length,
  syrups: products.filter((p) => p.category === "syrup").length,
  drops: products.filter((p) => p.category === "drops").length,
  others: products.filter((p) => p.category === "other").length,
  injections: products.filter((p) => p.category === "injection").length,
})
