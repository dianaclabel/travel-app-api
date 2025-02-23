import { HTTPException } from "hono/http-exception";
import { db } from "../db.js";
import type { CreateTourismPackageDto } from "../dto/tourism-package-dto.js";
import { TourismPackage } from "../entities/tourism-package.js";
import { Hono } from "hono";
import type { AppVariables } from "../types.js";

export const tourismPackages = new Hono<AppVariables>();

const packagesCollection = db.collection<TourismPackage>("packages");

//Listar paquetes
tourismPackages.get("/", async (c) => {
  const packages = await packagesCollection.find().toArray();
  return c.json(packages);
});

//paquete por id
tourismPackages.get("/:id", async (c) => {
  const id = c.req.param("id");

  const packageFound = await packagesCollection.findOne({ _id: id });

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
    body.categories,
    new Date(),
  );

  await packagesCollection.insertOne(newPackage);

  return c.json(newPackage);
});

//Modificar paquete
tourismPackages.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body: CreateTourismPackageDto = await c.req.json();

  const packageUpdated = await packagesCollection.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { returnDocument: "after" },
  );

  if (packageUpdated === null) {
    throw new HTTPException(404, { message: "Package was not found" });
  }

  return c.json(packageUpdated);
});

//Eliminar paquete
tourismPackages.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const { deletedCount } = await packagesCollection.deleteOne({ _id: id });

  if (deletedCount === 0) {
    throw new HTTPException(404, { message: "Package was not found" });
  }

  return c.json({ message: "Package was deleted" });
});
