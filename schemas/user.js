import z from "zod";

const userSchema = z.object({
    username : z.string({message : "Username debe ser un texto"}).min(3, {message : "Username debe de contener 3 caracteres como minimo"}),
    password : z.string({message : "Password debe ser un texto"}).min(6, {message : "Password debe de contener 6 caracteres como minimo"})
});

export function validateUser(user){
    return userSchema.safeParse(user);
}