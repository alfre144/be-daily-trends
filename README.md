# be-daily-trends

This project is a news aggregation API that retrieve the 5 top news/articles 
from 'EL PAIS' & 'EL MUNDO' trough scraping and also allow manual creation news/content. 

## Architecture 

The project follows a Clean Architecture with the following layers: 

- ** Domain: ** Contain business entities and interfaces for repositories and use cases. 
- ** Application: ** Implementation of the use cases defined in the domain, orchestrating the business logic. 
- ** Infrastracture: ** Contain the implementation for the database, the scraper and app config.
- ** Presentation: ** Exposes the API through Express controllers and routers.

## Local Development Env

- Node.js: v22.11.0
- npm: v11.2.0
- Typescript: v5.8.3
- MongoDB: v8.0.9

## Env config 

- `MONGODB_URI`: Connection string for your MongoDB database. Example format:
  ```
    mongodb://<username>:<password>@<host>:<port>/<database>?authSource=admin
  ```
  Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your actual MongoDB credentials and details.
- `MAX_NEWS`: The maximum number of news articles to process or display. Default value: `5`.
- `SCRAPERS`: A comma-separated list of scrapers to use. Example: `elpais,elmundo`.

## Steps to run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Environment Variables**:
   Create a `.env` file in the root with:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://...
   ```

3. **Start the Database** (if using Docker):
   ```bash
   docker-compose up -d
   ```

4. **Build the Project**:
   ```bash
   npm run build
   ```

5. **Run the Server**:
   ```bash
   npm run start
   ```

   The server will be available at [http://localhost:3000](http://localhost:3000).

6. **Run in Development Mode**:
   ```bash
   npm run dev
   ```

7. **Run Tests**:
   ```bash
   npm run test
   ```
