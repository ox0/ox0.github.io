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
