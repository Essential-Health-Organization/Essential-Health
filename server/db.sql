
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
Login_Credential_ID_FK BIGINT NOT NULL REFERENCES login_credentials(login_credential_id),
Medical_Info_ID_FK BIGINT NOT NULL REFERENCES Medical_Info(Medical_Info_id),
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
Title VARCHAR(255) NOT NULL,
Fax VARCHAR(55),
Email VARCHAR(255) NOT NULL,
Phone_Number VARCHAR(55) NOT NULL,
Description VARCHAR(255) NOT NULL,
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


-- popullation of insperational_messages

INSERT INTO insperational_messages (insperational_message) VALUES ('testing 3');

--popullation of login_credentials

INSERT INTO login_credentials (email,username,password) VALUES ('philreggy@gmail.com','PhilReggy54','lol1234');

--popullation of medical_info

INSERT INTO medical_info (any_medication,medication_description,insurance) VALUES ('Yes','Flovent, Ventolin ','Anthom Blue Cross Blue Shield medicare');

-- population of personal_info

INSERT INTO personal_info (login_credential_id_fk,medical_info_id_fk,first_name,last_name,pronoun,phone_number,location,state,area_of_expertise) 
VALUES (1,1,'Phil','Reggy','He/Him','347-285-7739','Brooklyn','New York','Registered Nursing');

-- population of resources

INSERT INTO resources (title,fax,email,phone_number,description,website,picture,location,state,area_of_expertise)
VALUES ('Nursing Therapy','546-524-8891','NursingTherapy@gmail.com','205-221-6541','This is a therapy for Nurses','NurseTherapy.com','no picture available yet','New York','New York','Registered Nurse');

--population of resources and personal info table

INSERT INTO resources_and_personal_info (personal_info_fk,resources_info_fk) VALUES (1,1);


-- adding cascading to foriegn key personal info for the login_credentials foreign key
ALTER TABLE personal_info
ADD CONSTRAINT fk_login_personal FOREIGN KEY(login_credential_id_fk)
REFERENCES login_credentials(login_credential_id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- adding cascading to foriegn key personal info for the medical_info foreign key
ALTER TABLE personal_info
ADD CONSTRAINT fk_medical_personal FOREIGN KEY(medical_info_id_fk)
REFERENCES medical_info(medical_info_id)
ON DELETE CASCADE ON UPDATE CASCADE;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--New Tables


-- Roles Table

CREATE TABLE Roles(
	Role_id BIGSERIAL NOT NULL PRIMARY KEY,
	Role_desc VARCHAR(255) NOT NULL
);

-- Login Credentials
CREATE TABLE Login_Credentials(
Username VARCHAR(255) NOT NULL PRIMARY KEY,
Email VARCHAR(255) NOT NULL,
Password VARCHAR(255) NOT NULL,
Activation_Status VARCHAR(255),
Deactivation_Date DATE,
UNIQUE(Username,Email)
Role_id_fk BIGINT NOT NULL REFERENCES Roles(Role_id)	
);

--  Insperational Messages Table

CREATE TABLE Insperational_Messages(
Insperational_Message_id BIGSERIAL NOT NULL PRIMARY KEY,
Insperational_message VARCHAR(255) NOT NULL
);

-- Personal Information Table
CREATE TABLE Personal_Info(
Username VARCHAR(255) NOT NULL REFERENCES Login_Credentials(Username),
First_Name VARCHAR(55) NOT NULL,
Last_Name VARCHAR(55) NOT NULL,
Pronoun VARCHAR(55) NOT NULL,
Area_of_Expertise VARCHAR(55) NOT NULL,
Phone_Number VARCHAR(55) NOT NULL,
City VARCHAR(55) NOT NULL,
State VARCHAR(55) NOT NULL,
Zip VARCHAR(12) NOT NULL,
PRIMARY KEY (Username)
);

-- Medical Info Table
CREATE TABLE Medical_Info(
Medical_Info_id BIGSERIAL NOT NULL,
Username VARCHAR(255) NOT NULL REFERENCES Login_Credentials(Username),
Any_Medication VARCHAR(20) NOT NULL,
Medical_Description VARCHAR(255) NOT NULL,
Insurance VARCHAR(255) NOT NULL,
PRIMARY KEY (Medical_Info_id,Username)
);

-- Resources Table
CREATE TABLE Resources(
Resource_id BIGSERIAL NOT NULL,
Username VARCHAR(255) NOT NULL REFERENCES Login_Credentials(Username),
Title VARCHAR(255) NOT NULL,
Fax VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Phone_Number VARCHAR(50) NOT NULL,
Description VARCHAR(255) NOT NULL,
Website VARCHAR(255) NOT NULL,
Picture bytea,
City VARCHAR(50) NOT NULL,
State VARCHAR(50) NOT NULL,
Zip VARCHAR(12) NOT NULL,
Area_of_Expertise VARCHAR(255) NOT NULL,	
PRIMARY KEY (Resource_id,Username)
);

--------------------------------------------------------------------------

--Insert Insperational Message
INSERT INTO insperational_messages(insperational_message) VALUES ('Insperational Message Number One');

-- Insert into Login_Credentials

INSERT INTO Login_Credentials(username,email,password,activation_status) VALUES ('Bobby','bobby34@gmail.com','jello123','active');

-- Insert into Personal_Info
INSERT INTO Personal_Info(username,first_name,last_name,pronoun,area_of_expertise,phone_number,city,state,zip) VALUES ('Bobby','Bob','Lee','He/Him','Computer Scientist','347-522-6321','Brooklyn','New York','11216');

-- Insert into Medical_Info
INSERT INTO medical_info(username,any_medication,medical_description,insurance) VALUES ('Bobby','Yes','Flovent','Fidelis');

--Insert into resources 
INSERT INTO resources(username,title,fax,email,phone_number,description,website,picture,city,state,zip,area_of_expertise) VALUES ('Bobby','Laura Croft','347-227-1345','Laura@gmail.com','347-221-2510','this is a therapy for computer science','lauratherapy.com','','New York','New York','10001','computer science');