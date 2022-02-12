import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_DEFAULT_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = await fs.readFileSync(path).toString("utf-8");

    const compiledTemplate = handlebars.compile(templateFileContent);

    const tempalteHTML = compiledTemplate(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      html: tempalteHTML,
    });
  }
}

export { SESMailProvider };
