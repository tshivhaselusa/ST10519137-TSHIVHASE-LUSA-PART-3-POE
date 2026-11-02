// ==========================================
// 1. CLIENT-SIDE FORM VALIDATION & AJAX
// (Required for Page 4: Contact Us & Enquiry)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    
    // Grab the form from Page 4
    const contactForm = document.querySelector("form[action='#']");

    if (contactForm) {
        // Add an error message container dynamically
        const errorDiv = document.createElement("div");
        errorDiv.id = "form-error-message";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "10px";
        errorDiv.style.fontWeight = "bold";
        contactForm.appendChild(errorDiv);

        // Listen for the form submission
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop normal submission to do AJAX

            // Get input values
            const nameInput = contactForm.querySelector("input[name='name']");
            const emailInput = contactForm.querySelector("input[name='email']");
            const messageInput = contactForm.querySelector("textarea");

            let isValid = true;
            let errorMessage = "";

            // Validation checks
            if (nameInput.value.trim().length < 3) {
                isValid = false;
                errorMessage += "Please enter a valid name (at least 3 characters).\n";
            }

            // Basic email format validation using Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                errorMessage += "Please enter a valid email address.\n";
            }

            if (messageInput.value.trim() === "") {
                isValid = false;
                errorMessage += "Please type a message before submitting.\n";
            }

            // Display errors or process form
            if (!isValid) {
                errorDiv.innerText = errorMessage;
                errorDiv.style.color = "red";
            } else {
                // If valid, simulate AJAX submission
                errorDiv.innerText = "Sending message...";
                errorDiv.style.color = "green";

                // Simulate a network request with setTimeout
                setTimeout(function () {
                    errorDiv.innerText = "Thank you, " + nameInput.value + "! Your message has been sent successfully.";
                    contactForm.reset(); // Clear the form
                }, 1500); // 1.5 second delay to simulate loading
            }
        });
    }
});


// ==========================================
// 2. INTERACTIVE IMAGE GALLERY (LIGHTBOX)
// (Required for Page 1 & 2 images)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    
    // Find all images with the class 'lightbox-item'
    const galleryImages = document.querySelectorAll('.lightbox-item');

    galleryImages.forEach(function (img) {
        // Change cursor to indicate it's clickable
        img.style.cursor = "pointer";

        img.addEventListener('click', function () {
            // Create the lightbox overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999';
            overlay.style.cursor = 'pointer';

            // Create the large image
            const largeImg = document.createElement('img');
            largeImg.src = this.src; // Uses the same source as the clicked image
            largeImg.style.maxWidth = '90%';
            largeImg.style.maxHeight = '90%';
            largeImg.style.borderRadius = '8px';
            largeImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';

            // Add image to overlay, overlay to body
            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);

            // Close the lightbox when clicked anywhere on the overlay
            overlay.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
        });
    });
});


// ==========================================
// 3. DYNAMIC CONTENT (MENU SEARCH/FILTER)
// (Required for Page 3: Menu)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    
    // Check if we are on the Menu page
    const menuMain = document.querySelector("main");
    const isMenuPage = document.title.includes("Menu");

    if (isMenuPage && menuMain) {
        
        // 1. Create a search input box dynamically
        const searchContainer = document.createElement('div');
        searchContainer.style.marginBottom = "20px";
        searchContainer.style.textAlign = "center";

        const searchInput = document.createElement('input');
        searchInput.type = "text";
        searchInput.id = "menu-search";
        searchInput.placeholder = "Search for a burger, kota, or drink...";
        searchInput.style.padding = "10px";
        searchInput.style.width = "80%";
        searchInput.style.maxWidth = "400px";
        searchInput.style.borderRadius = "5px";
        searchInput.style.border = "1px solid #ccc";

        searchContainer.appendChild(searchInput);
        
        // Insert the search box right below the "Menu" heading
        const menuHeading = menuMain.querySelector("h2");
        menuHeading.parentNode.insertBefore(searchContainer, menuHeading.nextSibling);

        // 2. Add filtering logic
        searchInput.addEventListener('keyup', function () {
            const filterValue = searchInput.value.toLowerCase();
            
            // Select all list items in the menu
            const listItems = menuMain.querySelectorAll("li");

            listItems.forEach(function (item) {
                const text = item.innerText.toLowerCase();
                
                // If the text matches the search, show it. Otherwise, hide it.
                if (text.includes(filterValue)) {
                    item.style.display = "list-item"; // Show
                } else {
                    item.style.display = "none"; // Hide
                }
            });
        });
    }
});