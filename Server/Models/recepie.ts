import { Collection, Schema,  model } from 'mongoose';

interface IRecipe {
  recepieID: string;
  title: string;
  origin: string;
  ingredients: string[];
  instructions: string;
  preparationTime: string;
  servingSize: string;
  difficulty: string;
  calorieCount: number;
  microNutrients: string;
  sourceURL: string;
  imageURL: string;
}


const recepieSchema = new Schema<IRecipe>({
  recepieID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  preparationTime: {
    type: String,
    required: true
  },
  servingSize: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  calorieCount: {
    type: Number,
    required: true
  },
  microNutrients: {
    type: String,
    required: true
  },
  sourceURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  });

let Recepie = model<IRecipe>('Recepie', recepieSchema);

export default Recepie;