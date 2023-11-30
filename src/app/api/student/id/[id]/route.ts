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

  // fetch the follower ids of the student from the database
  const followerIds = await client
    .from("student_followers")
    .select("*")
    .eq("following_id", id);

  // fetch the followers of the student from the database
  const followers = await client
    .from("students")
    .select("*")
    .in("id", followerIds.data!.map((followerId) => followerId.follower_id));

  // fetch the following ids of the student from the database
  const followingIds = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", id);

  // fetch the following of the student from the database
  const following = await client
    .from("students")
    .select("*")
    .in("id", followingIds.data!.map((followingId) => followingId.following_id));

  // fetch the group ids of the student from the database
  const group_ids = await client
    .from("group_members")
    .select("*")
    .eq("student_id", id);

  // fetch the groups of the student from the database
  const groups = await client
    .from("groups")
    .select("*")
    .in("id", group_ids.data!.map((group_id) => group_id.group_id));

  // return the student, followers, following, and groups
  return new Response(
    JSON.stringify({
      data: {
        student: student.data,
        followers: followers.data,
        following: following.data,
        groups: groups.data,
      },
      message: "Student found",
      success: true,
      error: null,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
