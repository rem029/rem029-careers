export const generateCareersApplicationResponseHTML = (
  title: string,
  addressedTo: string,
  operator: string,
  careerTitle: string,
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
            <style>
                body {
                  font-family: 'Montserrat', sans-serif;
                  padding: 40px;
                  background-color: #f0f2f5;
                  color: #333;
                }

                h1 {
                  color: #A3A3A3;
                  font-weight: 700;
                  margin-bottom: 20px;
                }

                p {
                  font-weight: 300;
                  line-height: 1.2;
                  padding: 0;
                  margin: 0;
                }

                .link-btn {
                  background-color: #A3A3A3;
                  color: #ffffff;
                  padding: 10px 20px;
                  margin-top: 20px;
                  border-radius: 5px;
                  text-decoration: none;
                  font-weight: 500;
                  max-width: 240px;
                  text-align: center;
                }

                .link-btn:hover {
                  background-color: #B69665;
                }
            </style>
            <title>${title}</title>
        </head>

        <body>            
            <p>Dear ${addressedTo},</p>
            <br/>
            <p>Thank you for submitting your application for the ${careerTitle} at ${operator}. We appreciate your interest in joining our team.</p>
            <br/>
            <p>Our recruitment team will carefully review your application. If your qualifications match the requirement for the position, we will contact you to discuss the next steps as part of the hiring process. </p>
            <br/>
            <p>We aim to get back to you as soon as possible, but please bear with us as we ensure every application is thoughtfully considered.</p>
            <br/>
            <p>Thank you again for your time and effort. We wish you all the best!</p>
            <br/>
            <p><strong>Best Regards,</strong></p>
            <p>${operator} HR Team</p>
        </body>
    </html>
    `;
};
