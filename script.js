
function searchBooks() {
    filterBooks();
}

function filterBooks() {

    // Get the text entered in the search box
    let searchText = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    // Get the selected category
    let selectedCategory = document.getElementById("categoryFilter")
        .value.toLowerCase();

    // Get all book cards
    let books = document.querySelectorAll(".book");

    // Count matching books
    let visibleCount = 0;

    books.forEach(function(book) {

        let bookInformation = book.textContent.toLowerCase();

        // Check whether the book matches the search
        let matchesSearch = bookInformation.includes(searchText);

        // Check whether the category matches
        let matchesCategory =
            selectedCategory === "all" ||
            bookInformation.includes("category: " + selectedCategory);

        // Show books matching both conditions
        if (matchesSearch && matchesCategory) {
            book.style.display = "block";
            visibleCount++;
        } else {
            book.style.display = "none";
        }
    });

    // Show a message when no matching books are found
    let noResults = document.getElementById("noResults");

    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }
}


// Handle book checkout
function checkoutBook(button) {

    // Find the selected book
    let book = button.closest(".book");

    // Get the book title
    let bookTitle = book.querySelector("h3").textContent;

    // Ask for confirmation
    let confirmCheckout = confirm(
        "Do you want to check out " + bookTitle + "?"
    );

    if (confirmCheckout) {

        // Change book availability
        let paragraphs = book.querySelectorAll("p");

        paragraphs.forEach(function(p) {
            if (p.textContent.includes("Availability:")) {
                p.textContent = "Availability: Checked Out";
            }
        });

        // Disable checkout button
        button.textContent = "Checked Out";
        button.disabled = true;

        alert(bookTitle + " checked out successfully!");
    }
}
