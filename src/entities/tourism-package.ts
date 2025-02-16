export class TourismPackage {
  _id: string;
  name: string;
  description: string;
  photo: string;
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    photo: string,
    createdAt: Date,
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.createdAt = createdAt;
  }
}
