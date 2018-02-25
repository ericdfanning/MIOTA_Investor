# Node/Express Crypto Currency IOTA Investment Tracker and Notifications Server

A really quick and easy server that will run in the background (as long as your computer is awake if you're running it on your computer) or on a hosted server, that checks the price of IOTA (MIOTA is the coins name) every minute and sends an email to yourself once every Friday with an earnings report. This is my free and easy way to imitate short term trading with a set amount of money and a predetermined loss/gain window.

To start using this, fork this project. 

Then click on "Clone or download" and copy the repository link. 

Open your terminal window on your computer and navigate to an area where you would like this project saved.

Type ```git clone [the repository url you copied]```. Example on next line.

It should look something like this, ```git clone https://github.com/ericdfanning/MIOTA_Investor.git```. Except instead of 'ericdfanning', it will show the name of your github profile.

Once it is done cloning, type ```cd MIOTA_Investor``` to go into the project folder.

If using node,type ```npm install``` to install all the dependencies this project needs in order to work.

# Initial Setup

Go to the file 'email.config.js' and enter the email name and email password for the email account that you would like to send your email notifications FROM. Don't worry, if you're only running this on your local machine, then only you will have the password on this server.

Once you've added your email and password, if you plan on commiting to github, you don't want your email and password to be saved along with the commit, so go into the file '.gitignore' and add ```email.config.js``` so that that file is ignored completely when you push to github. MAKE SURE TO DO THIS BEFORE YOUR FIRST COMMIT. 

Review line 5 in emailService.js to ensure the proper email service is listed for the email you are sending FROM. Then add the recipient emails to the array on line 22. 

'cronJob.js' is where the real work is done. Review that file with it's comments to see if and where you would like to make changes. Some changes you could make are adding GET request URL paths to get different crypto currencies, or changing the range in which you'd like to buy or sell.

Now you'll have to set up the mongo database in order to be able to save your transactions and have them persist across a server outage. For a great walk through on getting mongo installed, check out the following link by Jerry Krusinski and follow the instructions for "Installing MongoDB". Don't worry about the other sections because Mongoose is already installed and the database is ready to go. You just need it on your computer. [The missing MongooseJS getting started guide.]

Once you have Mongo installed on your computer, go to cronJob.js and uncomment lines 8-23. Your cash balance should be zero since you're starting this with an intial purchase. The total miota should be the number of miota coins you initially want to start with. The price bought should be the current market value of MIOTA when you start this program. Price sold should be zero since you haven't sold anything. And the worth is the total MIOTA you are starting with multiplied by the current market value. Now run ```npm start``` and watch the terminal until you see 
```********* FINISHED SAVING *********'``` print to the screen. Once you see it press control C (ctrl C) on your keyboard to stop the program. You uncommented the code and ran the program with this block because this sets the initial database values that you need in order to run the program day to day. Since this is a mock trading "platform", this sets up the initial "purchase". If it saved successfully by seeing the print out above, then go back and re-comment those lines so that they won't run. You could even delete them. 

Now if everything is filled in and you have it the way you want after following the above instructions then you can start the app by following the below instruction.

To start the server on your local machine, type ```npm start``` into your terminal window. If it starts without error it should say "Listening on port 8000". If it gives the error ```Error: listen EADDRINUSE :::8000```, then that means you already have another program running on port '8000'. You can either stop that other program, or change the port number in this app by going to server.js and changing the port number to any 4 digit number between 3000 - 40000.

Don't forget to keep this terminal window open. If you close it, it will stop the server and you will no longer get the emails.

# Email Service

An email will be sent every Friday at 5pm CST and contain the total worth of your initial investment and how many MIOTA you currently have. 

# Changing the email template

If you are comfortable with HTML, go ahead and change up the email template to display the data however you'd like. Or add more data to it to be more informed!

ENJOY!

[The missing MongooseJS getting started guide.]: https://github.com/jkrusinski/mongoose101
