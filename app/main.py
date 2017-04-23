from app import app 
from flask import request, jsonify

my_timestamp = 0

@app.route('/input', methods = ['POST'])
def input():
    # This is the function that will first be handed the arduino data
    print(request.data)

@app.route('/receive', methods = ['GET'])
def output():
    """
    Route for front-end to get data. Check if there should be any alerts 
    and if so, indicate accordingly.
    """
        
    return_element = dict.fromkeys(['fuel', 'errno', 'speed', 'fuelrate', 'enginetemp'])
    return_data = []
    my_timestamp = 0;
    # query database for all times greater than my_timestamp
    for row in db.execute('SELECT * FROM vehicle_data WHERE timestamp > ', \
            my_timestamp, ' ORDER BY timestamp ASC'):
        return_element['fuel'] = row['fuel']
        return_element['speed'] = row['speed']
        return_element['fuelrate'] = row['fuelrate']
        return_data.append(return_element)

    return jsonify(results=return_data)

def gas_alert(gas_amount):
    """ 
    If the gas amoutn falls below the 20% threshold, alert accordingly.
    """
    if gas_amount < 50: 
        return True
    else: 
        return False

if __name__ == '__main__':
    app.run(debug=True)
