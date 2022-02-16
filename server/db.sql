
-- Login Credential Table
CREATE TABLE Login_Credentials(
	Login_Credential_id BIGSERIAL NOT NULL PRIMARY KEY,
	Email VARCHAR(255) NOT NULL,
	Username VARCHAR(255) NOT NULL,
	Password Varchar(255) NOT NULL
	);

--Inperasional messages table 
CREATE TABLE Insperational_Messages(
Insperational_Message_id BIGSERIAL NOT NULL PRIMARY KEY,
Insperational_Message VARCHAR(255)

);
-- Medical Info Table

CREATE TABLE Medical_Info(
Medical_Info_id BIGSERIAL NOT NULL PRIMARY KEY,
Any_Medication varchar(255) NOT NULL,
Medication_Description varchar(255) NOT NULL,
Insurance varchar(50)
);

-- Personal Information Table

CREATE TABLE Personal_Info(
Personal_Info_id BIGSERIAL NOT NULL PRIMARY KEY,
Login_Credential_ID_FK BIGINT REFERENCES Login_Credentials(Login_Credential_id),
Medical_Info_ID_FK BIGINT REFERENCES Medical_Info(Medical_Info_id),
First_Name VARCHAR(50) NOT NULL,
Last_Name VARCHAR(50) NOT NULL,
Pronoun VARCHAR(50) NOT NULL,
Phone_Number VARCHAR(50) NOT NULL,
Location VARCHAR(255) NOT NULL,
State VARCHAR(50) NOT NULL,
Area_of_Expertise VARCHAR(250) NOT NULL
);

-- Resources Table

CREATE TABLE Resources(
Resource_id BIGSERIAL NOT NULL PRIMARY KEY,
Personal_Info_FK BIGINT REFERENCES Personal_Info(Personal_Info_id),
Phone_Number VARCHAR(255) NOT NULL,
Website VARCHAR(255) NOT NULL,
Picture bytea, 
Location VARCHAR(255) NOT NULL,
State VARCHAR(50) NOT NULL,
Area_of_Expertise VARCHAR(255) NOT NULL
);


-- Resources and Personal Info table 

CREATE TABLE Resources_and_Personal_Info(
id BIGSERIAL NOT NULL PRIMARY KEY,
Personal_Info_FK BIGINT REFERENCES Personal_Info(Personal_Info_id),
Resources_Info_FK BIGINT REFERENCES Resources(Resource_id)
);
