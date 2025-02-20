export class TourismPackage {
  _id: string;
  name: string;
  description: string;
  photo: string;
  categories: string[];
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    photo: string,
    categories: string[],
    createdAt: Date,
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.categories = categories;
    this.createdAt = createdAt;
  }
}
