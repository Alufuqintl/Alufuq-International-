document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Scroll Animation (Fade In)
    const fadeElems = document.querySelectorAll('.fade-in, .feature-card, .category-card, .product-category, .scroll-hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElems.forEach(elem => {
        elem.classList.add('scroll-hidden'); // Add initial hidden state
        observer.observe(elem);
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    targetElem.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});



// Product Modal Functions
function openProductModal(name, desc, sizes, image = '') {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDesc');
    const sizeGrid = document.getElementById('sizeGrid');

    if (!modal || !title || !description || !sizeGrid) return;

    // Set content
    title.innerText = name;
    description.innerText = desc;

    // Clear background watermark
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.setProperty('--modal-watermark', 'none');

    // Add image/icon if provided
    const existingIcon = modal.querySelector('.modal-icon-large');
    if (existingIcon) existingIcon.remove();

    if (image) {
        // Set background watermark
        if (!image.includes('<')) {
            modalContent.style.setProperty('--modal-watermark', `url("${image}")`);
        }

        const iconDiv = document.createElement('div');
        iconDiv.className = 'modal-icon-large';
        iconDiv.style.fontSize = '4rem';
        iconDiv.style.textAlign = 'center';
        iconDiv.style.marginBottom = '1.5rem';
        iconDiv.innerHTML = image.includes('<') ? image : (image.length < 10 ? image : `<img src="${image}" style="width: 100px; height: 100px; object-fit: contain;">`);
        modal.querySelector('.modal-header').prepend(iconDiv);
    }

    // Clear and fill sizes
    sizeGrid.innerHTML = '';
    sizes.forEach(size => {
        const sizeTag = document.createElement('div');
        sizeTag.className = 'size-tag';
        sizeTag.innerText = size;
        sizeGrid.appendChild(sizeTag);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scroll
    }
}

// Close modal when clicking outside content
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeProductModal();
    }
}

// Mobile Horizontal Scroll Helper for Cube Grid
document.addEventListener('DOMContentLoaded', () => {
    const cubeGrid = document.querySelector('.cube-grid');
    if (cubeGrid) {
        // Optional: Add drag-to-scroll or just ensure it's smooth
    }
});

