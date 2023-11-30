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

  // fetch the group chat urls from the database
  const groupChatUrls = await client
    .from("group_chat_urls")
    .select("*")
    .eq("group_id", id);

  // return the group chat urls and the group
  return new Response(
    JSON.stringify({
      data: {
        group: group.data,
        chat_urls: groupChatUrls.data,
      },
      success: true,
      message: "Successfully fetched group chat urls",
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
