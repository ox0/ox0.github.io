**List AWS specific region all running instance public IPs**
```bash
aws --profile $MY_PROFILE --region us-west-2 --output json ec2 describe-addresses | jq -r '.Addresses[].PublicIp
```
