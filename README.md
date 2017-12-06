# Quizar

Noted quiz generator; for teachers and their students.

## How to use

The software has 3 accessible pages, which are the followings :

1. Quiz : 
   the user may choose a theme and be handled a quiz for which he will get a note once he validates the session.

2. Management :
   the user may create, modify or remove themes, questions and answers.

3. Import/Export : 
   the user may export the whole database and each question's associated image to a .ZAR archive (that is in fact a .ZIP archive), and import a .ZAR archive which would replace all data on the software.

Quizzar comes with two different versions :

* Admin : 
  the user has full access to the software, without any restriction.

* Student : 
  the user has only access to the quiz page and import/export page.

## Can the students falsifies their results ?

The JSON database that is used by the software is heavily encrypted with AES method; it cannot be viewed for cheating purposes.

If a student has the required knowledge to decrypt the database (which can be easily done since the encrypt key is viewable inside the source codes), then perhaps he doesn't even need to use that software.

## Why is the software in french ? Is there any english version ?

Quizar was made to help french student work for their final exams; and an english version is not planned as of today.

As the software is under a MIT license, you are free to translate it, compile it and redistribute your own binary.

## How was Quizar created ?

The software is developed using Node.JS, Vue.JS, Electron, SASS, Bootstrap; packages along with their dependencies are viewable at the package.json file.

It was tested, therefore considered stable on the following operating systems :

* Windows 7+
* GNU/Linux

# Contact

You can contact me at my current public email address : daniel.medina11@protonmail.com
