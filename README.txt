
Created by Thomas Wood
Project started November, 2018
Still a work in progress

Intended to be a web app to run on the Skishop server for use in the Service Department for ski binding mount checkins. Started as a final project for the free course CS50, taken through EDX. There are certain initialization lines that have been directly copied from source files to previous CS50 projects. I did my best to comment these in the files.

In the projects current state, it is missing a lot of intended functionality. The ultimate goal would be to almost eliminate the need for handwriting on tickets and allow a printed form to be input directly into the Wintersteiger Speedtronic. The form would take input through an iPad with an attached keyboard. I would also like to store the recorded output from the Speedtronic digitally. This is MUCH farther down the line. More pressing is the need to allow the user to easily go back and forward through the input pages, create a more user friendly UI void of any bugs, and add in more security checks. I would also like to populate the equipment list from other sources, including the indemnification list. As it stands, the equipment side is wide open for error. However, the equipment page should be filled in by a properly trained technician.

I realize that the chances of Skishop actually taking this on are slim. This is simply a great project to learn and
pretend I'm applying skills to a real life situation.

Requirements:
    Flask
    Flask-Session
    Bootstrap
    Internet connection for images (will have static images soon)
    python3


Files included:
    application.py
    helpers.py

Known issues:
    Findcustomer does not work if the name is not an EXACT match. Will need to filter inputs.
    There are extremely limited security checks server side.
    Code needs to be refactored. Especially the JavaScript files. Ran into issues with import/export and web security. Little over my head.
    Images should be static files instead of web urls and they should be our own content.
