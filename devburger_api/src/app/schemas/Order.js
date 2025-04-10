import mongoose from "mongoose";
import { string } from "yup";

const OrderSchema = new mongoose.Schema({
  user: {
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  products: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  },
)

export default mongoose.model('Order', OrderSchema)