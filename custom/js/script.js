document.addEventListener('DOMContentLoaded', function()
{
    initializeGallery();
    initializeGalleryFilters();
});

function initializeGallery()
{
    const galleryImages = document.querySelectorAll('.gallery img');
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeBtn = document.getElementById('close-btn');

    if (!galleryImages.length || !fullscreenContainer ||
        !fullscreenImage || !closeBtn) {
        return;
    }
    galleryImages.forEach(function(image) {
        image.addEventListener('click', function() {
            fullscreenImage.src = this.src;
            fullscreenImage.alt = this.alt;
            fullscreenContainer.style.display = 'flex';
        });
    });
    closeBtn.addEventListener('click', function() {
        fullscreenContainer.style.display = 'none';
    });
    fullscreenContainer.addEventListener('click', function(event) {
        if (event.target === fullscreenContainer) {
            fullscreenContainer.style.display = 'none';
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && fullscreenContainer.style.display === 'flex') {
            fullscreenContainer.style.display = 'none';
        }
    });
}

function initializeGalleryFilters()
{
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            const galleryImages = document.querySelectorAll('.gallery img');
            galleryImages.forEach(image => {
                const imageCategory = image.getAttribute('data-category');
                if (filterValue == 'all' || filterValue == imageCategory) {
                    image.style.display = 'block';
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 50);
                } else {
                    image.style.opacity = '0';
                    setTimeout(() => {
                        image.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}