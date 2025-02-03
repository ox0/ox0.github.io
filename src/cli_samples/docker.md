Docker pull, tag and push image to AWS ECR
```bash
docker pull arturn311/node_js_app
docker tag arturn311/node_js_app 123412341234.dkr.ecr.us-west-2.amazonaws.com/my-test:latest
aws ecr get-login-password --region us-west-2 --profile XXXXXX | docker login --username AWS --password-stdin 123412341234.dkr.ecr.us-west-2.amazonaws.com
Login Succeeded

docker push 123412341234.dkr.ecr.us-west-2.amazonaws.com/my-test:latest
```

Start a container with port mapping (HOST at 88, CONTAINER at 80)
```bash
docker run -d -p 88:80 nginxdemos/hello
# verifying
docker ps -a
curl localhost:88
```
