import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";
import cache from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import { compare, hash } from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!email || !password) {
    return res.status(401).json({
      message: "Username y password son obligatorios",
    });
  }

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const passwordValida = await compare(password, user.password);

  if (!passwordValida) {
    return res.status(401).json({
      message: "Credenciales incorrectas",
    });
  }

  const accessToken = generateToken(user.id);

  //(identificador unico, infor a guardar(token), tiempo de vida) Agregar token con tiempo de vida de 15 minutos
  cache.set(user.id, accessToken, 60 * 30);
  res.json({ accessToken });
};

export const getTimeToken = (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res
      .status(400)
      .json({ message: "Falta o formato incorrecto del userId" });
  }

  const ttl = cache.getTtl(userId); // Obtener el tiempo de vida con la llave

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const now = Date.now();
  const timeToLife = Math.floor((ttl - now) / 1000); // Calcular el tiempo de vida restante en segundos

  const expTime = dayjs(ttl).format("HH:mm:ss");

  return res.json({
    timeToLife,
    expTime,
  });
};

export const updateToken = (req: Request, res: Response) => {
  const { userId } = req.params;

  const ttl = cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const newTtl: number = 60 * 15;
  cache.ttl(userId, newTtl);

  return res.json({ message: "Token actualizado" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.query as { userEmail?: string };

    let userList;
    if (userEmail) {
      
      userList = await User.find({ email: userEmail });
    } else {
      
      userList = await User.find();
    }

    console.log("Usuarios encontrados:", userList);
    return res.json({ userList });
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    return res
      .status(500)
      .json({ message: "Ocurrió un error al consultar la base de datos" });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const veces = 10;
    const hashedPassword = await hash(password, veces);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      createDate: Date.now(),
      deleteDate: null,
      status: true,
    });

    const user = await newUser.save();

    res.json({ user });
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    return res.status(426).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, password, role, phone } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    if (name) user.name = name;
    if (password) {
      const veces = 10;
      user.password = await hash(password, veces);
    }
    if (role) user.role = role;
    if (phone) user.phone = phone;

    await user.save();

    res.json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.deleteDate = new Date();
    user.status = false;
    await user.save();
    res.json({ message: "Usuario eliminado correctamente", user });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
