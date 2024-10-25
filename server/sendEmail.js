import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function(req,res){
    if (req.method === 'POST'){
        const { to, subject, text } = req.body;

        //creation sa transporter using my email service
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        //email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        try{
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Email sent successfully!'});

        }catch (error){
            return req.status(500).json({ error: 'Failed to send email.'});
        }
    } else {
        return res.status(405).json({ error: 'Method not Allowed.'});
    }
}