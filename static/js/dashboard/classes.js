document.getElementById('scrollable-container').addEventListener('wheel', function(event) {
  event.preventDefault();
  
  const container = this;
  const scrollAmount = event.deltaY * 3; // Adjust multiplier for faster scrolling
  
  container.scrollBy({
      top: scrollAmount,
      behavior: 'smooth' // or 'auto' for immediate scrolling
  });
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");
const darkModeCheckbox = document.getElementById("darkModeCheckbox");
const userPreferenceDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";

if (isDarkModeEnabled || (!localStorage.getItem("darkMode") && userPreferenceDark)) {
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

darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    darkModeIcon.classList.toggle("fa-moon", isDarkMode);
    darkModeIcon.classList.toggle("fa-sun", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

darkModeCheckbox.addEventListener("change", () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    darkModeIcon.classList.toggle("fa-moon", isDarkMode);
    darkModeIcon.classList.toggle("fa-sun", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Calendar script
document.addEventListener('DOMContentLoaded', function () {
    const daysContainer = document.querySelector('#calendar-days');
    const monthYearDisplay = document.querySelector('#month-year');
    const prevButton = document.querySelector('#prev-month');
    const nextButton = document.querySelector('#next-month');
    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = month === 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        daysContainer.innerHTML = '';

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            daysContainer.innerHTML += `<div class="text-center text-gray-400">${lastDayOfLastMonth - i}</div>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            if (i === date.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
                daysContainer.innerHTML += `<div class="text-center bg-green-600 rounded-full text-md">${i}</div>`;
            } else {
                daysContainer.innerHTML += `<div class="text-center">${i}</div>`;
            }            
        }

        const remainingDays = 42 - daysContainer.childElementCount;
        for (let i = 1; i <= remainingDays; i++) {
            daysContainer.innerHTML += `<div class="text-center text-gray-400">${i}</div>`;
        }
    }

    renderCalendar(currentDate);

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
});

// Navbar active state
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// Dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const notificationButton = document.getElementById('dropdownNotificationButton');
    const dropdownMenu = document.getElementById('dropdownNotification');
    
    notificationButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!notificationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});

// Menu icon toggle
document.getElementById("menuToggle").addEventListener("click", function () {
    // Toggle the sidebar shrink class
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("shrink");
  
    // Toggle the main content margin adjustment
    const mainContent = document.querySelector(".main-content");
    mainContent.classList.toggle("sidebar-shrink");
  
    // Save the sidebar state to localStorage
    if (sidebar.classList.contains("shrink")) {
      localStorage.setItem("sidebarState", "shrink");
    } else {
      localStorage.setItem("sidebarState", "expanded");
    }
  });
  
  // On page load, check the sidebar state from localStorage
  window.addEventListener("load", function () {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    const sidebarState = localStorage.getItem("sidebarState");
  
    if (sidebarState === "shrink") {
      sidebar.classList.add("shrink");
      mainContent.classList.add("sidebar-shrink");
    } else {
      sidebar.classList.remove("shrink");
      mainContent.classList.remove("sidebar-shrink");
    }
  });
// Carousel functionality
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
        currentIndex++;
        carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
    }
});