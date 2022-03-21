# MM802-mini-project
## Data Visualization of Crime in Neighbourhood within Edmonton
This project looks at the data for criminal activity in neighbourhoods within Edmonton. The application is a React.js app. It takes user input for start and end date, the type of crime, and also the number of neighbourhoods. This allows the user to search for the month-wise total count of crimes of all neighbourhoods in Edmonton, the N highest and lwest crime count neighbourhoods, and the Top-N neighbourhoods with the highest crimes to populationration, and the most frequent crime type of each neighbourhood. Google Maps is used to show the map with the crime information of neighbourhoods. Also, a bar graph displays the data of the amount of crime over months in the neighbourhood. 

This project uses ReactJS library, d3.js library, and Material UI for the front-end. Flask for the back-end. The database used is Sqlite3. A Google Map API is used to showcase the map. 

To start this project, you need to first download react.js and then npm in command prompt. Then, npm start the application at the folder directory in command prompt. Then, you can select input to display as data visualization. 

Requirements:
react.js
npm
python

### To run the client side:
1. Go to the MM802-mini-project folder by running "cd MM802-mini-project"
2. Run "npm start"
3. Open your browser and navigate to your local host 'http://localhost:3000/'
### To run the server side: 
1. Go to the server side folder by running 
    "cd flask-server"
2. Create and activate a virtual environment named .venv
    for Linux
    sudo apt-get install python3-venv  
    python3 -m venv .venv
    source .venv/bin/activate

    for macOS
    python3 -m venv .venv
    source .venv/bin/activate

    for Windows
    py -3 -m venv .venv
    .venv\scripts\activate
2. Install the required library by running 
    python -m pip install flask
    pip install pandas 
    pip install Flask-Cors   
3. Exporting the FLASK_APP environment variable by running
    export FLASK_APP=server  

2. Run "flask run --port=3003" to run flask server on port 3003
### 