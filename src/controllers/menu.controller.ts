import e, { Request, Response } from "express";
import { Menu } from "../models/Menu";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { title, path, icon, roles } = req.body;

    if (!title || !path || !icon || !roles || !Array.isArray(roles)) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const newMenu = new Menu({
      title,
      path,
      icon,
      roles,
    });

    await newMenu.save();

    res.status(201).json({
      message: "Menu creado exitosamente",
      menu: newMenu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMenusByRoles = async (req: Request, res: Response) => {
  try {
    const { roles } = req.body;

    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Los roles son requeridos" });
    }

    const menus = await Menu.find({
      roles: { $in: roles },
    }).select("-_id -__v");

    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
