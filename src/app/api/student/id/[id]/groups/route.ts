import { client } from "@/client";
import { newGroup } from "@/validators/group";
import Joi from "joi";

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  // fetch the student id from the url
  console.log(params);
  const { id } = params;

  // if the student id is not present, return an error
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing student id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the student exists
  const student = await client
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  // if the student is not found, return an error
  if (!student) {
    return new Response(
      JSON.stringify({ error: "Student not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // this student id is going to be our first group member and the admin\
  // validate the following info
  const { error, value } = newGroup.validate(await request.json());

  // if there is an error, return an error
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // if there is no error, create a new group
  const group = await client.from("groups").insert([
    value
  ]).select("*").single();

  // if the group is not created, return an error
  if (!group) {
    return new Response(
      JSON.stringify({ error: "Group not created", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  // add the student as the first group member and the admin
  const groupMember = await client
    .from("group_members")
    .insert([
      {
        group_id: group.data!.id,
        student_id: id,
        profile_id: student.data!.profile_id,
        approved: true,
        admin: true,
      }
    ])
    .select("*").single();

  // if the group member is not added, return an error
  if (!groupMember) {
    return new Response(
      JSON.stringify({ error: "Group member not added", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  // return a success message
  return new Response(
    JSON.stringify({
      message: "Group created successfully",
      success: true,
      data: group.data,
    }),
    {
      status: 201,
      statusText: "Created",
    }
  )
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // fetch the student id from the url
  console.log(params);
  const { id } = params;

  // if the student id is not present, return an error
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing student id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the student exists
  const student = await client
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  // if the student is not found, return an error
  if (!student) {
    return new Response(
      JSON.stringify({ error: "Student not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // fetch the group ids of the student from the database
  const groupIds = await client
    .from("group_members")
    .select("*")
    .eq("student_id", id);

  // fetch the groups of the student from the database
  const groups = await client
    .from("groups")
    .select("*")
    .in(
      "id",
      groupIds.data!.map((groupId) => groupId.group_id)
    );

  // return the student and the groups
  return new Response(
    JSON.stringify({
      data: {
        student: student.data,
        groups: groups.data,
      },
      success: true,
      message: "Student and groups fetched successfully",
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
