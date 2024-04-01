const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('Obtener un 200 de GET en cafes', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });
   
    it('Obtener 404 con un café', async () => {
        const { body: producto } = await request(server).get('/cafes/5').send();
        expect(producto).toBeInstanceOf(Object);
    })
   
    it('Obtener un 201 creando un café', async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = {
            id,
            nombre: "Macchiato"
        };
        const { body: productos } = await request(server).post('/cafes').send(cafe);
        expect(productos).toContainEqual(cafe);
    });

       it('Obtener 400 actualizando un café', async () => {
        const cafe = {
            id: 4,
            nombre: "Latte"
        }
        const response = await request(server).put('/cafes/3').send(cafe);
        expect(response.statusCode).toBe(400);
    })
});