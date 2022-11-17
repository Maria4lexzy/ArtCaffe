const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PSWD,
  },
});

exports.sendEmail = functions.https.onCall((data, context) => {
  /*
   date,
      userInfo[0] + " " + userInfo[1],
      userInfo[2],
      userInfo[3],
      numberOfPeople,
      selected,
      getDateHHMMSS(selectedTime)
   */
  console.log(data.date);
  const mailOptions = {
    from: `jakub.piga.cp@gmail.com`,
    to: data.email,
    subject: "contact form message",
    html: `<h1>New reservation for ${getDateDDMMYYYY(new Date(data.date))}</h1>
            <p>
                <b>Name: </b>${data.name}<br>
            </p>
            <p>
                <b>E-mail: </b>${data.email}<br>
            </p>
            <p>
                <b>Phone: </b>${data.phone}<br>
            </p>
            <p>
                <b>Table: </b>${data.tables}<br>
            </p>
            <p>
                <b>Number of people: </b>${data.numberOfPeople}<br>
            </p>`,
  };

  return transporter.sendMail(mailOptions, (error, data) => {
    console.log(error);
    console.log(data);
    if (error) {
      console.log(error);
      return;
    }
    console.log("Sent!");
  });
});

/**
 *
 * @param {date from which to return formated string} date
 * @returns string in format YYYY-MM-DD without timezone affection
 */
const getDateDDMMYYYY = (date) => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toDateString();
};
