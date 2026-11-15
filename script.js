const menuData = [
    { id: 7, name: "Es Kopi Susu Senja", category: "kopi", price: 22000, desc: "Espresso, fresh milk, dan gula aren organik.", img: "https://images.unsplash.com/photo-1558884903-bbe59d6285ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"},
    { id: 2, name: "Classic Cappuccino", category: "kopi", price: 24000, desc: "Perpaduan espresso pekat dan foam susu lembut.", img: "https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=2116&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 3, name: "Creamy Matcha Latte", category: "non-kopi", price: 25000, desc: "Pure matcha asli Uji Jepang dengan susu segar.", img: "https://images.unsplash.com/photo-1775846933630-3c1531299e5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 4, name: "Flaky Butter Croissant", category: "camilan", price: 18000, desc: "Croissant renyah panggang hangat dengan mentega Prancis.", img: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 5, name: "Iced Americano", category: "kopi", price: 18000, desc: "Double shot espresso Arabika Gayo dingin menyegarkan.", img: "https://images.unsplash.com/photo-1582572430474-3acf30221916?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { id: 6, name: "Artisan Peach Tea", category: "non-kopi", price: 20000, desc: "Teh hitam pilihan dengan potongan buah persik manis.", img: "https://images.unsplash.com/photo-1597318181302-0466233a784e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
    { 
        id: 1, 
        name: "Es Kopi Susu Senja", 
        category: "kopi", 
        price: 28000, 
        desc: "Espresso dengan sirup karamel dan susu hangat.", 
        img: "https://images.unsplash.com/photo-1681366074674-13850edc6d6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
    }
];

let cart = [];
let selectedPayment = "QRIS";

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function renderMenu(filter = 'all') {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    const filtered = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="menu-card">
                <div>
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                </div>
                <div class="card-footer">
                    <span class="price">${formatRupiah(item.price)}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})">+ Keranjang</button>
                </div>
            </div>
        `;
    });
}

function filterMenu(category, btn) {
    document.querySelectorAll('.categories button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(category);
}

function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function changeQty(id, delta) {
    const index = cart.findIndex(c => c.id === id);
    if (index !== -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsEl = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');

    let totalQty = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-msg">Keranjang masih kosong. Yuk pilih kopimu!</p>';
    } else {
        cartItemsEl.innerHTML = '';
        cart.forEach(item => {
            totalQty += item.qty;
            totalPrice += item.price * item.qty;

            cartItemsEl.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span>${formatRupiah(item.price * item.qty)}</span>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    countEl.innerText = totalQty;
    totalEl.innerText = formatRupiah(totalPrice);
}

function selectPayment(el) {
    document.querySelectorAll('.pay-badge').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    selectedPayment = el.innerText;
}

function checkout() {
    if (cart.length === 0) {
        alert("Silakan pilih minimal 1 menu terlebih dahulu!");
        return;
    }
    const total = document.getElementById('cart-total').innerText;
    alert(`Terima kasih! Pesanan Anda sebesar ${total} sedang diproses melalui pembayaran ${selectedPayment}.`);
    cart = [];
    updateCartUI();
}

renderMenu();
