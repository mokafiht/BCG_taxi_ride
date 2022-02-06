DROP TABLE IF EXISTS ride;

CREATE TABLE ride (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  distance REAL NOT NULL,
  startTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  duration INTEGER NOT NULL
);

INSERT INTO ride (distance ,startTime,duration)
VALUES( 2.0,	'2020-06-19T13:01:17.031Z' ,9000);

INSERT INTO ride (distance ,startTime,duration)
VALUES( 1.0,	'2020-06-19T12:01:17.031Z' ,6000);

INSERT INTO ride (distance ,startTime,duration)
VALUES( 5.0,	'2020-06-19T14:01:17.031Z' ,7000);

INSERT INTO ride (distance ,startTime,duration)
VALUES( 5.0,	'2020-06-19T14:11:17.031Z' ,4000);