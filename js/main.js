// Global variables
// const currentCategory = "all"
// const searchTerm = ""
// const currentSort = "name"
// const displayedProducts = 12
// const filteredProducts = []
// const currentView = "grid"

// Function declarations
function initProductFiltering() {
  // Placeholder for product filtering initialization
}

function updateCategoryCounts() {
  // Placeholder for updating category counts
}

function renderProducts() {
  // Placeholder for rendering products
}

function setActiveCategory(category) {
  // Placeholder for setting active category
}

function showToast(message, type) {
  // Placeholder for showing toast messages
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...")

  // Initialize theme
  initTheme()

  // Initialize AOS animations
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }

  // Initialize components
  initNavigation()
  initHeroButtons()
  initProductFiltering()
  initContactForm()
  initBackToTop()
  initCounterAnimation()
  initSmoothScrolling()

  // Load products
  updateCategoryCounts()
  renderProducts()

  console.log("Initialization complete!")
})

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = document.getElementById("themeIcon")
  const body = document.body

  if (!themeToggle || !themeIcon) return

  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  })

  function setTheme(theme) {
    body.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (theme === "dark") {
        themeIcon.className = "fas fa-sun"
        navbar.classList.remove("navbar-light")
        navbar.classList.add("navbar-dark")
      } else {
        themeIcon.className = "fas fa-moon"
        navbar.classList.remove("navbar-dark")
        navbar.classList.add("navbar-light")
      }
    }
  }
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById("mainNav")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.padding = "0.5rem 0"
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)"
      } else {
        navbar.style.padding = "1rem 0"
        navbar.style.boxShadow = "none"
      }
    })
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Footer category links
  const footerCategoryLinks = document.querySelectorAll(".footer-links a[data-category]")
  footerCategoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const category = link.getAttribute("data-category")
      setActiveCategory(category)
      const productsSection = document.getElementById("products")
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

// Hero Buttons
function initHeroButtons() {
  const exploreBtn = document.getElementById("exploreProductsBtn")
  const learnMoreBtn = document.getElementById("learnMoreBtn")

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      console.log("Explore Products clicked")
      const productsSection = document.getElementById("products")
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" })
        showToast("Welcome to our product catalog!", "info")
      }
    })
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      console.log("Learn More clicked")
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" })
        showToast("Learn more about NIXIES Pharmaceuticals", "info")
      }
    })
  }
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      if (!name || !email || !subject || !message) {
        showToast("Please fill in all required fields", "error")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address", "error")
        return
      }

      const mailtoSubject = encodeURIComponent(`Contact Form: ${subject}`)
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)

      window.location.href = `mailto:nixies.uk@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
      showToast("Email client opened! Please send the email to complete your request.", "success")
      contactForm.reset()
    })
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      let displayValue = Math.floor(current)
      if (target >= 1000000) {
        displayValue = (displayValue / 1000000).toFixed(1) + "M"
      } else if (target >= 1000) {
        displayValue = (displayValue / 1000).toFixed(0) + "K"
      }

      counter.textContent = displayValue + (counter.textContent.includes("%") ? "%" : "")
    }, 16)
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href")

      // Prevent default behavior and return if href is just "#" or empty
      if (!targetId || targetId === "#") {
        e.preventDefault()
        return
      }

      // Only attempt to querySelector if targetId is a valid non-empty string and not just "#"
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        e.preventDefault() // Prevent default only if a valid target element is found
        const offsetTop = targetElement.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Image+Not+Available"
    })
  })
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const toasts = document.querySelectorAll(".custom-toast")
    toasts.forEach((toast) => toast.remove())

    const suggestions = document.getElementById("searchSuggestions")
    if (suggestions) {
      suggestions.style.display = "none"
    }
  }

  if (e.key === "Enter" && e.target.classList.contains("category-tab")) {
    e.target.click()
  }
})

// Click outside to close search suggestions
document.addEventListener("click", (e) => {
  const searchContainer = document.querySelector(".search-container-enhanced")
  const suggestions = document.getElementById("searchSuggestions")

  if (suggestions && searchContainer && !searchContainer.contains(e.target)) {
    suggestions.style.display = "none"
  }
})

console.log("NIXIES Pharmaceuticals main functionality initialized! 💊🏥")
