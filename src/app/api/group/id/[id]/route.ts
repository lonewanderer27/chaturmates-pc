import { client } from "@/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // fetch the group id from the url
  console.log(params);
  const { id } = params;

  // if the group id is not present, return an error
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing group id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // fetch the group from the database
  const group = await client.from("groups").select("*").eq("id", id).single();

  // if the group is not found, return an error
  if (!group) {
    return new Response(
      JSON.stringify({ error: "Group not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // fetch the group members from the database
  const groupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", id);

  // fetch the approved group members from the database
  const approvedGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", id)
    .eq("approved", true);

  // fetch the pending group members from the database
  const pendingGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", id)
    .eq("approved", false);

  // fetch the students based on the group members from the database
  const students = await client
    .from("students")
    .select("*")
    .in("id", groupMembers.data!.map((groupMember) => groupMember.student_id));

  // fetch the students based on the approved group members from the database
  const approvedStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      approvedGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the students based on the pending group members from the database
  const pendingStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      pendingGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // return the group, group members, approved group members, pending group members, students, approved students, and pending students
  return new Response(
    JSON.stringify({
      data: {
        group: group.data,
        members: {
          all: groupMembers.data,
          approved: approvedGroupMembers.data,
          pending: pendingGroupMembers.data,
        },
        students: {
          all: students.data,
          approved: approvedStudents.data,
          pending: pendingStudents.data,
        },
      },
      message: "Group fetched successfully",
      error: null,
      success: true,
    })
  )
}
