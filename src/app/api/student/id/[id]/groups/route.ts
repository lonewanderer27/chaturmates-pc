import { client } from "@/client";

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
