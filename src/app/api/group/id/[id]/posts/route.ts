import { client } from "@/client";

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

  // verify if the group exists
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

  // fetch the group posts from the database
  const groupPosts = await client
    .from("group_posts")
    .select("*")
    .eq("group_id", id);

  // return the group posts and the group
  return new Response(
    JSON.stringify({
      data: {
        group: group.data,
        posts: groupPosts.data,
      },
      success: true,
      message: "Successfully fetched group posts",
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}