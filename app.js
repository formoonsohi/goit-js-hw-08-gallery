const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
const galleryList = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const closeBtn = lightbox.querySelector('[data-action="close-lightbox"]');
const overlay = lightbox.querySelector(".lightbox__overlay");

const createMarkup = (items) =>
  items
    .map(
      ({ preview, original, description }, index) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");

galleryList.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

let currentIndex = null;

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage(index);
  lightbox.classList.add("is-open");
  window.addEventListener("keydown", onKeyDown);
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  currentIndex = null;
  window.removeEventListener("keydown", onKeyDown);
}

function updateLightboxImage(index) {
  const { original, description } = galleryItems[index];
  lightboxImage.src = original;
  lightboxImage.alt = description;
}

function onGalleryClick(e) {
  e.preventDefault();
  const img = e.target.closest(".gallery__image");
  if (!img) return;

  openLightbox(Number(img.dataset.index));
}

function onKeyDown(e) {
  if (e.key === "Escape") {
    closeLightbox();
    return;
  }
  if (e.key === "ArrowRight" && currentIndex !== null) {
    const next = (currentIndex + 1) % galleryItems.length;
    currentIndex = next;
    updateLightboxImage(next);
  }
  if (e.key === "ArrowLeft" && currentIndex !== null) {
    const prev = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    currentIndex = prev;
    updateLightboxImage(prev);
  }
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeLightbox();
  }
}

galleryList.addEventListener("click", onGalleryClick);
closeBtn.addEventListener("click", closeLightbox);
overlay.addEventListener("click", onOverlayClick);
