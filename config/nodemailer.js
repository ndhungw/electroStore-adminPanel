var nodemailer = require('nodemailer');
var mailer = {}

mailer.sendVerificationEmail = (userToVerify) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'electroStore7481@gmail.com',
            pass: '0984527805'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: '"Electro Store Support" <electroStore7481@email.com>', // sender address
        to: `${userToVerify.email}`, // list of receivers
        subject: 'Verify Your Email on Electro Store', // Subject line
        html: `<div>
        <table dir="ltr">
          <tbody>
            <tr>
              <td id="m_-4204830467929845844i1"
                style="padding:0;font-family:'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:17px;color:#707070">
                Electro Store account</td>
            </tr>
            <tr>
              <td id="m_-4204830467929845844i2"
                style="padding:0;font-family:'Segoe UI Light','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:41px;color:#2672ec">
                Verify your email address</td>
            </tr>
            <tr>
              <td id="m_-4204830467929845844i4"
                style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">
                To finish setting up this Electro Store account, we just need to make sure this email address is yours.</td>
            </tr>
            <tr>
              <td
                style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">
                <table border="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td bgcolor="#2672ec"
                        style="background-color:#2672ec;padding-top:5px;padding-right:20px;padding-bottom:5px;padding-left:20px;min-width:50px">
                        <!-- <a id="m_-4204830467929845844i5"
                          style="font-family:'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:14px;text-align:center;text-decoration:none;font-weight:600;letter-spacing:0.02em;color:#fff"
                          href="https://account.live.com/Email/Verify?otc=*DcD1M8Eus18NaW4InwML3HfNONwXm31kjxaJO16t34UDLANpoBhg9aom8W0W4dVQIJ0A7FdVbRAPcY0o5khDnN0%24&amp;mn=ndh1379%40gmail.com&amp;ru=https://login.live.com/login.srf%3fwa%3dwsignin1.0%26rpsnv%3d13%26ct%3d1499872325%26rver%3d6.7.6643.0%26wp%3dMBI_SSL%26wreply%3dhttps%253a%252f%252frps-mlxprod.microsoft.com%253a443%252fRpsSts%252fLogOn%253fwa%253dwsignin1.0%2526wtrealm%253dhttps%25253a%25252f%25252fmlxprodea.accesscontrol.windows.net%25252f%2526wreply%253dhttps%25253a%25252f%25252fmlxprodea.accesscontrol.windows.net%25252fv2%25252fwsfederation%2526wctx%253db2958f90-6565-4d9e-ac93-0928f499c7b2%26id%3d291113%26contextid%3d9857A65AE3F1B58A%26bk%3d1499872326%26uiflavor%3dweb%26uaid%3d6f4230c55937456385d7b471921deff8%26mkt%3dEN-US%26lc%3d1033%26username%3dndh1379%2540gmail.com%26lic%3d1&amp;cxt=EV"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://account.live.com/Email/Verify?otc%3D*DcD1M8Eus18NaW4InwML3HfNONwXm31kjxaJO16t34UDLANpoBhg9aom8W0W4dVQIJ0A7FdVbRAPcY0o5khDnN0%2524%26mn%3Dndh1379%2540gmail.com%26ru%3Dhttps://login.live.com/login.srf%253fwa%253dwsignin1.0%2526rpsnv%253d13%2526ct%253d1499872325%2526rver%253d6.7.6643.0%2526wp%253dMBI_SSL%2526wreply%253dhttps%25253a%25252f%25252frps-mlxprod.microsoft.com%25253a443%25252fRpsSts%25252fLogOn%25253fwa%25253dwsignin1.0%252526wtrealm%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252f%252526wreply%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252fv2%2525252fwsfederation%252526wctx%25253db2958f90-6565-4d9e-ac93-0928f499c7b2%2526id%253d291113%2526contextid%253d9857A65AE3F1B58A%2526bk%253d1499872326%2526uiflavor%253dweb%2526uaid%253d6f4230c55937456385d7b471921deff8%2526mkt%253dEN-US%2526lc%253d1033%2526username%253dndh1379%252540gmail.com%2526lic%253d1%26cxt%3DEV&amp;source=gmail&amp;ust=1578391827615000&amp;usg=AFQjCNGvRUh0Q0cq_a3f9X9NoWAMgn26dg">Verify
                          <span dir="ltr">ndh1379@gmail.com</span></a></td> -->
                          <a id="m_-4204830467929845844i5"
                          style="font-family:'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:14px;text-align:center;text-decoration:none;font-weight:600;letter-spacing:0.02em;color:#fff"
                          href="https://electro-store-admin-panel.herokuapp.com/users/email-verification?id=${userToVerify._id}"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://account.live.com/Email/Verify?otc%3D*DcD1M8Eus18NaW4InwML3HfNONwXm31kjxaJO16t34UDLANpoBhg9aom8W0W4dVQIJ0A7FdVbRAPcY0o5khDnN0%2524%26mn%3Dndh1379%2540gmail.com%26ru%3Dhttps://login.live.com/login.srf%253fwa%253dwsignin1.0%2526rpsnv%253d13%2526ct%253d1499872325%2526rver%253d6.7.6643.0%2526wp%253dMBI_SSL%2526wreply%253dhttps%25253a%25252f%25252frps-mlxprod.microsoft.com%25253a443%25252fRpsSts%25252fLogOn%25253fwa%25253dwsignin1.0%252526wtrealm%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252f%252526wreply%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252fv2%2525252fwsfederation%252526wctx%25253db2958f90-6565-4d9e-ac93-0928f499c7b2%2526id%253d291113%2526contextid%253d9857A65AE3F1B58A%2526bk%253d1499872326%2526uiflavor%253dweb%2526uaid%253d6f4230c55937456385d7b471921deff8%2526mkt%253dEN-US%2526lc%253d1033%2526username%253dndh1379%252540gmail.com%2526lic%253d1%26cxt%3DEV&amp;source=gmail&amp;ust=1578391827615000&amp;usg=AFQjCNGvRUh0Q0cq_a3f9X9NoWAMgn26dg">Verify
                          <span dir="ltr">${userToVerify.email}</span></a></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <!-- <tr>
              <td
                style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">
                Or you may be asked to enter this security code: <span
                  style="font-family:'Segoe UI Bold','Segoe UI Semibold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:14px;font-weight:bold;color:#2a2a2a">6185</span>
              </td>
            </tr>
            <tr>
              <td id="m_-4204830467929845844i6"
                style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">
                If you didn't make this request, <a id="m_-4204830467929845844iCancel" class="m_-4204830467929845844link"
                  style="color:#2672ec;text-decoration:none"
                  href="https://account.live.com/Email/Remove?otc=*DcD1M8Eus18NaW4InwML3HfNONwXm31kjxaJO16t34UDLANpoBhg9aom8W0W4dVQIJ0A7FdVbRAPcY0o5khDnN0%24&amp;mn=ndh1379%40gmail.com&amp;ru=https://login.live.com/login.srf%3fwa%3dwsignin1.0%26rpsnv%3d13%26ct%3d1499872325%26rver%3d6.7.6643.0%26wp%3dMBI_SSL%26wreply%3dhttps%253a%252f%252frps-mlxprod.microsoft.com%253a443%252fRpsSts%252fLogOn%253fwa%253dwsignin1.0%2526wtrealm%253dhttps%25253a%25252f%25252fmlxprodea.accesscontrol.windows.net%25252f%2526wreply%253dhttps%25253a%25252f%25252fmlxprodea.accesscontrol.windows.net%25252fv2%25252fwsfederation%2526wctx%253db2958f90-6565-4d9e-ac93-0928f499c7b2%26id%3d291113%26contextid%3d9857A65AE3F1B58A%26bk%3d1499872326%26uiflavor%3dweb%26uaid%3d6f4230c55937456385d7b471921deff8%26mkt%3dEN-US%26lc%3d1033%26username%3dndh1379%2540gmail.com%26lic%3d1&amp;cxt=EV"
                  target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=https://account.live.com/Email/Remove?otc%3D*DcD1M8Eus18NaW4InwML3HfNONwXm31kjxaJO16t34UDLANpoBhg9aom8W0W4dVQIJ0A7FdVbRAPcY0o5khDnN0%2524%26mn%3Dndh1379%2540gmail.com%26ru%3Dhttps://login.live.com/login.srf%253fwa%253dwsignin1.0%2526rpsnv%253d13%2526ct%253d1499872325%2526rver%253d6.7.6643.0%2526wp%253dMBI_SSL%2526wreply%253dhttps%25253a%25252f%25252frps-mlxprod.microsoft.com%25253a443%25252fRpsSts%25252fLogOn%25253fwa%25253dwsignin1.0%252526wtrealm%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252f%252526wreply%25253dhttps%2525253a%2525252f%2525252fmlxprodea.accesscontrol.windows.net%2525252fv2%2525252fwsfederation%252526wctx%25253db2958f90-6565-4d9e-ac93-0928f499c7b2%2526id%253d291113%2526contextid%253d9857A65AE3F1B58A%2526bk%253d1499872326%2526uiflavor%253dweb%2526uaid%253d6f4230c55937456385d7b471921deff8%2526mkt%253dEN-US%2526lc%253d1033%2526username%253dndh1379%252540gmail.com%2526lic%253d1%26cxt%3DEV&amp;source=gmail&amp;ust=1578391827615000&amp;usg=AFQjCNEpefSZ0OfLBMIEtCpor8p-qYInnQ">click
                  here</a> to cancel.</td>
            </tr> -->
            <tr>
              <td
                style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">
                Thanks,</td>
            </tr>
            <tr>
              <td id="m_-4204830467929845844i8"
                style="padding:0;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">The
                Microsoft account team</td>
            </tr>
          </tbody>
        </table>
        <div class="yj6qo"></div>
        <div class="adL">
        </div>
      </div>`// plain text body (\n Please click the link below to veryfy your account on Electro Store (electrostore.com)}</p><a href="localhost:3000/users/login"></a>)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else{
          console.log(info);                    
        }
     });
}

module.exports = mailer;