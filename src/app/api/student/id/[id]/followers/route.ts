import { client } from "@/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // fetch the studnet id from the url
  console.log(params);
  const { id } = params;

  // if the studnet id is not present, return an error
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing studnet id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the studnet exists
  const studnet = await client
    .from("studnets")
    .select("*")
    .eq("id", id)
    .single();

  // if the studnet is not found, return an error
  if (!studnet) {
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
    .from("studnets")
    .select("*")
    .in("id", followerIds.data!.map((followerId) => followerId.follower_id));

  // return the studnet and their followers
  return new Response(
    JSON.stringify({
      data: {
        student: studnet.data,
        followers: followers.data,
      },
      success: true,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
