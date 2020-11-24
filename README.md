# stencil v2.0.0
A web engine for visualizing and sharing life science datasets

## Documentation

Installation:

1. Start mongo db server.
   
2. Download source code: 

   ```
   git clone https://github.com/qisun2/stencil2.git
   ```

3. Install dependencies.

   ```
   cd stencil2/backend
   npm install
   
   cd ../frontend
   npm install
   
   cd ..
   ```

4. Configure the web site.

   a. stencil2/backend/.env

   DB_HOST="localhost" // Mongo db host
   DB_NAME="testDB"    // Mongo db database name
   API_PORT="8081          // API port name

   

   b. stencil2/frontend/.env

   PORT="3000"             // frontend port number

   

   c. stencil2/frontend/src/Config.js

   apiURL: "http://stencil.biohpc.cornell.edu:8081"    // URL of the backend server
   samplesEndpoint: "/samples",       // api endpoint for retrieve sample list (deprecated)
   librariesEndPoint: "/libraries",		// api endpoint for retrieve library list
   libraryPageEndPoint: "/libraries/dbid",   //api endpoint for retrieve a library based on db id
   trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl=" //genome growser URL prefix


3. Start the backend and front end server.

   ```
   screen
   
   cd stencil2/backend
   
   npm start
   
   #press ctrl-a c to switch screen
   
   cd stencil2/frontend
   npm start
   ```

4. Post example data.

   Modify the postData.py and postLibrary.py located in stencil2/backend/utils.

   Replace the URL from "http://localhost/samples" to appropriate backend URL.

   ```
   cd stencil2/backend/utils
   
   python postData.py ../sampleData/example.json
   
   python postLibrary.py ../sampleData/example_lib.json
   ```

   

   

5. Open browser

   backend url:  http://stencil.biohpc.cornell.edu:8081

   frontend url: http://stencil.biohpc.cornell.edu:3000