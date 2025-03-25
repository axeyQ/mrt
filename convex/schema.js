import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bikes: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    pricePerHour: v.number(),
    pricePerDay: v.number(),
    available: v.boolean(),
    bikeType: v.string(), // mountain, road, city, etc.
    location: v.string(),
    features: v.array(v.string()),
  }),
  
  bookings: defineTable({
    bikeId: v.id("bikes"),
    userId: v.string(),
    startTime: v.number(), // Unix timestamp
    endTime: v.number(), // Unix timestamp
    status: v.string(), // pending, confirmed, cancelled, completed
    totalPrice: v.number(),
    paymentStatus: v.string(), // pending, paid, refunded
    paymentId: v.optional(v.string()),
  }),
  
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    isAdmin: v.boolean(),
  }),
});