import bcrypt from "brcyptjs";

const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hasSync("123456", 10),
        isAdmin: true
    },
    {
        name: "user",
        email: "user@example.com",
        password: bcrypt.hasSync("123456", 10),
    }
];

export default users;
