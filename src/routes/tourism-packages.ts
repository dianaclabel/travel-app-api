import { HTTPException } from "hono/http-exception";
import { client } from "../db.js";
import type { CreateTourismPackageDto } from "../dto/tourism-package-dto.js";
import { TourismPackage } from "../entities/tourism-package.js";
import { Hono } from "hono";

export const tourismPackages = new Hono();

const packagesCollection = client
  .db("travel-app")
  .collection<TourismPackage>("packages");

//Listar paquetes
tourismPackages.get("/", async (c) => {
  const packages = await packagesCollection.find().toArray();
  return c.json(packages);
});

//paquete por id
tourismPackages.get("/:id", async (c) => {
  const id = c.req.param("id");

  const packageFound = await packagesCollection.findOne({ id });

  if (!packageFound) {
    throw new HTTPException(404, { message: "Package  was not found" });
  }

  return c.json(packageFound);
});

//Crear paquete
tourismPackages.post("/", async (c) => {
  const body: CreateTourismPackageDto = await c.req.json();
  const newPackage = new TourismPackage(
    crypto.randomUUID(),
    body.name,
    body.description,
    body.photo,
    new Date(),
  );

  await packagesCollection.insertOne(newPackage);

  return c.json(newPackage);
});

// //Modificar paquete
// tourismPackages.put("/:id", async (c) => {
//   const id = c.req.param("id");
//   const body: CreateTourismPackageDto = await c.req.json();

//   const packageFound = db.packages.find((p) => p.id === id);

//   if (!packageFound) {
//     throw new HTTPException(404, { message: "Package was not found" });
//   }

//   Object.assign(packageFound, body);

//   return c.json(packageFound, 201);
// });

//Eliminar paquete
tourismPackages.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const { deletedCount } = await packagesCollection.deleteOne({ _id: id });

  if (deletedCount === 0) {
    throw new HTTPException(404, { message: "Package was not found" });
  }

  return c.json({ message: "Package was deleted" });
});
