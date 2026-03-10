\x on;
\pset pager on

DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;

CREATE TABLE departments (
  id serial UNIQUE NOT NULL,
  name varchar(100) UNIQUE NOT NULL,
  description varchar(100) NOT NULL,
  contact_info varchar(100) NOT NULL,
  image_path varchar(100) NOT NULL
);

CREATE TABLE faculty (
  id serial UNIQUE NOT NULL,
  name varchar(100) NOT NULL,
  bio varchar(100) NOT NULL,
  contact_info varchar(100) NOT NULL,
  department_id int NOT NULL REFERENCES departments(id),
  image_path varchar(100) NOT NULL
);

CREATE TABLE users (
  id serial UNIQUE NOT NULL,
  username varchar(30) UNIQUE NOT NULL,
  password varchar(30) NOT NULL
);
