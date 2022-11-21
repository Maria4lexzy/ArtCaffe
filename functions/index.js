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
    from: `artcaffe.sabinov@gmail.com`,
    to: `artcaffe.sabinov@gmail.com`,
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
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }

        .u-row .u-col-33p33 {
          width: 199.98px !important;
        }

        .u-row .u-col-50 {
          width: 300px !important;
        }

        .u-row .u-col-100 {
          width: 600px !important;
        }
      }

      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: calc(100% - 40px) !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }

      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }

      p {
        margin: 0;
      }

      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }

      * {
        line-height: inherit;
      }

      a[x-apple-data-detectors="true"] {
        color: inherit !important;
        text-decoration: none !important;
      }

      table,
      td {
        color: #ffffff;
      }
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
      @media (max-width: 480px) {
        #u_content_image_2 .v-src-width {
          width: auto !important;
        }
        #u_content_image_2 .v-src-max-width {
          max-width: 70% !important;
        }
        #u_content_heading_2 .v-font-size {
          font-size: 34px !important;
        }
        #u_content_heading_2 .v-line-height {
          line-height: 120% !important;
        }
        #u_content_text_2 .v-container-padding-padding {
          padding: 5px 20px 50px !important;
        }
        #u_content_image_3 .v-src-width {
          width: auto !important;
        }
        #u_content_image_3 .v-src-max-width {
          max-width: 60% !important;
        }
        #u_content_heading_7 .v-container-padding-padding {
          padding: 20px 10px 0px !important;
        }
        #u_content_text_3 .v-container-padding-padding {
          padding: 5px 20px 25px !important;
        }
        #u_content_image_4 .v-src-width {
          width: auto !important;
        }
        #u_content_image_4 .v-src-max-width {
          max-width: 60% !important;
        }
        #u_content_text_1 .v-container-padding-padding {
          padding: 5px 20px 50px !important;
        }
        #u_content_heading_5 .v-container-padding-padding {
          padding: 20px 10px 25px !important;
        }
        #u_content_heading_5 .v-font-size {
          font-size: 34px !important;
        }
        #u_content_heading_5 .v-color {
          color: #ffffff !important;
        }
        #u_content_button_3 .v-container-padding-padding {
          padding: 20px 10px 25px !important;
        }
        #u_content_button_3 .v-size-width {
          width: 65% !important;
        }
        #u_content_button_1 .v-container-padding-padding {
          padding: 20px 10px 25px !important;
        }
        #u_content_button_1 .v-size-width {
          width: 65% !important;
        }
        #u_content_button_2 .v-container-padding-padding {
          padding: 20px 10px 50px !important;
        }
        #u_content_button_2 .v-size-width {
          width: 65% !important;
        }
        #u_content_text_7 .v-container-padding-padding {
          padding: 10px 20px 30px !important;
        }
        #u_content_text_7 .v-line-height {
          line-height: 160% !important;
        }
      }
    </style>

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css2?family=Oregano&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
  </head>

  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #ecf0f1;
      color: #ffffff;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
      id="u_body"
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ecf0f1;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td
            style="
              word-break: break-word;
              border-collapse: collapse !important;
              vertical-align: top;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        background-color: #000000;
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_heading_2"
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 50px 10px 0px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <h1
                                  class="v-color v-line-height v-font-size"
                                  style="
                                    margin: 0px;
                                    color: #ffffff;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                    font-weight: normal;
                                    font-family: Caveat Brush;
                                    font-size: 32px;
                                  "
                                >
                                  <div>
                                    <div>
                                      <strong>Potvrdenie rezervácií</strong>
                                    </div>
                                  </div>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_2"
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 5px 100px 50px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <div
                                  class="v-color v-line-height"
                                  style="
                                    color: #ffffff;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    ${getDateDDMMYYYY(new Date(data.date))}
                                  </p>
                                   <p style="font-size: 14px; line-height: 140%">
                                    Stôl: ${data.tables}
                                  </p>
                                   <p style="font-size: 14px; line-height: 140%">
                                   Pre ${data.numberOfPeople} ľudí.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #0f0b0a;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        background-color: #0f0b0a;
                        height: 100%;
                        width: 100% !important;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      ><!--<![endif]-->
                        <table
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                      align="center"
                                    >
                                      <img
                                        align="center"
                                        border="0"
                                        src="assets/logo.png"
                                        alt="image"
                                        title="image"
                                        style="
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                          clear: both;
                                          display: inline-block !important;
                                          border: none;
                                          height: auto;
                                          float: none;
                                          width: 100%;
                                          max-width: 599px;
                                        "
                                        width="599"
                                        class="v-src-width v-src-max-width"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000000;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 600px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        background-color: #000000;
                        height: 100%;
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 50px 10px 10px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <div align="center">
                                  <div style="display: table; max-width: 187px">
                                    <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 15px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="/"
                                              title="Twitter"
                                              target="_blank"
                                            >
                                              <img
                                                src="assets/fb.png"
                                                alt="Facebook"
                                                title="Facebook"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 15px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://artcaffe.sk/"
                                              title="LinkedIn"
                                              target="_blank"
                                            >
                                              <img
                                                src="./assets/web.png"
                                                alt="LinkedIn"
                                                title="LinkedIn"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="
                                        width: 32px !important;
                                        height: 32px !important;
                                        display: inline-block;
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        margin-right: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                            "
                                          >
                                            <a
                                              href="https://instagram.com/"
                                              title="Instagram"
                                              target="_blank"
                                            >
                                              <img
                                                src="./assets/insta.png"
                                                alt="Instagram"
                                                title="Instagram"
                                                width="32"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  max-width: 32px !important;
                                                "
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          id="u_content_text_7"
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 10px 30px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <div
                                  class="v-color v-line-height"
                                  style="
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    Tešíme sa na vás! :)
                                  </p>
                                  <p style="font-size: 14px; line-height: 140%">
                                     
                                  </p>
                                  <p style="font-size: 14px; line-height: 140%">
                                    Námestie slobody 47/47, 083 01 Sabinov,
                                    Slovakia
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Oregano', cursive"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px;
                                  font-family: 'Oregano', cursive;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                      align="center"
                                    >
                                      <img
                                        align="center"
                                        border="0"
                                        src="./assets/footer_image.png"
                                        alt="image"
                                        title="image"
                                        style="
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                          clear: both;
                                          display: inline-block !important;
                                          border: none;
                                          height: auto;
                                          float: none;
                                          width: 100%;
                                          max-width: 600px;
                                        "
                                        width="600"
                                        class="v-src-width v-src-max-width"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>
    `,
  };
  const mailOptionsCustomer = {
    from: `artcaffe.sabinov@gmail.com`,
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
