import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Helper to safely load config only if it exists
const configPath = path.join(__dirname, '../config.json');
const fileConfig = fs.existsSync(configPath) ? require('../config.json') : {};

export default async function sendEmail({ to, subject, html, from }: any) {
    // 1. Try Environment Variables (for Render)
    // 2. Fallback to config.json (for Local)
    const smtpOptions = process.env.SMTP_HOST ? {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    } : fileConfig.smtpOptions;

    const emailFrom = process.env.EMAIL_FROM || fileConfig.emailFrom;

    const transporter = nodemailer.createTransport(smtpOptions);
    await transporter.sendMail({ from: from || emailFrom, to, subject, html });
}
