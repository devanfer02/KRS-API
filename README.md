### Port : 5000
### Use nodemon instead of node in script start when developing locally

## What is KRS API? 
KRS API is an Application Programming Interface that takes Indonesian Study Plan Card System as a reference. <br/>
It has Course foldier with each major course<br/>
body.json is an example of the body request, you can use it as your reference to create and send api request in postman <br/>
This project use Hapi framework because this project is also inspired from my dicoding submission <br/>

### Link and Queries : 
- localhost:5000/student
- localhost:5000/student?krs=Mata Kuliah Tanpa Quote String
- localhost:5000/student?prodi=Prodi Tanpa Quote String
- localhost:5000/student?prodi=Prodi Tanpa Quote String&krs=Mata Kuliah Tanpa Quote String
- localhost:5000/student/nim <br/>

Lihat route untuk lebih detailnya 
<br/>
To run this locally, please follow the following instructions : 

## Installing Package and Dependancy
### make sure you run the command in the same folder as the downloaded project
Command line for installing : 
- npm install

If the above command line doesn't install all dependencies, type the following command :
- npm init --y
- npm install @hapi/hapi
- npm install nanoid@3.x.x
- npm install nodemon
- npm install eslint --save-dev
- npx eslint --init

## Eslint Configuration 
- Style Guide -> Standard Style
- Config file -> JSON
- Framework -> None
- Run code -> Node
- Module Project -> CommonJS
