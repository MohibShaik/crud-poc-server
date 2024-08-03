const moment = require('moment');

exports.forgotPasswordTemplate = async function (data) {
  const today = moment(new Date()).format('YYYY-MM-DD');

  return new Promise((resolve, reject) => {
    var HTMLcontent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
        /* Header styles */
        .header {
          background-color: black;
          color: white;
          padding: 10px;
        }
       
    
        /* Body styles */
        .body {
          width: 700px;
          margin: 0 auto;
          font-family: Mulish;
          padding: 20px;
          background-color:#F2F2F2
        }
      </style>
    </head>
    
    <body>
    
        <table align="center" width="100%">
    
            <tbody width="700px" align="center">
                
    
                <tr align="center">
                    <table class="header" width="700" >
                        <tr>
                          <td align="left">MDM</td>
                          <td align="right">${today}</td>
                        </tr>
                      </table>
                    
                </tr>
    
                <tr align="center">
    
                    <table width="700" >
                        <tr>
                          <td> Hello, ${data?.username}
                           </td>
                        </tr>
                        <tr>
                        <td>
                        <p>We received a request to reset the password for your account.</p>
                        <p>To reset your password, Please click here</p>

                        <br>
                        <br>
                        </td>
                        </tr>


                        <tr>
                        <td > Regards,</td>
                        </tr>
                        <tr><td>
                        <p> Team MDM-Web</p></td>  
                        </tr>
                      </table>
                   
                    
                </tr>
            </tbody>
        </table>
    
    
      
    </body>
    
    </html>
    
    `;

    resolve(HTMLcontent);
  });
};
