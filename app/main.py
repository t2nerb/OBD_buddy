from app import app
from flask import request

@app.route('/input', methods = ['POST'])
def input():
	# This is the function that will first be handed the arduino data
	print(request.data)

if __name__ == '__main__':
    app.run(debug=True)
