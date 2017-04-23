from app import app
from flask import request
import sqlite3 as sql


@app.route('/input', methods = ['GET'])
def input():
	# get query vars
	fuellevel = request.args.get('fuellevel')
	errno = request.args.get('errno')
	speed = request.args.get('speed')
	fuelrate = request.args.get('fuelrate')
	enginetemp = request.args.get('enginetemp')


	# process query vars for insertion
	speed = speed*.621371
	fuelrate = (1/(fuelrate*.26417217685))*speed
	enginetemp = enginetemp*(9/5) + 32

	dbEntry = (fuellevel, errno, speed, fuelrate, enginetemp)
	
	#db
	conn = sql.connect('obdbuddy.db')
	cur = conn.cursor()
	cur.execute("INSERT INTO vehicle_data (fuellevel, errno, speed, fuelrate, enginetemp) VALUES (?,?,?,?,?)",
		dbEntry)
	conn.commit()
	conn.close()
	return

	



if __name__ == '__main__':
    app.run(debug=True)
