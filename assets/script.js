function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    let content = document.querySelector(".content");
    sidebar.classList.toggle("hide");
    content.classList.toggle("hide");
}


document.addEventListener("DOMContentLoaded", function () {
    let postsList = document.getElementById("posts-list");
    let paginationContainer = document.getElementById("pagination");

    let posts = [];
    let currentPage = 1;
    const itemsPerPage = 7;

    fetch("/assets/posts.json")
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPagination();
            displayPosts();
        })
        .catch(error => console.error("Error loading posts:", error));

    function displayPosts() {
        postsList.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(post => {
            let listItem = document.createElement("li");
            listItem.style.margin = "2rem 0 3rem 0";
            listItem.style.listStyle = "none";
            listItem.style.padding = "1rem";
            listItem.style.border = "2px solid #000";
            listItem.style.boxShadow = "0.5rem 0.5rem #000e";

            let link = document.createElement("a");
            link.href = "/posts/?id=" + post.id;
            link.textContent = `${post.title} (${post.date})`;
            link.style.fontSize = "25px";
            link.style.fontWeight = "700";
            link.style.textDecoration = "none";
            link.style.color = "#000";

            let br = document.createElement("br");

            let tagsSpan = document.createElement("span");
            tagsSpan.style.fontSize = "18px";
            tagsSpan.style.color = "#000";
            tagsSpan.style.fontWeight = "500";
            tagsSpan.textContent = ` [${post.tags.join(", ")}]`;

            listItem.appendChild(link);
            link.appendChild(br);
            link.appendChild(tagsSpan);
            postsList.appendChild(listItem);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        paginationContainer.style.display = "flex";
        paginationContainer.style.justifyContent = "left";
        paginationContainer.style.gap = "1rem";

        let totalPages = Math.ceil(posts.length / itemsPerPage);

        if (totalPages > 1) {
            let prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.classList.add("general-btn");
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener("click", function () {
                if (currentPage > 1) {
                    currentPage--;
                    displayPosts();
                    renderPagination();
                }
            });

            if (currentPage === 1) {
                prevButton.style.opacity = "60%";
            }

            let nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.classList.add("general-btn");
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener("click", function () {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayPosts();
                    renderPagination();
                }
            });

            if (currentPage === totalPages) {
                nextButton.style.opacity = "60%";
            }

            paginationContainer.appendChild(prevButton);
            paginationContainer.appendChild(nextButton);
        }
    }

});
