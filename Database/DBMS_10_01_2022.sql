create database Demo

create table Student
(
	StudentID int PRIMARY KEY,
	StudentName varchar(100),
	Age int DEFAULT 18,
	Email varchar(50),
)

Insert into Student values
(1, 'Pranjal', 23, 'pranjal@gmail.com'),
(2, 'Rushi', 20, 'rushi@aimdek.com'),
(3, 'Dipam', 18, 'dipam@yahoo.com'),
(4, 'Dev', 30, 'dev@gmail.com'),
(5, 'Rishi', 10, 'rishi@gmail.com'),
(6, 'Rahul', 18, 'rahul@yahoo.com')

Select * from Student

Select DISTINCT Age from Student

Select * from Student where StudentName = 'Pranjal'

Select * from Student where Email Like '%mail.com'

Select * from Student Order by StudentName

Select * from Student Order by StudentName Desc

SELECT  * from Student WHERE Email Not Like '%gmail.com'

Select Age,COUNT(*) from Student GROUP BY Age 

Alter Table Student 
Add MobileNo varchar(10)

update Student
SET MobileNo = '7635345267'
Where StudentName = 'Pranjal'

Delete from Student
Where StudentName = 'Rushi'




