const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");
const darkModeCheckbox = document.getElementById("darkModeCheckbox");
const userPreferenceDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");
const menuIcon = document.getElementById("menuIcon");

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Get current page file name
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const notificationButton = document.getElementById('dropdownNotificationButton');
    const dropdownMenu = document.getElementById('dropdownNotification');
    
    notificationButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});
// Apply dark mode based on localStorage or user preference
if (
  isDarkModeEnabled ||
  (!localStorage.getItem("darkMode") && userPreferenceDark)
) {
  document.documentElement.classList.add("dark");
  darkModeIcon.classList.remove("fa-sun");
  darkModeIcon.classList.add("fa-moon");
  darkModeCheckbox.checked = true;
} else {
  document.documentElement.classList.remove("dark");
  darkModeIcon.classList.remove("fa-moon");
  darkModeIcon.classList.add("fa-sun");
  darkModeCheckbox.checked = false;
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = document.documentElement.classList.toggle("dark");
  darkModeIcon.classList.toggle("fa-moon", isDarkMode);
  darkModeIcon.classList.toggle("fa-sun", !isDarkMode);
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Toggle dark mode on checkbox change
darkModeCheckbox.addEventListener("change", () => {
  const isDarkMode = document.documentElement.classList.toggle("dark");
  darkModeIcon.classList.toggle("fa-moon", isDarkMode);
  darkModeIcon.classList.toggle("fa-sun", !isDarkMode);
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Menu icon toggle functionality
document.getElementById("menuToggle").addEventListener("click", function () {
  // Toggle the sidebar shrink class
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("shrink");

  // Toggle the main content margin adjustment
  const mainContent = document.querySelector(".main-content");
  mainContent.classList.toggle("sidebar-shrink");
});

const carousel = document.getElementById("carousel-items");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

let currentIndex = 0;

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < carousel.children.length - 2) {
    // Adjust this number if more mentor cards are added
    currentIndex++;
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
  }
});
