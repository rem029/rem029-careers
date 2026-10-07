export const generateCareersApplicationNewHTML = (
  title: string,
  addressedTo: string,
  url: string,
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

                .row-container {
                display: flex;
                flex-direction: column;
                gap: 16px;
                }

                .row-container>h6 {
                font-size: 24px;
                opacity: .50;
                padding: 0;
                margin: 0;
                }

                .row-container>p {
                padding: 0;
                margin: 0;
                }
            </style>
            <title>${title}</title>
        </head>

        <body>
            <h1>${title}</h1>  
            <p>Dear ${addressedTo},</p>
            <p>A new application has been received.</p>
            <p>To view, please access link below.</p>
            <a href="${url}" target="_blank">${url}</a>
        </body>
    </html>
    `;
};
