import nodemailer from 'nodemailer';
import { config } from '../../config/env';

export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: config.SMTP_PORT === 465, // true for 465, false for other ports
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        const mailOptions = {
            from: config.SMTP_FROM,
            to,
            subject,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
