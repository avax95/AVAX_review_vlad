-- psql reviews < postSchema.sql

CREATE TABLE single_review (
  id BIGSERIAL UNIQUE,
  text VARCHAR(1000) NULL,
  date DATE NOT NULL,
  accuracy SMALLINT,
  communication SMALLINT,
  cleanliness SMALLINT,
  location SMALLINT,
  checkIn SMALLINT,
  value SMALLINT,
  score SMALLINT,
  userId INT NOT NULL,
  roomId INT NOT NULL,
  PRIMARY KEY (id)
);
		
CREATE TABLE user_info (
  id BIGSERIAL UNIQUE,
  userName VARCHAR(100),
  avatar VARCHAR(100),
  PRIMARY KEY (id)
);
		
CREATE TABLE rooms (
  id BIGSERIAL UNIQUE,
  roomName VARCHAR(100),
  totalNumberReviews SMALLINT NOT NULL,
  accuracy SMALLINT NOT NULL,
  communication SMALLINT NOT NULL,
  cleanliness SMALLINT NOT NULL,
  location SMALLINT NOT NULL,
  checkIn SMALLINT NOT NULL,
  value SMALLINT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE single_review ADD FOREIGN KEY (userId) REFERENCES user_info (id);
ALTER TABLE single_review ADD FOREIGN KEY (roomId) REFERENCES rooms (id);
