## OBD Buddy

A travel companion for you and your vehicle. Supplementary to an Arduino device
that connects to your vehicle's OBD port. 

#### Setup
In order to run the software, you'll need to have Docker installed.

##### Instructions

1. Build the image with the supplied script:

	`$ ./build`

2. Launch the container on a local port:

	`$ docker run --rm --name OBD_buddy -it -p 80:80 OBD_buddy`

To kill the container, send a SIGINT (CTRL-C).
