onnect to it with ssh right after pub key was sent
```bash
ssh -i id_rsa ec2-user@i-XXXXXXXXXXXX

Required to have ~/.ssh/config has entries like these:
# SSH over AWS Systems Manager Session Manager
  host i-* mi-*
  ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --profile=PROFILE --region=us-west-2 --parameters 'portNumber=%p'"
```

Sync current directory to S3
```bash
export AWS_PROFILE=ratox;aws s3 sync . s3://alex.eboy.work/ --delete
```

List AWS specific region all running instance public IPs
```bash
aws --profile $MY_PROFILE --region us-west-2 --output json ec2 describe-addresses | jq -r '.Addresses[].PublicIp
```
