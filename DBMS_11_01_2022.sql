
-- JobRole TABLE

CREATE TABLE JobRole
(
	JobRoleID int Primary Key,
	JobRoleName varchar(30) Not NULL UNIQUE
)

INSERT INTO JobRole
VALUES
(1,'Software Engineer'),
(2,'DevOps Engineer'),
(3,'Graphic Designer'),
(4,'Frontend Developer'),
(5,'Backend Developer'),
(6,'Fullstack Engineer'),
(7,'Intern'),
(8,'Project Manager'),
(9, 'Junior Software Developer'),
(10, 'CEO')


--Client Table

CREATE TABLE Client
(
	ClientID int Primary Key,
	ClientName varchar(30) Not NULL UNIQUE,
	Country varchar(20)
)

INSERT INTO Client
VALUES
(1,'Cillian morphy', 'London'),
(2,'George Robert' ,'Ontario'),
(3,'bogota Andress' ,'Berlin'),
(4,'Asmy Palermo' , 'Jamaica'),
(5,'Jessy Pole' , 'New York'),
(6,'cap jhonson' , 'Ontario'),
(7,'Cape good', 'New York')



-- Employee Table

CREATE TABLE Employee
(
	EmployeeID int PRIMARY KEY,
	EmployeeName varchar(40),
	MobileNo varchar(10),
	JobroleID Int FOREIGN KEY REFERENCES JobRole(JobRoleID),
	ClientID INT FOREIGN KEY REFERENCES Client(ClientID)
)

INSERT INTO Employee
VALUES
(1,'Nihar Vekariya','9833728394', NULL, 3),
(2,'Jasmin shah','7466288493', 2, NULL),
(3,'Rushi Pandya','8366284029', 5, 7),
(4,'Monal Roy','9186381911', 7, 1),
(5,'Hetali Javiya','9119171361', NULL, 8),
(6,'Mohan Malaviya','9173179131', 10,5),
(7,'Ashutosh Gohel','8131931813', NULL, NULL),
(8,'Mahek Raj','9232387729', NULL, 2),
(9,'Bansi Hirapara','6301281831', 5, 4)
(10,’Raj Radadiya’,’7361768181’,4,NULL),
(11,'Viral shah','7463364892',3,2),
(12,'Nirali Savaliya','7462362892',NULL,1),
(13,'Rajvi sonani','7326764892',4,2)


--Inner Join between two tables

Select EmployeeName,MobileNo,ClientName from Employee
Inner join Client ON Employee.ClientID = Client.ClientID

--Inner join between three table

Select EmployeeName,MobileNo,ClientName,JobRoleName from Employee
Inner join Client ON Employee.ClientID = Client.ClientID
Inner join JobRole ON Employee.JobRoleID = JobRole.JobRoleID


--Left join between Employee,Client

Select EmployeeName,ClientName
from Employee
LEFT JOIN Client on Employee.ClientID = Client.ClientID

--RIGHT JOIN between Employee,JobRole

Select EmployeeName,JobRoleName
from Employee
RIGHT JOIN JobRole on Employee.JobroleID = JobRole.JobRoleID


--FULL JOIN between Employee,Client
Select EmployeeName,ClientName
from Employee
FULL JOIN Client on Employee.ClientID = Client.ClientID









--STORED PROCEDURES


-- procedure to get employees

create procedure sp_getEmployees
as
begin
Select * from Employee
End

-- procedure to get employees who have no client assigned

create procedure sp_getEmployee_withnullclientID
as
begin
Select EmployeeName from Employee
where Employee.ClientID IS NULL
End

-- procedure to get details of specific employee (INPUT PARAMETERS)

create procedure sp_getSpecificEmployee
	@EmployeeName varchar(30)
as
begin
Select EmployeeID,EmployeeName,MobileNo from Employee
where Employee.EmployeeName = @EmployeeName
End


-- procedure to get the numbers of employees having no clients (Output Parameters)

Create procedure sp_getEmployeeWithNoClient
	@Count int OUTPUT
AS
BEGIN
Select @Count = Count(EmployeeID) from Employee
Where ClientID IS NULL	
END

Declare @Count_new INT
EXEC sp_getEmployeeWithNoClient @Count = @Count_new OUTPUT
Select @Count_new as ‘Total_Employee_With_No_Client’





--VIEWS

-- view to get all employee having a client
 
CREATE VIEW [view_getEmployeeHavingClient]
AS
SELECT EmployeeID,EmployeeName,MobileNO,ClientName
From Employee
Inner Join Client on Employee.ClientID = Client.ClientID
Where Employee.EmployeeName IS NOT NULL

select * from view_getEmployeeHavingClient




-- Error Handling

BEGIN TRY
	SELECT * from Employee
	where EmployeeName = 0 
END TRY

BEGIN CATCH
	select
	Error_Message() as ErrorMessage;
END CATCH






