import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

let counter = 1

async function sendEmail(email : string, subject : string, text : string){
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.AUTH_EMAIL,
            pass : process.env.AUTH_PASS,
        }
    })

    const mailOptions = {
        from: 'skytrack1o1@gmail.com',
        to: email,
        subject,
        text
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent : " + info.response)
}

export async function GET(){
    const now = new Date()
    try{
        await sendEmail("swayam.duhan10@gmail.com", "test cron vercel", `this is a test mail, sent at ${now.toLocaleTimeString()} on ${now.toDateString()}. value of example counter for testing is ${counter}`)
        counter++
        return NextResponse.json({ message : "MAIL_SENT"},  {status : 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message : "ERROR_ENCOUNTERD"}, { status : 400 })
    }
}

