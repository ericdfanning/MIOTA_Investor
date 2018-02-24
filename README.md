# Node/Express Crypto Currency (default: IOTA) Notifications Server

A really quick and easy server that will run in the background (as long as your computer is awake if on localhost) or on a hosted server, that checks the price of iota (MIOTA or IOT) every minute and sends an email to yourself if the price has changed by the amount that you specify. i.e. I have mine currently set up, as with the default in this code, to only notify me if the price in IOTA changes by $1 either negative or positive. It should be noted that the starting amount will always be based ont he IOTA price from when you first run this program.

To start using this, fork this project. 

Then click on "Clone or download" and copy the repository link. 

Open your terminal window on your computer and navigate to an area where you would like this project saved.

Type ```git clone [the repository url you copied]```. Example on next line.

It should look something like this, ```git clone https://github.com/ericdfanning/IOTA_Tracker.git```. Except instead of 'ericdfanning', it will show the name of your github profile.

Once it is done cloning, type ```cd IOTA_Tracker``` to go into the project folder.

If using node,type ```npm install``` to install all the dependencies this project needs in order to work.

# Initial Setup

Go to the file 'email.config.js' and enter the email name and email password for any of your email accounts that you have and would like to send your email notifications FROM. Don't worry, if you're only running this on your local machine, then only you will have the password on this server.

Once you've added your email and password, if you plan on commiting to github, you don't want your email and password to be saved along with the commit, so go into the file '.gitignore' and add ```email.config.js``` so that that file is ignored completely when you push to github. MAKE SURE TO DO THIS BEFORE YOUR FIRST COMMIT. 

Review line 6 in emailService.js to ensure the proper email service is listed for the email you are sending FROM. Then add the recipient emails to the array on line 23. 

'cronJob.js' is where the real work is done. Review that file with it's comments to see if and where you would like to make changes. Some changes you could make are adding GET request URL paths to get different crypto currencies, or changing the range in which you'd like notifications i.e. from $1 to whatever you want.

Now if everything is filled in and you have it the way you want after following the above instructions then you can start the app by following the below instruction.

To start the server on your local machine, type ```npm start``` into your terminal window. If it starts without error it should say "Listening on port 8000". If it gives the error ```Error: listen EADDRINUSE :::8000```, then that means you already have another program running on port '8000'. You can either stop that other program, or change the port number in this app by going to server.js and changing the port number to any 4 digit number between 3000 - 9000.

Don't forget to keep this terminal window open. If you close it, it will stop the server and you will no longer get the emails.

# Changing the email template

If you are comfortable with HTML, go ahead and change up the email template to display the data however you'd like. Or add more data to it to be more informed!

ENJOY!
