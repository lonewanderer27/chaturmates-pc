import { client } from "@/client";
import emailjs from "@emailjs/nodejs";

function generateOTP(): string {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  // fetch student id from the url
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

  // verify if the profile for the student exists
  const profile = await client
    .from("profile")
    .select("*")
    .eq("student_id", id)
    .single();

  // if the profile is not found, return an error
  if (!profile) {
    return new Response(
      JSON.stringify({ error: "Profile not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // generate an OTP
  const otp = generateOTP();

  // calculate the expiry time of the OTP
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 5);

  // insert the OTP into the database
  await client.from("otp_codes").insert({
    code: otp.toString(),
    student_id: id,
    expiry_at: expiry.toISOString(),
  });

  // if the OTP is not inserted, return an error
  if (!otp) {
    return new Response(
      JSON.stringify({ error: "Error inserting OTP", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  const templateParams = {
    full_name: profile.data.full_name,
    target_email: student.data?.school_email,
    otp: otp.toString(),
  };

  // send the OTP to the student's email
  const res_email = await emailjs.send(
    "service_4m5uqrp",
    "template_l0en9zs",
    templateParams,
    {
      publicKey: "lXhUBOOBdtCvuRVwT",
      privateKey: "G3Lo3bLT2urAge-_bt26b",
    }
  );

  // check if the email was sent successfully
  if (res_email.status !== 200) {
    return new Response(
      JSON.stringify({ error: "Error sending OTP", success: false }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  } else {
    // return success
    return new Response(
      JSON.stringify({
        data: { code: otp.toString() },
        message: "OTP sent successfully",
        success: true,
        error: null,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  }
}
