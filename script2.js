 // Function to open modal and display the clicked image



 function openModal(imageId) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImage");
    let img = document.getElementById(imageId);

    modal.style.display = "block";
    modalImg.src = img.src;
}

// Function to close the modal
function closeModal() {
    let modal = document.getElementById("imageModal");
    modal.style.display = "none";
}