import { Database } from "./supabase";

export type Student = Database["public"]["Tables"]["students"]["Row"];
export type Group = Database["public"]["Tables"]["groups"]["Row"];
export type GroupMember = Database["public"]["Tables"]["group_members"]["Row"];