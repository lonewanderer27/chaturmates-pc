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

  // return the group members, approved group members, pending group members, and the group
  return new Response(
    JSON.stringify({
      data: {
        group: group.data,
        members: {
          all: groupMembers.data,
          approved: approvedGroupMembers.data,
          pending: pendingGroupMembers.data,
        },
      },
      message: "Group members fetched successfully",
      success: true,
      error: null,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
