import { Request, Response } from 'express';
import { firestore } from '../config/firebase';
import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const addProduct = async (req: Request, res: Response) => {
    try{
  const { product, sku, stock, price, status, variants, marketplaces } = req.body;
  const image = req.file?.filename;

  console.log({
    product,
    sku,
    stock,
    price,
    status,
    variants,
    marketplaces: JSON.parse(marketplaces),
    image,
  });

  const newProduct = {
    product,
    sku,
    stock,
    price,
    status,
    variants,
    marketplaces: JSON.parse(marketplaces),
    image,
    createdAt: new Date().toISOString(),
  };

  const docRef = await firestore.collection('products').add(newProduct);
  res.status(201).json({ message: 'Product saved to Firestore', id: docRef.id });
} catch(error){
    console.error('Error saving to Firestore:', error);
    res.status(500).json({ message: 'Error saving product', error });
}
};
