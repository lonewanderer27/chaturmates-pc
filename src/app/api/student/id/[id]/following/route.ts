import { client } from "@/client";

// to unfollow a student
export async function DELETE(
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

  // fetch the student id to be unfollowed from the request body
  const { followingId } = await request.json();

  // if the student id to be unfollowed is not present, return an error
  if (!followingId) {
    return new Response(
      JSON.stringify({ error: "Missing following id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify it the student id is not the same as the student id to be unfollowed
  if (id === followingId) {
    return new Response(
      JSON.stringify({
        error: "Student cannot unfollow themselves",
        success: false,
      }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the student to be unfollowed exists
  const following = await client
    .from("students")
    .select("*")
    .eq("id", followingId)
    .single();

  // if the student to be unfollowed is not found, return an error
  if (!following) {
    return new Response(
      JSON.stringify({
        error: "Student to be unfollowed is not found",
        success: false,
      }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // verify if the student is already following the student to be unfollowed
  const alreadyFollowing = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", id)
    .eq("following_id", followingId)
    .single();

  // if the student is not following the student to be unfollowed, return an error
  if (!alreadyFollowing) {
    return new Response(
      JSON.stringify({ error: "Not following", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // unfollow the student
  const unfollowed = await client
    .from("student_followers")
    .delete()
    .eq("follower_id", id)
    .eq("following_id", followingId)

  // if the student could not be unfollowed, return an error
  if (!unfollowed) {
    return new Response(
      JSON.stringify({ error: "Could not unfollow", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  // return a success message
  return new Response(
    JSON.stringify({
      message: "Unfollowed successfully",
      success: true,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}



// to follow a new student
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

  // fetch the student id to be followed from the request body
  const { followingId } = await request.json();

  // if the student id to be followed is not present, return an error
  if (!followingId) {
    return new Response(
      JSON.stringify({ error: "Missing following id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify it the student id is not the same as the student id to be followed
  if (id === followingId) {
    return new Response(
      JSON.stringify({
        error: "Student cannot follow themselves",
        success: false,
      }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the student to be followed exists
  const following = await client
    .from("students")
    .select("*")
    .eq("id", followingId)
    .single();

  // if the student to be followed is not found, return an error
  if (!following) {
    return new Response(
      JSON.stringify({
        error: "Student to be followed is not found",
        success: false,
      }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // verify if the student is already following the student to be followed
  const alreadyFollowing = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", id)
    .eq("following_id", followingId)
    .single();

  // if the student is already following the student to be followed, return an error
  if (alreadyFollowing) {
    return new Response(
      JSON.stringify({ error: "Already following", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // follow the student
  const followed = await client
    .from("student_followers")
    .insert({
      follower_id: id,
      following_id: followingId,
    })
    .select("*")
    .single();

  // if the student could not be followed, return an error
  if (!followed) {
    return new Response(
      JSON.stringify({ error: "Could not follow", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  // return a success message
  return new Response(
    JSON.stringify({
      message: "Followed successfully",
      success: true,
      data: followed.data,
    }),
    {
      status: 201,
      statusText: "Created",
    }
  );
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

  // fetch the following ids of the student from the database
  const followingIds = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", id);

  // fetch the following of the student from the database
  const following = await client
    .from("students")
    .select("*")
    .in(
      "id",
      followingIds.data!.map((followingId) => followingId.following_id)
    );

  // return the student and their following
  return new Response(
    JSON.stringify({
      data: {
        student: student.data,
        following: following.data,
      },
      success: true,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
