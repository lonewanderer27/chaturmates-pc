import { Group } from "@/types";
import Joi from "joi";

export const newGroup = Joi.object<Group>({
  name: Joi.string().required(),
  academic_year_id: Joi.number().required(),
  school: Joi.number().required(),
  avatar_url: Joi.string().required(),
  cover_url: Joi.string().optional(),
  vanity_url: Joi.string().required(),
  semester: Joi.number().required(),
  course: Joi.number().required(),
  description: Joi.string().required(),
}).default({
  cover_url: null,
  academic_year_id: 1,
  course: 2,
  semester: 1,
});