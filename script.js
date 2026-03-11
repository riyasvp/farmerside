// Products Data
const products = [
    {
        id: 1,
        name: "Premium Garden Hoe",
        category: "tools",
        price: 29.99,
        icon: "fa-hand-holding",
        description: "Durable steel hoe for efficient soil cultivation"
    },
    {
        id: 2,
        name: "Organic Tomato Seeds",
        category: "seeds",
        price: 8.99,
        icon: "fa-seedling",
        description: "High-yield hybrid tomato seeds, 50 seeds pack"
    },
    {
        id: 3,
        name: "Garden Irrigation System",
        category: "equipment",
        price: 149.99,
        icon: "fa-faucet",
        description: "Automatic drip irrigation for efficient watering"
    },
    {
        id: 4,
        name: "Organic Fertilizer 10kg",
        category: "fertilizers",
        price: 34.99,
        icon: "fa-flask",
        description: "Nutrient-rich organic fertilizer for all crops"
    },
    {
        id: 5,
        name: "Heavy Duty Shovel",
        category: "tools",
        price: 24.99,
        icon: "fa shovel",
        description: "Rust-resistant shovel with wooden handle"
    },
    {
        id: 6,
        name: "Corn Seeds - Golden",
        category: "seeds",
        price: 12.99,
        icon: "fa-seedling",
        description: "Premium quality corn seeds, 100 seeds pack"
    },
    {
        id: 7,
        name: "Wheelbarrow",
        category: "equipment",
        price: 89.99,
        icon: "fa-truck",
        description: "Large capacity wheelbarrow for easy transport"
    },
    {
        id: 8,
        name: "NPK Fertilizer 5kg",
        category: "fertilizers",
        price: 19.99,
        icon: "fa-flask",
        description: "Balanced NPK fertilizer for healthy growth"
    },
    {
        id: 9,
        name: "Garden Rake",
        category: "tools",
        price: 18.99,
        icon: "fa-grip-lines",
        description: "Steel rake for leveling and gathering"
    },
    {
        id: 10,
        name: "Basil Herb Seeds",
        category: "seeds",
        price: 6.99,
        icon: "fa-leaf",
        description: "Aromatic basil seeds for kitchen gardens"
    },
    {
        id: 11,
        name: "Greenhouse Kit",
        category: "equipment",
        price: 299.99,
        icon: "fa-house-user",
        description: "6x8 ft portable greenhouse with cover"
    },
    {
        id: 12,
        name: "Vermicompost 5kg",
        category: "fertilizers",
        price: 22.99,
        icon: "fa-earth-asia",
        description: "Pure vermicompost for organic farming"
    }
];

// Cart
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilters();
});

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            const category = btn.dataset.category;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
    
    // Update cart items
    const cartItemsEl = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div style="width: 60px; height: 60px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-box" style="color: var(--primary-color);"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; cursor: pointer; color: #e74c3c;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Toggle Cart
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nYour farming supplies will be delivered soon!`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Contact Form Submit
function submitForm(event) {
    event.preventDefault();
    showNotification('Message sent successfully! We\'ll get back to you soon.');
    event.target.reset();
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
