#!/bin/bash
# Update the system and install Docker
sudo yum update -y
sudo amazon-linux-extras enable docker
sudo yum install -y docker
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Pull and run the Frontend Docker image
sudo docker pull harshmaisuri/cloudassignment1:latest
sudo docker run -d --name frontend-1 -p 80:3000 harshmaisuri/cloudassignment1:latest