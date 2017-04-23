CREATE TABLE vehicle_data(
    fuellevel       INT     NOT NULL,
    errno           TEXT    NOT NULL,
    speed           INT     NOT NULL,
    fuelrate        INT     NOT NULL,
    enginetemp      INT     NOT NULL,
    checked			INT		DEFAULT 0,
    timestamp		DATETIME DEFAULT CURRENT_TIMESTAMP
);
