Sample of run a task periodically when certain check command failed
```bash
/etc/cron.d/apan
9,39 6-16 * * * root /root/check2run.sh

/root/check2run.sh
#!/bin/bash

docker ps -a|grep Exited; if [ $? -eq 0 ]; then cd /home/ec2-user/devlake/;docker-compose up -d; elif [ $? -eq 1 ]; then echo "Looks OK"; else echo "Failed with a different exit code: $?."; fi

```

Mount a disk in fstab file
```bash
nano -w /etc/fstab
... ...
/swap.img       none    swap    sw      0       0

/dev/sdb1  /opt  ext4  defaults  0  2
```

Get IMPORTANT constance
```bash
# get PI
echo "scale=100; 4*a(1)" | bc -l

# get E
echo "scale=100; e(1)" | bc -l
```

Say there are a few lines like this in log file:   /var/log/zabbix/zabbix_server.log
```bash
1061:20230605:175232.950 cannot send list of active checks to "11.12.13.14": host [ABC] not found
1065:20230605:182403.690 cannot send list of active checks to "21.22.23.24": host [XYZ] not found
```
How can I grep ALL of them
```bash
grep 'host \[.*\] not found' /var/log/zabbix/zabbix_server.log
```

Verify TXT record with dig
```bash
dig TXT _D8E99F7B564DB09BE85F65861BB81679.subdomain.domain.com @8.8.8.8
```

Check specified domain to see the expiration date
```bash
DNS=www.hp.com;echo | openssl s_client -servername $DNS -connect $DNS:443 2>/dev/null | openssl x509 -noout -enddate | sed -e 's#notAfter=##'
```

Make a ssh tunnel for postgres database access
```bash
ssh -i id_rsa ec2-user@i-XXXXXXXXXXXX -L 5432:database-prod.XXXXXXXXX.us-west-2.rds.amazonaws.com:5432

Connect to the database from localhost
psql -h localhost -U username databasename
```

One line command to deploy changes to SLS(Serverless) stack
```bash
sls s3sync && sls invoke -f setup
```

Open port 80 for IP 11.12.13.14 with iptables
```bash
iptables -I INPUT -p tcp -s 11.12.13.14 --dport 80 -j ACCEPT
Saved in iptable is
-A INPUT -s 11.12.13.14/32 -p tcp -m tcp --dport 80 -j ACCEPT
```

Set ssh key for git remote set as ssh way
```bash
eval "$(ssh-agent -s)"
ssh-add PRIVATE_KEY_FOR_GITHUB
# test it
ssh -T git@github.com
Hi $THE_USER_NAME! You've successfully authenticated, but GitHub does not provide shell access.
```

Sort the current directory disk usage with depth 1 level down
```bash
du . -h --max-depth=1 | sort -h
```

Sort the current directory disk usage with depth 1 level down, VERY complicated version
```bash
du . --max-depth=1 -x -k | sort -n | awk 'function human(x) { s="KMGTEPYZ"; while (x>=1000 && length(s)>1) {x/=1024; s=substr(s,2)} return int(x+0.5) substr(s,1,1)"iB" } {gsub(/^[0-9]+/, human($1)); print}
```

Sleep randomly between 0 to 3 seconds
```bash
time sleep $(($RANDOM % 3))
```

Draw a SOLID line across the entire width of the terminal
```bash
for ((i=0; i<$(tput cols); i++)); do echo -e "_\c" ;done
```

Sample of search string and do something or NOT do something, if or while sample
```bash
if [ `tail -99 picked.list|grep "ent" > /dev/null;echo $?` = 0 ];then echo 'Found';else echo 'Nope';fi

while [ `tail -99 picked.list|grep "ent" > /dev/null;echo $?` = 0 ];do SOMETHING;done
```

Allow ONLY subnet 192.168.0.0/24 access port 22 (ssh), and drop ALL others
```bash
iptables -I INPUT -p tcp ! -s 192.168.0.0/24 --dport 22 -j DROP
```

Add user, one line command
```bash
USER=USER_ID; \
useradd --create-home $USER; \
rsync -razxcv /etc/skel/ $USER/; \
chown -R $USER:users $USER/ && passwd $USER
```

Count the disk usage and sort at the current directory
```bash
du -h|grep [[:digit:]]G|sort -k1 -n
```

Check hard disk performance
```bash
hdparm -Tt /dev/sda
```

How do I know where are SSL certificates located? for Apach2 as an example
```bash
grep -Rn SSL /etc/apache2/|grep -v \#|grep "/ssl/"
```
