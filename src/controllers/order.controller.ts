import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Products";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, status, products } = req.body;

    if (
      !userId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    // Validar que cada producto exista
    const validatedProducts = [];
    let subtotal = 0;

    for (const item of products) {
      const { productId, quantity, price } = item;

      if (!productId || !quantity || price == null) {
        return res
          .status(400)
          .json({ message: "Producto con datos faltantes" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Producto no encontrado: ${productId}` });
      }

      subtotal += quantity * price;
      validatedProducts.push({ productId, quantity, price });
    }
    
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const newOrder = new Order({
      user: userId,
      status: status || "Pendiente",
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      products: validatedProducts,
      createDate: new Date(),
      deleteDate: null,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { idOrder } = req.params;
    const { status } = req.body;

    const order = await Order.findById(idOrder);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (status != "Pagado") {
      return res.status(404).json({ message: "Status incorrecto" });
    }

    if (status) order.status = status;
    await order.save();
    res.json({ message: "Orden actualizado correctamente", order });
  } catch (error) {
    console.log("Error actualizar orden", error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { idOrder } = req.params;
    const { status } = req.body;

    const order = await Order.findById(idOrder);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (status != "Cancelado") {
      return res.status(404).json({ message: "Status incorrecto" });
    }

    if (status) order.status = status;
    await order.save();
    res.json({ message: "Orden actualizado correctamente", order });
  } catch (error) {
    console.log("Error actualizar orden", error);
  }
};

