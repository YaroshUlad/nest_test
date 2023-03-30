import { Injectable } from '@nestjs/common';
import { DeedModel } from 'src/deeds/deed.model';
import { notFound } from 'src/exceptions/notFound';
import { InjectModel } from '@nestjs/mongoose';
import { Deed, DeedDocument } from 'src/schemas/deed.schema';
import { Model } from 'mongoose';
import { badRequest } from 'src/exceptions/badRequest';

@Injectable()
export class DeedsService {
  constructor(@InjectModel(Deed.name) private deedModel: Model<DeedDocument>) {}

  async createDeed(ownerId: string, title: string): Promise<DeedModel> {
    try {
      const res = await this.deedModel.create({ ownerId, title });

      return { ownerId: res.ownerId, title, id: res.id };
    } catch (e) {
      console.log(e);
    }
  }

  async updateDeed(id: string, title: string): Promise<DeedModel> {
    try {
      if (!title || !title.trim()) {
        badRequest('Not valid new title');
      }
      const res = await this.deedModel.findByIdAndUpdate(
        {
          _id: id,
        },
        { title },
      );

      return { ownerId: res.ownerId, title, id: res.id };
    } catch (e) {
      console.log(e);
    }
  }

  async deleteDeed(id: string): Promise<[]> {
    try {
      await this.deedModel.findByIdAndDelete(id);

      return [];
    } catch (e) {
      notFound('Deed with current id not found');
    }
  }

  async getAllDeeds(ownerId: string): Promise<DeedModel[]> {
    try {
      const res = await this.deedModel.find({ ownerId });

      if (res.length === 0) return [];

      return res.map((deed) => ({
        ownerId: deed.ownerId,
        title: deed.title,
        id: deed.id,
      }));
    } catch (e) {
      console.log(e);
    }
  }
}
