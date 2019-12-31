# CoziTakehome

## Starting up
From the root directory run the command 'npm install' to receive the necessary node modules.  From the same console, run 'ng serve' to start up the Angular application, and navigate to localhost:4200 in a web browser.  With a second condole navigate to src/app/services.  Run 'node inquiries.api/js' to startup the NodeJS backend service, which will be listening on port 3000.  Please ensure that port 4200 and port 3000 are available if you are having issues reaching either the web page or contacting the service.  

## Technology Breakdown. 
This app was created by Melvin Gruschow as a takehome assignment for Cozi.  I am utilizing Angular 8.3, with a NodeJS 11.3.0 backend, with express 4.17.1 to manage HTTP requests.  I am also using the cors node package to allow for local HTTP requests to be self signed so that the server can actually respond in the first place, as well as the body-parser package to simplify my life when retrieving parameters from the POST request.  Finally, I'm using the built in File System module to write/read to my local NOSQL database (AKA my simple JSON file).

## Explaination
For this app I'm using a reactive form to generate an easy to manage front end template that has validation checking, and is easy to retrieve input from all at once after the form has been filled out.  I'm using flexbox to stack my input form and the output message, and media queries to stack the Selection area for the old inquiries.  Using some type safety on the front end, I pass the object back to my NodeJS backend via the HttpClient in Angular using a POST request, grab it, and save it to an array of Inquiries in my local JSON.  After this process has succeeded I return a success response and 200 status, and add the newly created Inquiry to a local array, to be used for display purposes.  If you were to restart the app the array of inquiries would populate itself with the already saved inquiries, which you can click on and populate the response message area. 

I left my app ambiguous enough to allow future developers to retrieve former inquiries and populate the reactive form in order to edit each entry individually, so long as you add the implementation of a unique ID on either the backend or the front end when saving to the database.  
