const Cart = require('../models/cart');
const Product = require('../models/product');

// Get user cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
