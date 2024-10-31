import bcrypt from "bcrypt"


// check if valid email
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
}


// hash the password
const hashPassword = async (value) => {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hash = await bcrypt.hash(value, salt);

    // return hashed password
    return hash;
}


export { isValidEmail, hashPassword }