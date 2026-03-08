import transpoter from "../lib/EmailTransporter";


interface Articles {
  title: string,
  summary: string,
  url: string
}

export async function SendEmailToUserAboutSummarizeNews(Articles: Articles[], UserEmail: string) {

  
   // build one email body from all articles
let emailBody = ""
for(const article of Articles) {
    emailBody += `
Title: ${article.title}
AI-Summary: ${article.summary}
URL: ${article.url}
-------------------`
}

  try {
    await transpoter.sendMail({
      from: '<dailynewsbotai@gmail.com>',
      to: UserEmail,
      subject: "Daily Ai News Update",
      text: `
        here Your Daily Briefing ${emailBody}
      `
    })
  } catch (error) {
    console.log("Error while Sending Email to user" , error)
    return error
  }
}