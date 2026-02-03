// MAIN JAVASCRIPT FOR PAMERTASS WEBSITE

// Check Login Status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('pamertassLoggedIn') || sessionStorage.getItem('pamertassLoggedIn');
    const userData = JSON.parse(localStorage.getItem('pamertassUser') || sessionStorage.getItem('pamertassUser') || '{"name":"Guest"}');
    
    if(isLoggedIn) {
        const loginButtons = document.querySelector('.header-actions');
        if(loginButtons) {
            loginButtons.innerHTML = `
                <span class="welcome-user">Halo, <strong>${userData.name}</strong></span>
                <a href="member/my-page.html" class="btn-login">My Page</a>
                <a href="member/logout.html" class="btn-logout">Logout</a>
            `;
        }
    }
}

// Navigation Active State
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if(linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html') ||
           (linkPage.includes(currentPage.replace('.html', '')) && linkPage !== '#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    setActiveNav();
    
    // Update year in footer
    const yearElement = document.querySelector('.footer-copyright p');
    if(yearElement && yearElement.textContent.includes('2026')) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', new Date().getFullYear());
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Add styles if not exists
    if(!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3498db, #2980b9);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: 15px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Form Validation Helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if(!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Format Date
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Export functions
window.PAMERTASS = {
    checkLoginStatus,
    setActiveNav,
    showNotification,
    validateForm,
    formatDate
};