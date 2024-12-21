import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { User } from "../../db/entity/User";

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "User created successfully", users });
  } catch (error) {
    console.log("[!] ", error);
    return res.status(500).json({ message: "Server error in user creation" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.age = parseInt(age);
    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error in user creation" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const { firstName, lastName, age } = req.body;

    const existingUser = await User.findOneBy({ id: parseInt(id) });
    if (firstName) existingUser.firstName = firstName;
    if (lastName) existingUser.lastName = lastName;
    if (age) existingUser.age = parseInt(age);
    await existingUser.save();

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error in user creation" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Required fields are missing" });
      }
      const { firstName, lastName, age } = req.body;
  
      const existingUser = await User.findOneBy({ id: parseInt(id) });
      if(!existingUser){
        return res.status(404).json({message:'Requested user not found'})
      }
      await existingUser.remove()
      return res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error in user creation" });
    }
  });

export default router;
