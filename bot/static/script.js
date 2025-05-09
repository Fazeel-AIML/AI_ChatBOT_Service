// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.querySelector("body");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      // Toggle active class on hamburger
      hamburger.classList.toggle("active");
      // Toggle active class on nav links
      navLinks.classList.toggle("active");
      // Toggle menu-open class on body to prevent scrolling when menu is open
      body.classList.toggle("menu-open");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinkItems = document.querySelectorAll(".nav-links a");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (
      navLinks.classList.contains("active") &&
      !isClickInsideNav &&
      !isClickOnHamburger
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Image Slider Functionality
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let slideInterval;

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Function to show next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  // Function to show previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    showSlide(prevIndex);
  }

  // Set up event listeners for slider controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      clearInterval(slideInterval);
      prevSlide();
      startSlideInterval();
    });

    nextBtn.addEventListener("click", function () {
      clearInterval(slideInterval);
      nextSlide();
      startSlideInterval();
    });
  }

  // Add click event listeners to dots
  if (dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        clearInterval(slideInterval);
        const slideIndex = parseInt(this.getAttribute("data-index"));
        showSlide(slideIndex);
        startSlideInterval();
      });
    });

    // Function to start automatic slide interval
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Start the automatic slider
    startSlideInterval();
  }

  // Chatbot Functionality - FIX HERE
  const chatbotIcon = document.getElementById("chatbotIcon");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeChatbot = document.getElementById("closeChatbot");
  const userInput = document.getElementById("userInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatbotMessages = document.getElementById("chatbotMessages");

  // Check if chatbot elements exist
  if (chatbotIcon && chatbotContainer) {
    // Toggle chatbot visibility
    chatbotIcon.addEventListener("click", function () {
      // Show chatbot container and hide icon
      chatbotContainer.style.display = "flex";
      chatbotIcon.style.display = "none";
    });

    // Close chatbot
    if (closeChatbot) {
      closeChatbot.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
        chatbotIcon.style.display = "flex";
      });
    }

    // Send message functionality
    if (sendMessage && userInput) {
      sendMessage.addEventListener("click", function () {
        sendUserMessage();
      });

      userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          sendUserMessage();
        }
      });
    }
  }

  // Function to send user message and get response
  function sendUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    displayMessage(message, "user");
    userInput.value = "";

    // Get simple AI response
    setTimeout(() => {
      const response = getSimpleResponse(message);
      displayMessage(response, "bot");
    }, 800);
  }

  // Function to display messages in the chatbot
  function displayMessage(message, sender) {
    if (!chatbotMessages) return;

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender + "-message");

    const contentElement = document.createElement("div");
    contentElement.classList.add("message-content");
    contentElement.innerHTML = `<p>${message}</p>`;

    messageElement.appendChild(contentElement);
    chatbotMessages.appendChild(messageElement);

    // Scroll to bottom of messages
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Simple responses for the chatbot
  function getSimpleResponse(message) {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (lowerMsg.includes("help")) {
      return "I'm here to help! You can ask me about our chatbot services, features, pricing, or how to get started.";
    } else if (
      lowerMsg.includes("price") ||
      lowerMsg.includes("pricing") ||
      lowerMsg.includes("cost")
    ) {
      return "Our pricing starts at $99/month for the Basic plan. We also offer Professional ($249/month) and Enterprise (custom pricing) plans. Would you like more details?";
    } else if (lowerMsg.includes("feature")) {
      return "Our AI chatbot features include natural language processing, sentiment analysis, multi-language support, and seamless integration with your existing systems.";
    } else if (lowerMsg.includes("contact") || lowerMsg.includes("support")) {
      return "You can reach our support team at support@aichatbot.com or call us. Would you like me to provide a link to our contact page?";
    } else if (lowerMsg.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I appreciate your message. Could you provide more details so I can better assist you? You can ask about our services, features, pricing, or how to get started.";
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".feature-card, .testimonial-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animation
  document
    .querySelectorAll(".feature-card, .testimonial-card")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);

  // Call once on load to check for elements already in view
  animateOnScroll();

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // User Authentication Status
  updateAuthUI();

  // Chatbot functionality
  initChatbot();
});

// Function to check if user is logged in and update UI accordingly
function updateAuthUI() {
  const user = JSON.parse(
    sessionStorage.getItem("user") || localStorage.getItem("user") || "null"
  );
  const authButtons = document.querySelector(".auth-buttons");

  if (user && user.isLoggedIn) {
    // User is logged in
    if (authButtons) {
      authButtons.innerHTML = `
        <div class="user-menu">
          <button class="user-menu-btn">
            <span class="user-name">${user.name}</span>
            <i class="fas fa-user-circle"></i>
          </button>
          <div class="user-dropdown">
            <a href="#" class="dropdown-item">My Account</a>
            <a href="#" class="dropdown-item">Dashboard</a>
            <a href="#" class="dropdown-item" id="logoutBtn">Logout</a>
          </div>
        </div>
      `;

      // User menu toggle
      const userMenuBtn = document.querySelector(".user-menu-btn");
      const userDropdown = document.querySelector(".user-dropdown");

      if (userMenuBtn) {
        userMenuBtn.addEventListener("click", function (e) {
          e.preventDefault();
          userDropdown.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
          if (!e.target.closest(".user-menu")) {
            userDropdown.classList.remove("active");
          }
        });
      }

      // Logout functionality
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          logout();
        });
      }
    }
  }
}

// Logout function
function logout() {
  // Clear user data from storage
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");

  // Reload the page
  window.location.reload();
}

// Initialize Chatbot
function initChatbot() {
  const chatbotIcon = document.getElementById("chatbotIcon");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeChatbot = document.getElementById("closeChatbot");
  const userInput = document.getElementById("userInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatbotMessages = document.getElementById("chatbotMessages");

  if (!chatbotIcon || !chatbotContainer) return;

  // Toggle chatbot visibility
  chatbotIcon.addEventListener("click", function () {
    chatbotContainer.classList.add("active");
    userInput.focus();
  });

  // Close chatbot
  if (closeChatbot) {
    closeChatbot.addEventListener("click", function () {
      chatbotContainer.classList.remove("active");
    });
  }

  // Send message when button is clicked
  if (sendMessage) {
    sendMessage.addEventListener("click", function () {
      sendUserMessage();
    });
  }

  // Send message when enter key is pressed
  if (userInput) {
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendUserMessage();
      }
    });
  }

  // Function to send user message and get response
  function sendUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    displayMessage(message, "user");
    userInput.value = "";

    // Process the message and get AI response
    getAIResponse(message)
      .then((response) => {
        // Display AI response with a small delay to simulate thinking
        setTimeout(() => {
          displayMessage(response, "bot");
        }, 800);
      })
      .catch((error) => {
        console.error("Error getting AI response:", error);
        displayMessage(
          "Sorry, I encountered an error. Please try again.",
          "bot"
        );
      });
  }

  // Function to display messages in the chatbot
  function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender + "-message");

    const contentElement = document.createElement("div");
    contentElement.classList.add("message-content");

    const messagePara = document.createElement("p");
    messagePara.textContent = message;

    messageContent.appendChild(messagePara);
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Function to get AI response (simulated)
  function getAIResponse(message) {
    return new Promise((resolve) => {
      // Simple responses based on keywords (in a real app, this would be an API call)
      const lowerMsg = message.toLowerCase();

      // Simulate API delay
      setTimeout(() => {
        if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
          resolve("Hello! How can I help you today?");
        } else if (lowerMsg.includes("help")) {
          resolve(
            "I'm here to help! You can ask me about our chatbot services, features, pricing, or how to get started."
          );
        } else if (
          lowerMsg.includes("price") ||
          lowerMsg.includes("pricing") ||
          lowerMsg.includes("cost")
        ) {
          resolve(
            "Our pricing starts at $29/month for the Basic plan. We also offer Professional ($79/month) and Enterprise (custom pricing) plans. Would you like more details?"
          );
        } else if (lowerMsg.includes("feature")) {
          resolve(
            "Our AI chatbot features include natural language processing, sentiment analysis, multi-language support, and seamless integration with your existing systems. Check out our Features page for more details!"
          );
        } else if (
          lowerMsg.includes("contact") ||
          lowerMsg.includes("support")
        ) {
          resolve(
            "You can reach our support team at support@aichatbot.com or call us at +1 (234) 567-8901. Would you like me to provide a link to our contact page?"
          );
        } else if (
          lowerMsg.includes("sign up") ||
          lowerMsg.includes("signup") ||
          lowerMsg.includes("register")
        ) {
          resolve(
            "Great! You can sign up for a free trial at <a href='signup.html'>our signup page</a>. No credit card required."
          );
        } else if (
          lowerMsg.includes("login") ||
          lowerMsg.includes("log in") ||
          lowerMsg.includes("account")
        ) {
          resolve(
            "You can access your account at <a href='login.html'>our login page</a>."
          );
        } else if (lowerMsg.includes("thank")) {
          resolve(
            "You're welcome! Is there anything else I can help you with?"
          );
        } else if (lowerMsg.includes("bye") || lowerMsg.includes("goodbye")) {
          resolve(
            "Thank you for chatting with us! Feel free to return if you have any more questions."
          );
        } else {
          resolve(
            "I appreciate your message. Could you provide more details so I can better assist you? You can ask about our services, features, pricing, or how to get started."
          );
        }
      }, 1000);
    });
  }

  // Send welcome message when chatbot is first opened
  setTimeout(() => {
    // The welcome message is already in the HTML
    // If you want to add a delay before showing it, you can replace the static message with this:
    // displayMessage("Hello! How can I help you today?", 'bot');
  }, 500);
}

// Slider functionality for homepage hero section if it exists
if (document.querySelector(".slider-container")) {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const totalSlides = slides.length;

  // Initialize slider
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show current slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// FAQ Accordion functionality if it exists
const faqQuestions = document.querySelectorAll(".faq-question");
if (faqQuestions.length > 0) {
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");

      // Close other open FAQs
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem && item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });
    });
  });
}
