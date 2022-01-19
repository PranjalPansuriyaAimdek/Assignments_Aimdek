

----------AGGREGATE FUNCTIONS----------
Select Max(Salary) from Employee
Select min(Salary) from Employee
Select Avg(Salary)  from Employee
Select Sum(Salary) from Employee
Select COUNT(Salary) from Employee


---------TCL COMMANDS---------------------

SELECT * FROM Employee

BEGIN TRANSACTION
UPDATE Employee
SET EmployeeName='PRUTHVI SHOW' WHERE EmployeeID=2

Commit TRANSACTION 
Rollback TRANSACTION


-----------CREATE USER-------------------
CREATE LOGIN Pranjal with PASSWORD = 'pranjal'

CREATE USER PRANJAL FROM LOGIN Pranjal


-----Check permissions of User 'Pranjal'-------------
EXECUTE AS USER = 'PRANJAL'
SELECT * FROM fn_my_permissions ('Company','Database')



---------GRANT/REVOKE---------

--grant permission to 'pranjal' for selection on employee
GRANT SELECT on Employee to Pranjal

--grant permission to 'pranjal' on whole DATABASE 'Company'
GRANT CONTROL ON DATABASE :: Company TO Pranjal 

--revoke permission to 'pranjal' for selection on employee
REVOKE SELECT ON Employee from Pranjal


--revoke permission to 'pranjal' on whole database
REVOKE CONTROL ON DATABASE :: Company to Pranjal




