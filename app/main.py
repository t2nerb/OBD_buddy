from app import app
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3 as sql


@app.route('/', methods  = ['GET'])
def index():
    print('EXAMPLE')
    return 'Yep'

@app.route('/input', methods = ['GET'])
def input():
    # get query vars
    fuellevel = request.args.get('fuellevel')
    errno = request.args.get('errno')
    speed = request.args.get('speed')
    fuelrate = request.args.get('fuelrate')
    enginetemp = request.args.get('enginetemp')

    """
    # process query vars for insertion
    speed = speed*.621371
    fuelrate = (1/(fuelrate*.26417217685))*speed
    enginetemp = enginetemp*(9/5) + 32
    """

    dbEntry = (fuellevel, errno, speed, fuelrate, enginetemp)

    #db
    conn = sql.connect('./obdbuddy.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO vehicle_data (fuellevel, errno, speed, fuelrate, enginetemp) VALUES (?,?,?,?,?);",
            dbEntry)
    conn.commit()
    conn.close()

    return 'SUCCESS'

@app.route('/receive', methods = ['GET'])
@cross_origin()
def output():
    """
    Route for front-end to get data. Check if there should be any alerts
    and if so, indicate accordingly.
    """

    return_data = []

    conn = sql.connect('./obdbuddy.db')

    # # query database for all times greater than my_timestamp
    # for row in conn.execute("SELECT * FROM vehicle_data ORDER BY timestamp DESC LIMIT 1;"):

    #     # Check for fuel level
    #     if row[0] < 20:
    #         return_data.append({'type': 'lowgas', 'data': row[0]})

    #     # Check for excessive speed
    #     if row[2] > 170:
    #         return_data.append({'speed': row[2]})

    cur = conn.cursor()
    cur.execute("SELECT * FROM vehicle_data WHERE checked = 0 ORDER BY timestamp DESC;")
    rows = cur.fetchall()
    cur.execute("UPDATE vehicle_data SET checked = 1 WHERE checked = 0;")
    conn.commit()
    conn.close()

    gas_check_data = gas_check(rows)

    if gas_check_data != {}:
    	return_data.append(gas_check_data)

    return jsonify(results=return_data)

def gas_check(rows):
	for row in rows: 
		if row[0] < 20:
			return {'type': 'lowgas', 'data': row[0]}

	return {}

# def gas_alert(gas_amount):
#     """
#     If the gas amoutn falls below the 20% threshold, alert accordingly.
#     """
#     if gas_amount < 50:
#         return True
#     else:
#         return False

if __name__ == '__main__':
    app.run(debug=True)
