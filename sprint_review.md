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

#### Create new project as admin
name: new project
description: This is just a mocking description
users: neki doloci

#### Create new project with the same name
name: new project
description: a new description
users: same
it should fail

=========================================
### 8 - Adding user stories

go to the first project (test1 - you are a product owner)
create a new story

#### create a new story
name: new simple story
description: description mockup
priority: ShouldHave
businessValue: Medium
status: ProductBacklog
acceptanceCriteria: this must work, but this also

#### try creating a story with the same name
it should fail and notice the user

===========================================
### 6 - starting new sprint
logout and login as scrum master

developerka@prisma.com
123456789012

select project "test1"

create a new sprint:

name: snailing,
startDate: 2024-03-01,
endDate: 2024-04-01,
speed": 20

#### overlapping dates
try creating a new sprint with overlapping dates:
it should fail (notice to the user)

try new sprint, change year to 2025

#### dates in the past, or start date after end date
start date after end date -> should fail
start date in the past -> should fail

#### speed should be positive integer
try
speed: -1
it can't be done

====================================
<!-- ### 14 - adding tasks to user stories
select first project, the first story and assign a new task

description: false description,
timeEstimation: PT10H,
status: Unassigned -->


wont have this time --> special section : DONE
imena - case insensitive : DONE
sprints - vikendi: DONE
sprint velocity - can be null (future sprints) : DONE
suggest sprint name
current sprint - can't change date
task time estimation - show its in hours
task can be created unassigned: DONE
sum of all hours for tasks in the story
delete tasks: DONE
















