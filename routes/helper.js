import express, { response } from "express"

import bcrypt from "bcrypt"

export  async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    return (hashedPassword)
}