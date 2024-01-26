document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const imagesContainer = document.getElementById('imagesContainer');
    const accessKey = 'schyr56-AzEIUoIk7JEqhzdKZrsng9ot5Vzt9zmz_Ts';

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (query !== '') {
            const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&
            client_id=${accessKey}&per_page=369`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Clear previous images
                imagesContainer.innerHTML = '';

                displayImages(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });

    function displayImages(photos) {
        photos.forEach(photo => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('img-container');

            const imageElement = document.createElement('img');
            imageElement.src = photo.urls.regular;
            imageElement.alt = photo.alt_description;

            const downloadButton = document.createElement('a');
            downloadButton.href = photo.urls.full;
            downloadButton.download = 'image.jpg';
            downloadButton.innerText = 'Download';
            downloadButton.classList.add('download-btn');

            imageContainer.appendChild(imageElement);
            imageContainer.appendChild(downloadButton);
            imagesContainer.appendChild(imageContainer);
        });
    }
    function downloadAndStoreImage(imageUrl) {
        // Create a link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = 'image.jpg';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Remove the link element from the DOM
        document.body.removeChild(downloadLink);

        // Store the image URL in local storage
        const storedImages = JSON.parse(localStorage.getItem('downloadedImages')) || [];
        storedImages.push(imageUrl);
        localStorage.setItem('downloadedImages', JSON.stringify(storedImages));
    }
});











