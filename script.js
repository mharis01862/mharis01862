document.addEventListener('DOMContentLoaded', () => {
    
    // --- GALLERY CAROUSEL LOGIC ---
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    if (wrapper && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create Dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        // Auto play gallery
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
});

// --- POSTER MODAL FUNCTIONS ---
// (Kept outside DOMContentLoaded so HTML onclick can find them)

function openPosterModal(imgSrc, captionText) {
    const modal = document.getElementById("posterModal");
    const modalImg = document.getElementById("modalImg");
    const caption = document.getElementById("modalCaption");

    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
        caption.innerHTML = captionText;
        document.body.style.overflow = "hidden"; // Disable scrolling
    }
}

function closePosterModal() {
    const modal = document.getElementById("posterModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scrolling
    }
}

// Close modal on 'Esc' key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closePosterModal();
});
