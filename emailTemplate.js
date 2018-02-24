module.exports = (curPrice, prevPrice) => {
	return `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <style media="screen" type="text/css">
              html {
                background-color: rgba(218, 223, 225, 1);
                margin: 0px;
                padding: 0px;
              }
              body {
                height: 100%
              }
              .email {
                background-color: white;
                padding: 5px;
                height: 90%;
                text-align: center;
              }
              .appName {
                margin: 0px;
                color: black;
                border-bottom: 1px solid black;
                text-align: center;
                padding: 0px;
              }
              .title {
              	display: inline-block;
              }
              .name {
              	float: right;
              }
              .float {
              	margin: 0px;
              	padding: 0px;
              	font-family: "Times New Roman", sans-serif;
              	font-size: 60px;
              }
              .griz {
              	float: left;
              	margin-right: 50px;
              }
              #stats {
              	text-align: left
              }
            </style>
          </head>
          <body>
            <div class="email">
               <h2> IOTA has changed by a whole dollar </h2>
              <div id="stats">
                <h2>Current IOTA price: </h2>
                <h3>${curPrice}</h3><br/><br/>
                <h2>IOTA price changed from: </h2>
                <h3>${prevPrice}</h3>
              </div>
            </div>
          </body>
        </html>
    `
  }