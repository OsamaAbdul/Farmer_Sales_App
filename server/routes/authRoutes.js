import express from 'express';
import { purchase, getTransactions } from '../controllers/transactionController.js';
import { makePost, getPost, makeComment } from '../controllers/postController.js';
import { register, login, getMe } from '../controllers/registerController.js';
import { addProducts, getProducts, getProductsList } from '../controllers/productController.js';
import { getCart, addToCart } from '../controllers/cartsController.js';
import purchaseProduct from '../controllers/purchaseControllers.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

// Post Routes
router.post('/posts', auth, makePost);
router.post('/posts/:id/comment', auth, makeComment);
router.get('/posts', auth, getPost);

// Transaction Routes
router.post('/purchase', auth, purchaseProduct);
router.get('/transactions', auth, getTransactions);

// Products Routes
router.post('/products', auth, addProducts);
router.get('/products',  getProducts);
router.get('/my-products', auth, getProductsList);

// Cart Routes
router.get('/get-cart', auth, getCart);
router.post('/add-to-cart', auth, addToCart);

export default router;