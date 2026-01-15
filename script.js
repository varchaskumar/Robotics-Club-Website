/* =========================================
   Robotics Club Website Main JS
   ========================================= */

// Wait for DOM load before running
document.addEventListener('DOMContentLoaded', () => {
    initThreeJSBackground();
    initMobileMenu();
});

/* -----------------------------------------
   1. THREE.JS 3D BACKGROUND IMPLEMENTATION
   Ensures the background looks "100% as it is"
   but adds 3D depth via parallax.
----------------------------------------- */
function initThreeJSBackground() {
    const canvas = document.querySelector('#bg-canvas');

    // Safety check if canvas exists
    if (!canvas) {
        console.error("Canvas element #bg-canvas not found!");
        return;
    }

    // A. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    // PerspectiveCamera(FOV, Aspect Ratio, Near Clip, Far Clip)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true, // Smooth edges
        alpha: true // Allow transparency if needed
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Ensure sharp rendering on high DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // B. Load the Background Image Texture
    const loader = new THREE.TextureLoader();
    
    // API-READY COMMENT: Future backend could provide dynamic background URLs here [cite: 172]
    // const bgImageUrl = api.getSettings().backgroundUrl || 'images/background/robot-bg.png';
    const bgImageUrl = 'images/background/robot-bg.png';
    
    let texture;
    try {
         texture = loader.load(bgImageUrl);
         // LinearFilter helps smooth the texture when scaled
         texture.minFilter = THREE.LinearFilter; 
    } catch (error) {
        console.error("Error loading background image:", error);
        // Fallback could be implemented here
    }

    // C. Create the Sky Sphere
    // A large sphere that surrounds the camera. 
    // Radius: 500, Width/Height Segments: 60, 40 for smoothness.
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    
    // INVERT GEOMETRY: This is crucial. It makes the texture render on the *inside* of the sphere.
    geometry.scale(-1, 1, 1);

    // Use BasicMaterial as the image already contains lighting information.
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // D. Camera Positioning & Mouse Interaction Variables
    camera.position.set(0, 0, 0.1); // Slightly offset center

    let mouseX = 0;
    let mouseY = 0;
    // Movement multiplier - lower is subtler
    const movementStrength = 0.02; 

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Event listener for mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove);

    function onDocumentMouseMove(event) {
        // Calculate normalized mouse position from center
        mouseX = (event.clientX - windowHalfX) * movementStrength;
        mouseY = (event.clientY - windowHalfY) * movementStrength;
    }

    // E. Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Smoothly interpolate camera position towards mouse target
        // The '0.05' factor controls the easing speed (lag effect)
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        
        // Ensure camera always looks at the center of the scene
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Start the animation loop
    animate();

    // F. Handle Window Resize [cite: 156]
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update camera aspect ratio and renderer size
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

/* -----------------------------------------
   2. MOBILE NAVIGATION TOGGLE [cite: 168]
----------------------------------------- */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle active class to slide menu in/out
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger to 'X'
            hamburgerBtn.classList.toggle('toggle');
        });
    }
}

// API-READY COMMENT: Placeholder for future fetch of upcoming event highlights for the homepage [cite: 172]
// API_CALL_START: Fetch Home Highlights
// async function getHomeHighlights() {
//      try {
//          let response = await fetch('/api/v1/highlights');
//          let data = await response.json();
//          // updateDOM(data);
//      } catch (err) { console.error(err); }
// }
// API_CALL_END

/* Achievement Counter Animation [cite: 162] */
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetNumber = parseInt(target.getAttribute('data-target'));
            animateCounter(target, targetNumber);
            observer.unobserve(target); // Only animate once
        }
    });
}, observerOptions);

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + "+";
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize observers
document.querySelectorAll('.stat-number').forEach(num => {
    counterObserver.observe(num);
});