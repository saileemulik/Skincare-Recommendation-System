function getRecommendations() {
    var skinType = document.getElementById("SkinType").value;
    var concern = document.getElementById("Concern").value;

    if (skinType && concern) {
        var apiUrl = "http://127.0.0.1:5000/recommend?skin_type=" + encodeURIComponent(skinType) + "&concern=" + encodeURIComponent(concern);

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) { // Check if data is an array
                displayRecommendations(data);
            } else {
                console.error('Invalid data format:', data);
                // Display error message to the user
                alert("Error fetching recommendations. Please try again later.");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display error message to the user
            alert("Error fetching recommendations. Please try again later.");
        });
    } else {
        alert("Please provide both Skin Type and Concern.");
    }
}

function displayRecommendations(data) {
    var recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = ""; // Clear previous recommendations

    // Display each recommendation in the results
    data.forEach(product => {
        var productDiv = document.createElement("div");
        productDiv.classList.add("Product");
        
        // Product name
        var productName = document.createElement("h3");
        productName.textContent = product.Product;

        // Product image
        var productImage = document.createElement("img");
        productImage.src = product.product_pic;
        productImage.alt = product.Product; // Alt text for accessibility
        productImage.style.width = "200px"; // Adjust width as needed
        productImage.style.height = "200px";

        // Append product name and image to productDiv
        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);

        // Append productDiv to recommendationsDiv
        recommendationsDiv.appendChild(productDiv);
    });
}
