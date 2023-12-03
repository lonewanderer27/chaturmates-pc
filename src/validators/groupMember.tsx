import { GroupMember } from "@/types";
import Joi from "joi";

export const newGroupMember = Joi.object<GroupMember>({
  approved: Joi.boolean().optional().default(false),
  student_id: Joi.number().required(),
  group_id: Joi.number().required(),
  creator: Joi.boolean().optional().default(false),
  promoted_admin_by: Joi.number().optional().default(null),
  is_admin: Joi.boolean().optional().default(false),
  profile_id: Joi.number().required(),
  description: Joi.string().optional().default(null),
})

export const newGroupMemberAdmin = Joi.object<GroupMember>({
  approved: Joi.boolean().optional().default(true),
  student_id: Joi.number().required(),
  group_id: Joi.number().required(),
  creator: Joi.boolean().optional().default(true),
  promoted_admin_by: Joi.number().optional().default(null),
  is_admin: Joi.boolean().optional().default(true),
  profile_id: Joi.number().required(),
  description: Joi.string().optional().default(null),
})