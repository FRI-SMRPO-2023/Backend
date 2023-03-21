## Stories

### 30 - System Login

#### Wrong mail
email: adminacid@prisma.com 
password: 123456789012

#### Wrong password
email: admin@prisma.com 
password: 1234567890123

#### Correct info
email: admin@prisma.com 
password: 123456789012  

#### Last login info
You can see last login info when you login

=====================================
### 1 - User Creation

#### password too short
username: mzakelj  
name: Mark  
lastName: Žakelj  
email: mzakelj@prisma.com   
password: 12345678901
isAdmin: false  

#### password ok
password: 1  2345678901

#### username unique
try creating new user using the same username again, maybe change email and name    
email: roboto@prisma.com
it should fail

#### mail unique
try creating new use using the same mail, change username to    
username: noviuser

#### logout
logout and it should return to login screen

#### login trying the password with one space
email: mzakelj@prisma.com
password: 1 2345678901
it should fail
also you can show the password (eye button)

#### login trying the correct password with two spaces
password: 1  2345678901

Also explain you're using hashing and salt for saving passwords in the backend

#### No admin rights
Check, there is no admin panel, also trying API directly returns 403

#### Logout and login as admin again
email: admin@prisma.com 
password: 123456789012

======================================

### 4 - Dodajanje projekta










