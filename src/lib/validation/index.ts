import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'Too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters.'})
  })
export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters.'})
  })
export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(5).max(100),
    tags: z.string(),
  })
export const UpdateProfileValidation = z.object({
  $id: z.string(),
  accountId: z.string(),
  name: z.string().min(2, {message: 'Too short'}),
  username: z.string().min(2, {message: 'Too short'}),
  email: z.string().email(),
  bio: z.string().max(500, {'message': 'Too long'}),
  imageUrl: z.string(),
  imageId: z.string(),
  file: z.custom<File[]>()
 })