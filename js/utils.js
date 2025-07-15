// Toast Notification System
function showToast(message, type = "info") {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".custom-toast")
  existingToasts.forEach((toast) => toast.remove())

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `custom-toast toast-${type}`
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)} toast-icon"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add toast styles
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
    `

  document.body.appendChild(toast)

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => toast.remove(), 300)
    }
  }, 5000)
}

// Get Toast Icon
function getToastIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  }
  return icons[type] || icons.info
}

// Get Toast Color
function getToastColor(type) {
  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  }
  return colors[type] || colors.info
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add toast animations to CSS
const toastStyles = document.createElement("style")
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .toast-icon {
        font-size: 1.2rem;
    }
    
    .toast-message {
        flex: 1;
        font-weight: 500;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .toast-close:hover {
        opacity: 1;
    }
`
document.head.appendChild(toastStyles)

console.log("NIXIES Pharmaceuticals utilities initialized! 🛠️")
