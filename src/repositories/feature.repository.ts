import { db } from "../db";
import { features } from "../db/schema";
import { asc } from "drizzle-orm";

export class FeatureRepository {
  async getAllFeatures() {
    const result = await db.select().from(features).orderBy(asc(features.id));
    return result;
  }
}
