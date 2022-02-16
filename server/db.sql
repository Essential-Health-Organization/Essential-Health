
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