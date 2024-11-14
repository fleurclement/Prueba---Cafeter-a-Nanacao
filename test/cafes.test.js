import request from "supertest";
import { app } from "../index.js";

describe("GET /cafes", () => {
  it("debe devolver un código 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(app).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe("DELETE /cafes/:id", () => {
    it("debe devolver un código 404 si el ID no existe", async () => {
      const response = await request(app).delete("/cafes/9999"); // un ID inexistente
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Café no encontrado");
    });
  });
 
  describe("POST /cafes", () => {
    it("debe agregar un nuevo café y devolver un código 201", async () => {
      const nuevoCafe = { nombre: "Café Mocha" };
      const response = await request(app).post("/cafes").send(nuevoCafe);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.nombre).toBe(nuevoCafe.nombre);
    });
  });

  describe("PUT /cafes/:id", () => {
    it("debe devolver un código 400 si los IDs no coinciden", async () => {
      const cafeActualizado = { id: 2, nombre: "Café Latte" };
      const response = await request(app).put("/cafes/1").send(cafeActualizado); // ID en URL no coincide con el del payload
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("IDs no coinciden");
    });
  });
  