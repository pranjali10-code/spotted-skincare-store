// SPOTTED. Product Information

const product = {
    name: "The Star Patch Kit",
    description: "Your little skincare sidekick. Star-shaped hydrocolloid patches for your breakout days.",
    price: 299,
    originalPrice: 399,
    quantity: 36,
    emoji: "⭐"
};

// Display Product

const productDetails = document.getElementById("productDetails");

productDetails.innerHTML = `
    <div class="product-card">

        <div class="product-gallery">

            <div class="main-product-image">
                <img
                    id="mainProductImage"
                    src="images/product-packaging.png"
                    alt="SPOTTED Star Patch Kit"
                >
                <span class="gallery-badge">BESTSELLER ✳</span>
            </div>

            <div class="thumbnail-gallery">

                <img
                    src="images/product-packaging.png"
                    class="thumbnail active"
                    alt="Product packaging"
                    onclick="changeProductImage(this)"
                >

                <img
                    src="images/patch-closeup.png"
                    class="thumbnail"
                    alt="Patch closeup"
                    onclick="changeProductImage(this)"
                >

                <img
                    src="images/patch-sheet.png"
                    class="thumbnail"
                    alt="Patch sheet"
                    onclick="changeProductImage(this)"
                >

                <img
                    src="images/lifestyle.png"
                    class="thumbnail"
                    alt="Lifestyle photograph"
                    onclick="changeProductImage(this)"
                >

            </div>

        </div>

        <div class="product-info">

            <p class="product-category">
                THE SPOTTED. COLLECTION
            </p>

            <h3>${product.name}</h3>

            <p class="product-description">
                ${product.description}
            </p>

            <p class="patch-count">
                ${product.quantity} PATCHES PER PACK
            </p>

            <div class="price">
                <span>₹${product.price}</span>
                <del>₹${product.originalPrice}</del>
                <small>25% OFF</small>
            </div>

            <button class="add-button" id="addToBag">
                ADD TO BAG +
            </button>

            <p class="product-note">
                ✳ Little patches. Big main-character energy.
            </p>

        </div>

    </div>
`;
function changeProductImage(thumbnail) {

    const mainImage = document.getElementById("mainProductImage");

    mainImage.style.opacity = "0";

    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = "1";
    }, 150);

    document.querySelectorAll(".thumbnail").forEach(image => {
        image.classList.remove("active");
    });

    thumbnail.classList.add("active");
}
// Shopping Cart

let cartCount = 0;

const cartButton = document.getElementById("cartButton");
const cartCountDisplay = document.getElementById("cartCount");

const cartContent = document.getElementById("cartContent");
const cartTotal = document.getElementById("cartTotal");
const cartFooter = document.getElementById("cartFooter");

function updateCart() {
    cartCountDisplay.textContent = cartCount;

    if (cartCount === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <span>🛍️</span>
                <h3>YOUR BAG IS EMPTY!</h3>
                <p>Something's missing. Maybe it's us?</p>
                <button id="continueShopping">KEEP SHOPPING</button>
            </div>
        `;

        cartTotal.textContent = "₹0";
        document.getElementById("continueShopping")
            .addEventListener("click", hideCart);

        return;
    }

    cartContent.innerHTML = `
        <div class="cart-item">
            <img src="images/product-packaging.png" alt="Star Patch Kit">

            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>

                <div class="quantity-controls">
                    <button id="decreaseQuantity">−</button>
                    <span>${cartCount}</span>
                    <button id="increaseQuantity">+</button>
                </div>

                <button id="removeItem" class="remove-item">
                    REMOVE
                </button>
            </div>
        </div>
    `;

    cartTotal.textContent = "₹" + (product.price * cartCount);

    document.getElementById("increaseQuantity")
        .addEventListener("click", () => {
            cartCount++;
            updateCart();
        });

    document.getElementById("decreaseQuantity")
        .addEventListener("click", () => {
            if (cartCount > 1) {
                cartCount--;
            } else {
                cartCount = 0;
            }
            updateCart();
        });

    document.getElementById("removeItem")
        .addEventListener("click", () => {
            cartCount = 0;
            updateCart();
        });
}

document.getElementById("addToBag").addEventListener("click", function () {
    cartCount++;
    updateCart();

    this.textContent = "ADDED TO BAG ✓";

    setTimeout(() => {
        this.textContent = "ADD TO BAG +";
    }, 1200);
});

// Shopping Cart Drawer

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const continueShopping = document.getElementById("continueShopping");

function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("cart-open");
}

function hideCart() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("cart-open");
}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", hideCart);

cartOverlay.addEventListener("click", hideCart);

continueShopping.addEventListener("click", hideCart);
// CHECKOUT FUNCTIONALITY

const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutButton = document.getElementById("checkoutButton");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");
const orderSuccess = document.getElementById("orderSuccess");
const finishOrder = document.getElementById("finishOrder");

function openCheckout() {
    if (cartCount === 0) {
        alert("Your bag is empty! Add something first 💗");
        return;
    }

    checkoutTotal.textContent = "₹" + (product.price * cartCount);
    checkoutOverlay.classList.add("active");
}

function hideCheckout() {
    checkoutOverlay.classList.remove("active");
}

checkoutButton.addEventListener("click", openCheckout);

closeCheckout.addEventListener("click", hideCheckout);

checkoutOverlay.addEventListener("click", function (event) {
    if (event.target === checkoutOverlay) {
        hideCheckout();
    }
});

checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const orderNumber = "SPT" + Math.floor(10000 + Math.random() * 90000);

    checkoutForm.style.display = "none";
    document.querySelector(".checkout-subtitle").style.display = "none";

    orderSuccess.innerHTML = `
        <span>⭐</span>
        <h2>YOU'RE SPOTTED, ${customerName.split(" ")[0].toUpperCase()}!</h2>
        <p>Your demo order has been placed successfully.</p>
        <p class="order-number">ORDER ID: ${orderNumber}</p>
        <p>Thank you for shopping with SPOTTED. 💗</p>
        <button id="finishOrder">BACK TO SHOPPING</button>
    `;

    orderSuccess.style.display = "block";

    document.getElementById("finishOrder").addEventListener("click", function () {
        hideCheckout();

        checkoutForm.reset();
        checkoutForm.style.display = "block";

        document.querySelector(".checkout-subtitle").style.display = "block";
        orderSuccess.style.display = "none";

        hideCart();
    });

    cartCount = 0;
    updateCart();
});

finishOrder.addEventListener("click", function () {
    hideCheckout();

    checkoutForm.reset();
    checkoutForm.style.display = "block";

    document.querySelector(".checkout-subtitle").style.display = "block";
    orderSuccess.style.display = "none";

    hideCart();
});
// NEWSLETTER DEMO

document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    document.getElementById("newsletterMessage").textContent =
        "YOU'RE ON THE LIST! 💗 (DEMO SIGNUP)";

    this.reset();
});
// BACK TO TOP BUTTON

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        console.error("Back to top button not found!");
        return;
    }

    function toggleBackToTop() {
        if (window.scrollY > 200) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", toggleBackToTop);

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleBackToTop();
});