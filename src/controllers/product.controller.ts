import e, { Request, Response } from "express";
import { Product } from "../models/Products";

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
      ...req.body,
      createDate: new Date(),
      deleteDate: null,
      status: true,
    });

    const product = await newProduct.save();
    res.status(201).json({ product });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    res.status(500).json({ error: "Error al guardar el producto" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query as { productId?: string };

    let products;
    if (productId) {
      products = await Product.find({ _id: productId });
    } else {
      products = await Product.find();
    }
    console.log("Productos encontrados:", products);
    return res.json({ products });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, price, description, cant } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizar los campos del producto
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (cant) product.cant = cant;
    const updatedProduct = await product.save();
    return res.json({ updatedProduct });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    product.deleteDate = new Date();
    product.status = false;
    await product.save();

    res.json({ message: "Producto eliminado correctamente", product });

    return res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
