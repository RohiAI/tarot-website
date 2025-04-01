/**
 * Main JavaScript for Mystic Tarot website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Initialize Calendly
    async function initCalendly() {
        const widget = document.querySelector('.calendly-inline-widget');
        const loading = document.getElementById('loading');
        
        if (!widget || !loading) return;
        
        try {
            // Fetch Calendly URL from server config
            const response = await fetch('/api/config');
            const config = await response.json();
            
            if (!config.calendlyUrl) {
                throw new Error('Calendly URL not configured');
            }
            
            // Initialize Calendly widget
            Calendly.initInlineWidget({
                url: config.calendlyUrl,
                parentElement: widget
            });
            
            // Hide loading message
            loading.style.display = 'none';
        } catch (error) {
            console.error('Error initializing Calendly:', error);
            if (loading) {
                loading.textContent = 'Error loading booking calendar. Please try again later.';
            }
        }
    }

    // Initialize Calendly when the script is loaded
    if (window.Calendly) {
        initCalendly();
    } else {
        const calendlyScript = document.querySelector('[src*="calendly"]');
        if (calendlyScript) {
            calendlyScript.addEventListener('load', initCalendly);
        }
    }
}); 