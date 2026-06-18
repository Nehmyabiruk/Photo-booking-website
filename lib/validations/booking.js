import { z } from "zod";

export const BookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Event date must be in the future",
  }),
  location: z.string().min(3, "Please provide a location"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
