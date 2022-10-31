<div id="top"></div>

<!-- HEADER -->
<div align="center">
  <a href="https://github.com/Hnaa17/Backend2.git">
    <img src="https://user-images.githubusercontent.com/110190301/198864288-772ad053-52ae-4993-bf41-5e38009ac9d3.png" alt="Logo" width="200px">
  </a>
  
  <h3 align="center">Blanja App Backend</h3>

  <p align="center"> 
    Create a Node.js app for building Blanja RESTful APIs using Express.
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-built-with">Project Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Project Built With
This app was built with some technologies below:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
This is an example of how to list things you need to use the software and how to install them.
* [Node.js](https://nodejs.org/en/download/)

### Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](https://www.postgresql.org/)

### Installation
- Clone the Repo
```
git clone https://github.com/Hnaa17/Backend2.git
```
- Install Module
```
npm install
```
- Make a new database
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production
<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example
Create .env file in your root project folder.
```env
# main environment
PORT = 8000

# postgres database environment
DB_USERNAME = username
DB_HOST = localhost
DB_DATABASE = database
DB_PASSWORD = password
DB_PORT = 5432

# jwt environment
SECRETE_KEY_JWT = 

```
<p align="right">(<a href="#top">back to top</a>)</p>

## License
Distributed under the [MIT](/LICENSE) License.
<p align="right">(<a href="#top">back to top</a>)</p>