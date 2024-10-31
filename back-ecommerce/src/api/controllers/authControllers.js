import ROLE from "../../constants/role.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { Admin } from "../../prisma/prisma.js";
import { isValidEmail, hashPassword } from "../../utils/auth.js"
import { addToHistory } from "./historyController.js";
import { capitalize } from "../../utils/string.js";


// Register a new user
const registerUser = async (role, Model, req, res) => {
  // get data
  const { name, email, password } = req.body;

  // if email not valid
  if (!isValidEmail(email)) {
    return res.status(401).send("L'adresse email est invalide");
  }

  // check if uniq email
  const user = await Model.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    return res.status(401).send("Cette adresse email est deja utilisée");
  }

  // create user
  try {
    // add to DB
    const hashedPassword = await hashPassword(password)
    const user = await Model.create({
      data: {
        name,
        email,
        password: hashedPassword,  
      }
    });

    // add to history
    await addToHistory(user.id, `${capitalize(role)} ajouté avec succes`)

    // Sign the JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // return token
    return res.status(201).json({
      message: `${capitalize(role)} ajouté avec succes`,
      token: token,
    });

  }
  catch (error) {
    return res.status(400).send(`Veuillez vérifiez vos informations`);
  }
};


// Login user
const loginUser = async (role, Model, req, res) => {
  // get data
  const { email, password } = req.body;

  // if email not valid
  if (!isValidEmail(email)) {
    return res.status(401).send("L'adresse email est invalide");
  }

  try {
    // Check if user exists
    const user = await Model.findUnique({
      where: {
        email: email,
      },
    })
    if (!user) {
      return res.status(400).send("Cet utilisateur n'existe pas");
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // Check if password is correct
    if (hashedPassword != user.password) {
      return res.status(400).send("Mot de passe incorrect");
    }

    // Sign the JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // return the and token
    return res.status(200).json({
      message: `${capitalize(role)} connecté avec succes`,
      token: token,
    });

  }
  catch (error) {
    return res.status(400).send("Veuillez vérifiez vos informations");
  }
};


const registerAdmin = (req, res) => registerUser(ROLE.ADMIN, Admin, req, res)
const loginAdmin = (req, res) => loginUser(ROLE.ADMIN, Admin, req, res)


export { registerAdmin, loginAdmin };