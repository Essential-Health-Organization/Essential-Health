
CREATE TABLE Roles(
	Role_id BIGSERIAL NOT NULL PRIMARY KEY,
	Role_desc VARCHAR(255) NOT NULL
);

CREATE TABLE Login_Credentials(
User_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
Username VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Password VARCHAR(255) NOT NULL,
Activation_Status VARCHAR(20),
Deactivation_Date DATE,
UNIQUE(Username,Email),
Role_id_fk BIGINT REFERENCES Roles(Role_id)	
);


CREATE TABLE Insperational_Messages(
Insperational_Message_id BIGSERIAL NOT NULL PRIMARY KEY,
Insperational_message VARCHAR(255) NOT NULL
);

CREATE TABLE Personal_Info(
User_id uuid NOT NULL REFERENCES Login_Credentials(User_id),
First_Name VARCHAR(55) NOT NULL,
Last_Name VARCHAR(55) NOT NULL,
Pronoun VARCHAR(55) NOT NULL,
Occupation VARCHAR(55) NOT NULL,
Phone_Number VARCHAR(55) NOT NULL,
City VARCHAR(55) NOT NULL,
State VARCHAR(55) NOT NULL,
Zip VARCHAR(12) NOT NULL,
PRIMARY KEY (User_id)
);

CREATE TABLE Medical_Info(
Medical_Info_id BIGSERIAL NOT NULL,
User_id uuid NOT NULL REFERENCES Login_Credentials(User_id),
Any_Medication VARCHAR(20) NOT NULL,
Medication_Description VARCHAR(255) NOT NULL,
Insurance VARCHAR(255) NOT NULL,
PRIMARY KEY (Medical_Info_id,User_id)
);


-- Resources Table
CREATE TABLE Resources(
Resource_id BIGSERIAL NOT NULL,
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
Occupation VARCHAR(255) NOT NULL,	
PRIMARY KEY (Resource_id)
);

CREATE TABLE User_Saved_Resources(
Resource_id BIGSERIAL NOT NULL,
User_id uuid NOT NULL REFERENCES Login_Credentials(User_id),
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
Occupation VARCHAR(255) NOT NULL,	
PRIMARY KEY (Resource_id,User_id)
);

INSERT INTO insperational_messages(insperational_message) VALUES ('Insperational Message Number One');

INSERT INTO Login_Credentials(Username,email,password,activation_status) VALUES ('Bobby','bobby34@gmail.com','jello123','active');

--copy and past the uuid generated in Login_Credentials from when inserting User_id
INSERT INTO Personal_Info(User_id,first_name,last_name,pronoun,Occupation,phone_number,city,state,zip) VALUES ('b6b8cc0e-795a-4d8e-b99c-7a916e1721c1','Bob','Lee','He/Him','Computer Scientist','347-522-6321','Brooklyn','New York','11216');

INSERT INTO medical_info(User_id,any_medication,medication_description,insurance) VALUES ('b6b8cc0e-795a-4d8e-b99c-7a916e1721c1','Yes','Flovent','Fidelis');

INSERT INTO resources(title,fax,email,phone_number,description,website,picture,city,state,zip,Occupation) VALUES ('Laura Croft','347-227-1345','Laura@gmail.com','347-221-2510','this is a therapy for computer science','lauratherapy.com','','New York','New York','10001','computer science');

INSERT INTO User_Saved_Resources(User_id,title,fax,email,phone_number,description,website,picture,city,state,zip,Occupation) VALUES ('b6b8cc0e-795a-4d8e-b99c-7a916e1721c1','Laura Croft','347-227-1345','Laura@gmail.com','347-221-2510','this is a therapy for computer science','lauratherapy.com','','New York','New York','10001','computer science');

--ONLY ADD THIS after revision
-- cascading to delete in sequence and update in sequence
ALTER TABLE personal_info
ADD CONSTRAINT fk_login_personal FOREIGN KEY(user_id)
REFERENCES login_credentials(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE medical_info
ADD CONSTRAINT fk_login_medical FOREIGN KEY(user_id)
REFERENCES login_credentials(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_saved_resources
ADD CONSTRAINT fk_login_saved_resources FOREIGN KEY(user_id)
REFERENCES login_credentials(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

