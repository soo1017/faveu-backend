const MailComposer = require('nodemailer/lib/mail-composer');

function createEmailsuccess(ses, from_email, faveu_email, msg){

    var subject = "FaveU: FaveU sender wants to chat with you";
    var unsubscribe0 = "https://www.faveu.com/unsubscribe?id=";
    var unsubscribe1 = unsubscribe0.concat(faveu_email);
    var htmlMessage =
'<html>' +
'  <head>' +
'    <meta http-equiv="content-type" content="text/html; charset=UTF-8">' +
'    <style>' +
// '      @font-face {' +
// '         font-family: "ProximaNova-Bold";' +
// '         font-weight: Bold;' +
// '         src: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/Font/ProximaNova_Bold.otf);' +
// '      }' +
// '      @font-face {' +
// '         font-family: "ProximaNova-Reg";' +
// '         src: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/Font/ProximaNova_Reg.otf);' +
// '      }' +
'      .imageContainer1 {' +
'         width:700px;' +
'         height:200px;' +
'         text-align:center;' +
'         background-size: 700px 200px;' +
'         background-image: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_bg1.png);' +
'      }' +
'      .imageContainer1 img {' +
'        width:140px;' +
'        height:50px;' +
'        margin-left:auto;' +
'        margin-right:auto;' +
'        margin-top:0;' +
'        margin-bottom:0;' +
'        text-align:center;' +
'        padding-top:30px;' +
'      }' +
'      .imageContainer1 h2 {' +
'        margin-left:auto;' +
'        margin-right:auto;' +
'        margin-top:0;' +
'        margin-bottom:0;' +
'        text-align:center;' +
'        padding-top:30px;' +
'        color:#005495;' +
'        font-family:sans-serif;' +
'      }' +
'      .imageContainer2 {' +
'         width:700px;' +
'         text-align:center;' +
'         height:510px;' +
'         background-size: 700px 510px;' +
'         background-image: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_bg2.png);' +
'      }' +
'      .imageContainer2 p {' +
'        margin:0;' +
'        font-size:18px;' +
'        line-height:30px;' +
'        padding-top:70px;' +
'        text-align:center;' +
'        width:54%;' +
'        margin-left:23%;' +
'        font-family:sans-serif;' +
'        color:#ffffff;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
'        white-space: pre-wrap;' +
'      }' +
'      .imageContainer3 {' +
'         width:700px;' +
'         height:280px;' +
'         background-size: 700px 280px;' +
'         text-align:center;' +
'         background-image: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_bg3.png);' +
'      }' +
'      .imageContainer3 a {' +
'         text-align:center;' +
'         display:inline-block;' +
'         margin:0px;' +
'         padding-top:10px;' +
'         padding-bottom:10px;' +
'         padding-left:15px;' +
'         padding-right:15px;' +
'         margin-left:10px;' +
'         margin-right:10px;' +
'      }' +
'      .imageContainer3 .btn-app {' +
'         margin-right:10px;' +
'         margin-left:10px;' +
'      }' +
'      .imageContainer3 a img {' +
'        height:50px;' +
'        max-height:50px;' +
'        width:auto;' +
'      }' +
'      .imageContainer3 .cls-3p1 {' +
'        text-align:left;' +
'        color:#005495;' +
'        margin-top:0px;' +
'        padding-top:10px;' +
'        margin-left:30px;' +
'        margin-right:30px;' +
'        margin-bottom:0px;' +
'        font-family:sans-serif;' +
'        display:block;' +
'        text-decoration:none;' +
'        font-size:11.5px;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
// '        word-weight:600;' +
'      }' +
'      .imageContainer3 .cls-3p2 {' +
'        text-align:left;' +
'        color:#005495;' +
'        margin-left:30px;' +
'        margin-right:30px;' +
'        margin-top:0px;' +
'        margin-bottom:0px;' +
'        padding-top:10px;' +
'        font-family:sans-serif;' +
'        display:block;' +
'        text-decoration:none;' +
'        font-size:11.5px;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
// '        word-weight:600;' +
'      }' +
'      .imageContainer3 .cls-3p2 a {' +
'        padding:0;' +
'      }' +
'      .imageContainer3 .cls-3p2 a {' +
'        text-align:left;' +
'        color:#005495;' +
'        font-family:sans-serif;' +
'        text-decoration:none;' +
'        font-size:11.5px;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
// '        word-weight:600;' +
'      }' +
'      .imageContainer3 a {' +
// '        text-align:left;' +
'        margin-left:0;' +
'        margin-right:0;' +
'        padding-left:0;' +
'        padding-right:0;' +
'        color:#005495;' +
'        font-family:sans-serif;' +
'        display:inline-block;' +
'        text-decoration:none;' +
'        font-size:11.5px;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
// '        word-weight:600;' +
'      }' +
'      .imageContainer3 .cls-3a1 {' +
// '        text-align:left;' +
// '        margin-left:30px;' +
'        text-align:left;' +
// '        margin-top:10px;' +
'      }' +
'      .imageContainer3 .cls-3p3 {' +
// '        text-align:left;' +
'        color:#005495;' +
// '        margin-left:30px;' +
// '        margin-right:50px;' +
'        margin-top:0px;' +
// '        padding-top:10px;' +
'        margin-bottom:0px;' +
'        font-family:sans-serif;' +
'        display:block;' +
'        text-decoration:none;' +
'        font-size:11.5px;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
// '        word-weight:600;' +
'      }' +
'    </style>' +
'    <title>' +
'    </title>' +
'  </head>' +
'  <body>' +
'    <table style="width:100%" summary="Main layout table" cellspacing="0" cellpadding="0" border="0">' +
'      <tbody>' +
'        <tr>' +
'          <td style="height:990px">' +
'            <table summary="Left side layout table" width="700px" height="990px" cellspacing="0" cellpadding="0" border="0">' +
'              <tbody>' +
'                <tr>' +
'                  <td style="height:200; width:100.0%" valign="top"><span style="color:#696969"><span style="font-size:18px">' +
'                    <div class="imageContainer1">' +
'                      <img src="https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_logo.png" alt="faveu email-logo">' +
'                      <h2>Congratulations!</h2>' +
'                    </div>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="height:510px; width:100.0%" valign="top"><span style="color:#696969"><span style="font-size:18px">' +
'                    <div class="imageContainer2">' +
'                       <p class="cls-2p1">' + msg + '</p>' +
'                    </div>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="height:280px; width:100.0%" valign="top"><span style="color:#696969"><span style="font-size:10px">' +
'                    <div class="imageContainer3">' +
'                      <a href="http://itunes.com/apps/faveu" class="btn-app"><img src="https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/app_ios.png" alt="app ios"></a>' +
'                      <a href="https://play.google.com/store/apps/details?id=com.faveu.faveu" class="btn-app"><img src="https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/app_android.png" alt="app android"></a>' +
'                      <p class="cls-3p1">You\’re receiving this email because one of your friends or acquaintances uses the FaveU service to know your heart about her(him). Your email address will not be exposed to any public or third party, and will not be abused for any other interest.</p>' +
'                      <p class="cls-3p2">The message is sent to ' + faveu_email + '. If you don\'t want to receive this email from us anymore. Please click <a href="' + unsubscribe1 +'"><b>here</b>.</a></p>' +
'                      <a href="https://www.faveu.com/termsofuse" class="cls-3a1"><b>Terms of Use</b></a>' +
'                      <a href="https://www.faveu.com/privacy-policy" class="cls-3a2">&nbsp;&nbsp;|&nbsp;&nbsp;<b>Privacy Policy</b></a>' +
'                      <a href="https://www.faveu.com/contact" class="cls-3a3">&nbsp;&nbsp;|&nbsp;&nbsp;<b>Contact Us</b></a>' +
'                      <p class="cls-3p3">FaveU. <a href="https://www.faveu.com"><b>www.faveu.com</b></a></p>' +
'                    </div>' +
'                  </td>' +
'                </tr>' +
'              </tbody>' +
'            </table>' +
'          </td>' +
'        </tr>' +
'      </tbody>' +
'    </table>' +
'  </body>' +
'</html>'

    var ses_mail = new MailComposer({
        from: from_email, to: faveu_email, subject: subject, html: htmlMessage
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);
        });
    });

}

module.exports = {createEmailsuccess};
