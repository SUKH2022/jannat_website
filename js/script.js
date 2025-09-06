// JavaScript
// Create background effects
        document.addEventListener('DOMContentLoaded', function() {
            createBackgroundEffects();
            initRoomSlider();
            initChatbot();
            initBranchGalleries();
            initMobileMenu(); // Initialize mobile menu
        });

        function createBackgroundEffects() {
            const container = document.getElementById('background-effects');
            
            // Create bubbles
            for (let i = 0; i < 20; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                // Random size between 20 and 100px
                const size = Math.random() * 80 + 20;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // Random position
                bubble.style.left = `${Math.random() * 100}%`;
                
                // Random animation duration between 10 and 30 seconds
                const duration = Math.random() * 20 + 10;
                bubble.style.animationDuration = `${duration}s`;
                
                // Random delay
                bubble.style.animationDelay = `-${Math.random() * 20}s`;
                
                container.appendChild(bubble);
            }
            
            // Create floating shapes
            for (let i = 0; i < 15; i++) {
                const element = document.createElement('div');
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                element.classList.add('floating-element', shape);
                
                if (shape !== 'triangle') {
                    const size = Math.random() * 30 + 10;
                    element.style.width = `${size}px`;
                    element.style.height = `${size}px`;
                }
                
                // Random position
                element.style.left = `${Math.random() * 100}%`;
                
                // Random animation duration between 15 and 40 seconds
                const duration = Math.random() * 25 + 15;
                element.style.animationDuration = `${duration}s`;
                
                // Random delay
                element.style.animationDelay = `-${Math.random() * 30}s`;
                
                container.appendChild(element);
            }
        }

        // Add parallax scroll effect
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxBg = document.querySelector('.parallax-bg');
            
            // Move background at different speed for parallax effect
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            
            // Move bubbles at different speeds for depth effect
            const bubbles = document.querySelectorAll('.bubble, .floating-element');
            bubbles.forEach(bubble => {
                const speed = parseFloat(bubble.style.animationDuration) / 50;
                bubble.style.transform = `translateY(${scrolled * speed}px) ${bubble.style.transform.includes('rotate') ? 'rotate(' + (scrolled * speed * 0.1) + 'deg)' : ''}`;
            });
        });

        // Mobile Menu Functionality
        function initMobileMenu() {
            const bar = document.getElementById('mobile-bar');
            const close = document.getElementById('close-mobile');
            const nav = document.getElementById('mobile-nav');
            const overlay = document.getElementById('mobile-overlay');
            
            if(bar) {
                bar.addEventListener('click', () => {
                    nav.classList.add('active');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
            
            if(close) {
                close.addEventListener('click', () => {
                    nav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
            
            if(overlay) {
                overlay.addEventListener('click', () => {
                    nav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
            
            // Close menu when clicking on links
            const navLinks = document.querySelectorAll('#mobile-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Update active class
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        }

        // Room Slider
        function initRoomSlider() {
            const slideContainer = document.getElementById('slide-container');
            const slides = document.querySelectorAll('.slide');
            const dotsContainer = document.getElementById('slider-dots');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            let currentIndex = 0;
            const slideCount = slides.length;

            // Create dots based on number of slides
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            }

            const dots = dotsContainer.querySelectorAll('.dot');

            // Function to update slider position
            function updateSlider() {
                slideContainer.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Next slide
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
            });

            // Previous slide
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlider();
            });

            // Auto slide
            setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
            }, 5000);
        }

        // Initialize Branch Galleries
        function initBranchGalleries() {
            // Initialize Sector 31 Gallery
            initGallery('sector31', 10);
            
            // Initialize Sushant Lok Gallery
            initGallery('sushantlok', 12);
        }

        function initGallery(branchName, slideCount) {
            const galleryContainer = document.getElementById(`${branchName}-gallery`);
            const prevBtn = document.getElementById(`${branchName}-prev`);
            const nextBtn = document.getElementById(`${branchName}-next`);
            const dotsContainer = document.getElementById(`${branchName}-dots`);
            let currentIndex = 0;

            // Create dots
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('gallery-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateGallery();
                });
                dotsContainer.appendChild(dot);
            }

            const dots = dotsContainer.querySelectorAll('.gallery-dot');

            // Function to update gallery position
            function updateGallery() {
                galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Next slide
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateGallery();
            });

            // Previous slide
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateGallery();
            });

            // Auto slide
            setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateGallery();
            }, 4000);
        }

        // Google Sheets Form Submission
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzNCc-ogB6yNRBYRllNN9Hsn0EHe_f2MCyBym96xGcHq52oLu7PUCMxveV4m5DQH7Fw/exec';
        const form = document.forms['contactForm'];
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(scriptURL, { 
                    method: 'POST', 
                    body: formData
                });
                
                if (!response.ok) throw new Error('Network response was not ok');
                
                const result = await response.json();
                console.log('Success:', result);
                
                // Show success message
                showNotification('Message sent successfully! We will contact you shortly.', 'success');
                form.reset();
                
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error sending message. Please try again later or call us directly.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });

        // Notification function
        function showNotification(message, type) {
            // Remove existing notifications
            const existingNotification = document.querySelector('.form-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = `form-notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 10000;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
            `;
            
            if (type === 'success') {
                notification.style.background = 'var(--secondary-color)';
                notification.style.color = 'var(--dark-color)';
            } else {
                notification.style.background = 'var(--primary-color)';
            }
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }

        // Add CSS animations for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Chatbot Functionality
        function initChatbot() {
            const chatbotContainer = document.getElementById('chatbot-container');
            const chatbotHeader = document.getElementById('chatbot-header');
            const chatMessages = document.getElementById('chat-messages');
            const userInput = document.getElementById('user-input');
            const sendBtn = document.getElementById('send-btn');
            const suggestionChips = document.querySelectorAll('.chip');
            
            chatbotHeader.addEventListener('click', () => {
                chatbotContainer.classList.toggle('expanded');
            });
            
            // JANNAT PG knowledge base
            const knowledgeBase = {
                'rates': `Our room rates start at ₹9,000/month. For detailed pricing information based on room type and sharing options, please call us at <strong>7042840709</strong> or <strong>8800737400</strong>.`,
                
                'facilities': `We offer premium facilities including:<br><br>
                • <strong>Accommodation:</strong> AC rooms with geyser, LCD TV, box beds, separate almirahs with lockers<br>
                • <strong>Amenities:</strong> Power backup, CCTV, fridge, induction for self-cooking, washing machine<br>
                • <strong>Services:</strong> High-speed WiFi, housekeeping, mini gym with treadmill and cycle, common seating area<br>
                • <strong>Food:</strong> Nutritious and delicious meals served in our dining area`,
                
                'booking': `To book a room:<br><br>
                1. <strong>Visit:</strong> Schedule a visit to our facility<br>
                2. <strong>Select:</strong> Choose your preferred room type<br>
                3. <strong>Documentation:</strong> Provide ID proof and other required documents<br>
                4. <strong>Payment:</strong> Pay the security deposit and first month's rent<br><br>
                You can call us at <strong>7042840709</strong> or <strong>8800737400</strong> to schedule a visit.`,
                
                'location': `We have two convenient locations:<br><br>
                <strong>Branch 1:</strong> Near Main Market, Sector 31, Gurugram (Near OM SWEET MOTHER DAIRY)<br>
                <strong>Branch 2:</strong> 451-A, Block C, Sushant Lok Phase I, Sector 43, Gurugram<br><br>
                Both locations are in prime areas with easy access to markets, transportation, and other amenities.`,
                
                'default': `I'm not sure I understand. You can ask me about:<br><br>
                • Room rates and availability<br>
                • Facilities and amenities<br>
                • Booking process<br>
                • Location and directions<br>
                • Or anything else about JANNAT PG!`
            };
            
            function addMessage(text, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
                
                if (isUser) {
                    messageDiv.textContent = text;
                } else {
                    messageDiv.innerHTML = text;
                }
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            function showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('typing-indicator');
                typingDiv.id = 'typing-indicator';
                typingDiv.innerHTML = `
                    <span>Assistant is typing</span>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                `;
                chatMessages.appendChild(typingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            function hideTypingIndicator() {
                const typingIndicator = document.getElementById('typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }
            
            function processMessage(message) {
                const lowerMessage = message.toLowerCase();
                let response = knowledgeBase.default;
                
                if (lowerMessage.includes('rate') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
                    response = knowledgeBase.rates;
                } else if (lowerMessage.includes('facilit') || lowerMessage.includes('amenit') || lowerMessage.includes('feature')) {
                    response = knowledgeBase.facilities;
                } else if (lowerMessage.includes('book') || lowerMessage.includes('reserv') || lowerMessage.includes('availab')) {
                    response = knowledgeBase.booking;
                } else if (lowerMessage.includes('locat') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
                    response = knowledgeBase.location;
                } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                    response = 'Hello! Welcome to JANNAT Girls PG. How can I assist you today?';
                } else if (lowerMessage.includes('thank')) {
                    response = "You're welcome! Is there anything else you'd like to know?";
                }
                
                // Simulate typing delay
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage(response);
                }, 1000 + Math.random() * 1000);
            }
            
            function sendMessage() {
                const message = userInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    userInput.value = '';
                    processMessage(message);
                }
            }
            
            // Event listeners
            sendBtn.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            // Suggestion chips functionality
            suggestionChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const question = chip.getAttribute('data-question');
                    addMessage(question, true);
                    processMessage(question);
                });
            });
            
            // Auto-expand chatbot when user starts typing
            userInput.addEventListener('focus', () => {
                chatbotContainer.classList.add('expanded');
            });
        }