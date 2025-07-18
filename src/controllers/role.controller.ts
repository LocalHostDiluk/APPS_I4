import { Request, Response } from "express";
import { Role } from "../models/Role";

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type } = req.body;

  if (!type) {
    res.status(400).json({ message: "El tipo de rol es requerido" });
    return;
  }

  try {
    const newRole = new Role({
      type,
      createDate: new Date(),
      deleteDate: null,
      status: true,
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    console.error("Error al crear el rol:", error);
    res.status(500).json({ message: "Error al crear el rol" });
  }
};

export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).json({ message: "Error al obtener los roles" });
  }
};
