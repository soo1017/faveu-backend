const MailComposer = require('nodemailer/lib/mail-composer');

function createEmailfaveu4Gmail(ses, from_email, faveu_email, faveu_name, url_link){

    var subject = "FaveU: One of your friends FaveU's you";
    var unsubscribe0 = "https://www.faveu.com/unsubscribe?id=";
    var unsubscribe1 = unsubscribe0.concat(faveu_email);
    var htmlMessage =
'<html>' +
'  <head>' +
'    <meta http-equiv="content-type" content="text/html; charset=UTF-8">' +
'    <style>' +
'      @import url("https://fonts.googleapis.com/css?family=Exo|Quicksand");' +
// '      @font-face {' +
// '         font-family: "ProximaNova-Reg";' +
// '         src: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/Font/ProximaNova_Reg.otf);' +
// '      }' +
'      body {' +
'         font-family: Quicksand, sans-serif;' +
'         font-family: Exo, sans-serif;' +
'      }' +
'      .imageContainer1 {' +
'         width:700px;' +
'         height:250px;' +
'         text-align:center;' +
'         background-size: 700px 250px;' +
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
'        padding-top:40px;' +
'      }' +
'      .imageContainer1 h3 {' +
'        margin-left:auto;' +
'        margin-right:auto;' +
'        margin-top:0;' +
'        margin-bottom:0;' +
'        text-align:center;' +
'        padding-top:25px;' +
'        color:#005495;' +
// '        font-family:sans-serif;' +
'      }' +
'      .imageContainer1 .cls-p1 {' +
'        padding-top:15px;' +
'        margin-left:auto;' +
'        margin-right:auto;' +
'        margin-top:5px;' +
'        margin-bottom:0;' +
'        text-align:center;' +
'        color:#005495;' +
// '        font-family:sans-serif;' +
'        font-size:18px;' +
'      }' +
'      .imageContainer1 .cls-p2 {' +
'        margin-left:auto;' +
'        margin-right:auto;' +
'        margin-top:0;' +
'        margin-bottom:0;' +
'        text-align:center;' +
'        color:#005495;' +
'        padding-top:3px;' +
// '        font-family:sans-serif;' +
'        font-size:18px;' +
'      }' +
'      .imageContainer2 {' +
'         width:700px;' +
'         text-align:center;' +
'         height:530px;' +
'         background-size: 700px 530px;' +
'         background-image: url(https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_bg2.png);' +
'      }' +
'      .imageContainer2 h2 {' +
'        margin:0;' +
'        padding-top:100px;' +
'        text-align:center;' +
'        width:60%;' +
'        margin-left:20%;' +
// '        font-family:sans-serif;' +
'        color:#ffffff;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
'      }' +
'      .imageContainer2 img {' +
'        padding-top:30px;' +
'        text-align:center;' +
'        height:1px;' +
'        width:100px;' +
'      }' +
'      .imageContainer2 p {' +
'        margin:0;' +
'        text-align:center;' +
'        font-size:21.5px;' +
'        width:60%;' +
'        margin-left:20%;' +
// '        font-family:sans-serif;' +
'        color:#fff;' +
'        letter-spacing:1px;' +
'        word-spacing:2px;' +
'        padding-bottom:2px;' +
'      }' +
'      .imageContainer2 .cls-2p-1 {' +
'        padding-top:30px;' +
'      }' +
'      .imageContainer2 .cls-2p-3 {' +
'        padding-top:45px;' +
'      }' +
'      .imageContainer2 a {' +
'        margin-top:50px;' +
'        text-align:center;' +
// '        font-family:sans-serif;' +
'        text-decoration:none;' +
'        background-color:white;' +
'        border:none;' +
'        border-radius:25px;' +
'        color:#005495;' +
'        display:inline-block;' +
'        font-size:18px;' +
'        line-height:50px;' +
'        width:250px;' +
'        letter-spacing:4px;' +
'        padding-top:4px;' +
// '        -webkit-text-size-adjust:none;' +
// '        mso-hide:all;' +
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
'         height:50px;' +
'         max-height:50px;' +
'         width:auto;' +
'      }' +
'      .imageContainer3 .cls-3p1 {' +
'        text-align:left;' +
'        color:#005495;' +
'        margin-top:0px;' +
'        padding-top:10px;' +
'        margin-left:30px;' +
'        margin-right:30px;' +
'        margin-bottom:0px;' +
// '        font-family:sans-serif;' +
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
// '        font-family:sans-serif;' +
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
// '        font-family:sans-serif;' +
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
// '        font-family:sans-serif;' +
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
// '        font-family:sans-serif;' +
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
'          <td style="height:1060px">' +
'            <table summary="Left side layout table" width="700px" height="1060px" cellspacing="0" cellpadding="0" border="0">' +
'              <tbody>' +
'                <tr>' +
'                  <td style="height:250; width:100.0%" valign="top"><span style="color:#696969"><span style="font-size:18px">' +
'                    <div class="imageContainer1">' +
'                      <img src="https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_logo.png" alt="faveu email-logo">' +
'                      <h3>Hi ' + faveu_name + '</h3>' +
'                      <p class="cls-p1">One of your friends FaveU\'s you.</p>' +
'                      <p class="cls-p2">If you want to find out who it is, tab continue below.</p>' +
'                    </div>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="height:530px; width:100.0%" valign="top"><span style="color:#696969"><span style="font-size:18px">' +
'                    <div class="imageContainer2">' +
'                       <h2>GOOD NEWS</h2>' +
'                       <img src="https://elasticbeanstalk-us-west-2-089740920504.s3-us-west-2.amazonaws.com/email_background/email_divider.png" alt="faveu email-divider">' +
'                       <p class="cls-2p-1">One of your friends</p>' +
'                       <p class="cls-2p-2">is interested in you</p>' +
'                       <p class="cls-2p-3">Find out more!</p>' +
'                       <a href="' + url_link + '"><b>CONTINUE</b></a>' +
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

module.exports = {createEmailfaveu4Gmail};
