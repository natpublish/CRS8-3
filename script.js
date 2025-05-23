document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initializeTheme();
  
  // Update time
  updateTime();
  setInterval(updateTime, 1000);
  
  // Initialize charts
  initializeCharts();
  
  // Initialize tabs
  initializeTabs();
  
  // Initialize accordion
  initializeAccordion();
  
  // Initialize settings menu
  initializeSettings();
});

// Theme functions
function initializeTheme() {
  // Get saved theme preferences or set defaults
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedColorTheme = localStorage.getItem('color-theme') || 'blue';
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-color-theme', savedColorTheme);
  
  // Update UI to show active theme
  updateThemeUI(savedTheme, savedColorTheme);
}

function updateThemeUI(theme, colorTheme) {
  // Update theme mode checkmarks
  document.querySelectorAll('.check-icon').forEach(icon => {
    icon.style.display = 'none';
  });
  
  const activeThemeCheck = document.querySelector(`.${theme}-check`);
  if (activeThemeCheck) {
    activeThemeCheck.style.display = 'inline';
  }
  
  // Update color theme buttons
  document.querySelectorAll('.color-button').forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-color') === colorTheme) {
      button.classList.add('active');
    }
  });
}

// Time and date functions
function updateTime() {
  const now = new Date();
  
  // Update time
  const timeElement = document.getElementById('current-time');
  timeElement.textContent = now.toLocaleTimeString('id-ID');
  
  // Update date
  const dateElement = document.getElementById('current-date');
  dateElement.textContent = now.toLocaleDateString('id-ID');
}

// Chart initialization
function initializeCharts() {
  // Income chart (empty)
  const incomeCtx = document.getElementById('income-chart').getContext('2d');
  new Chart(incomeCtx, {
    type: 'pie',
    data: {
      labels: ['Tidak Ada Pemasukan'],
      datasets: [{
        data: [0],
        backgroundColor: ['#4ade80'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
  
  // Expense chart (empty)
  const expenseCtx = document.getElementById('expense-chart').getContext('2d');
  new Chart(expenseCtx, {
    type: 'pie',
    data: {
      labels: ['Tidak Ada Pengeluaran'],
      datasets: [{
        data: [0],
        backgroundColor: ['#f87171'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
}

// Tab functionality
function initializeTabs() {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked trigger and corresponding content
      trigger.classList.add('active');
      const tabId = trigger.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
}

// Accordion functionality
function initializeAccordion() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded attribute
      trigger.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle content visibility
      if (isExpanded) {
        content.classList.remove('active');
      } else {
        content.classList.add('active');
      }
    });
    
    // Initialize aria attributes
    trigger.setAttribute('aria-expanded', 'false');
  });
}

// Settings menu functionality
function initializeSettings() {
  const settingsButton = document.getElementById('settings-button');
  const settingsMenu = document.getElementById('settings-menu');
  
  // Toggle settings menu
  settingsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('hidden');
  });
  
  // Close settings menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target) && e.target !== settingsButton) {
      settingsMenu.classList.add('hidden');
    }
  });
  
  // Theme mode selection
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeUI(theme, document.documentElement.getAttribute('data-color-theme'));
    });
  });
  
  // Color theme selection
  const colorButtons = document.querySelectorAll('.color-button');
  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const colorTheme = button.getAttribute('data-color');
      document.documentElement.setAttribute('data-color-theme', colorTheme);
      localStorage.setItem('color-theme', colorTheme);
      updateThemeUI(document.documentElement.getAttribute('data-theme'), colorTheme);
    });
  });
}
