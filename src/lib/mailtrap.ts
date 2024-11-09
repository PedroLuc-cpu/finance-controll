import { MailtrapClient } from "mailtrap";

export const sendEmail = async (to: string, subject: string, body: string) => {
  const options = {
    token: process.env.MAILTRAP_TOKEN as string,
    testInboxId: 3196342,
  };

  const mailTrap = new MailtrapClient(options);

  try {
    await mailTrap.testing.send({
      from: { name: "Control-Finance", email: "controlFinance@control.com" },
      to: [{ email: to }],
      subject,
      text: body,
      html: body,
    });
    return true;
  } catch (error) {
    return false;
  }
};
