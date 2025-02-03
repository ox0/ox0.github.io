Display ALL possible color (256) for current console
```bash
for i in {1..255};do echo -en "\e[38;5;${i}m";echo -n "$i ";done;echo
```

Usage of cat here file, it will add ANYTHING afterwords into FILE_NAME till a line with EOF only
```bash
cat > FILE_NAME << EOF
... ...
EOF
```

Create index.html file at current directory for HTTP access
```bash
tree -L 1 -I '.html|.php|.ico|zz' -T 'MyTitle' -H .|grep -B 999 'directories,'|sed 's|/">|/" target=_blank>|g' > index.html
```

Query openweathermap.org with API key (PVG and YVR)
```bash
curl -s "https://api.openweathermap.org/data/2.5/onecall?lat=31.22&lon=121.46&exclude=minutely,hourly,daily&units=metric&appid=MY_OPEN_WEATHER_MAP_API_KEY"|jq
LOC="lat=49.25&lon=-123.12"; curl -s "https://api.openweathermap.org/data/2.5/onecall?$LOC&exclude=minutely,hourly,daily&units=metric&appid=$APPID"|jq
```

Convert date to Unix time, and convert it back
```bash
date +"%s"
date -d @1738544871
```

Search JSON file with specific name(s) and value(s)
```bash
COUNTRY=$1;CITY=$2; jq -r ".[] | select(.country == \"$COUNTRY\" and .name == \"$CITY\")".coord city.list.json
```

Remove files that were modified 30 days ago at the current directory
```bash
find . -mtime +30 -type f -exec rm -rf {} \;
```

Write data to SDCard, useage of dd
```bash
dd if=<image> of=/dev/sdx bs=4M iflag=direct,fullblock oflag=direct status=progress
```

Display SSL expiration date for a domain
```bash
DNS=google.com;echo | openssl s_client -servername $DNS -connect $DNS:443 2>/dev/null | openssl x509 -noout -enddate
```

Kill all Zombie processes one-liner
```bash
ps axo state,ppid | awk '!/PPID/$1~"Z"{print $2}' | xargs -r kill -9
```

Generate one random IPv4 address
```bash
for i in a b c d; do echo -n $(($RANDOM % 256)).; done | sed -e "s/\.$//g"; echo
```

rsync from remote to local
```bash
rsync -chavzP --stats user@remote.host:/path/to/copy /path/to/local/storage
```

rsync from remote to local with non-standard ssh port
```bash
rsync -avz -e "ssh -p $portNumber" user@remote.host:/path/to/copy /local/path
```

My BASH template for any script with argument(s)
```bash
#!/bin/bash

if [[ $# -ne 2 ]]
  then
    echo -e "$0\n\tAAA_NAME ( sampleA )\n\tBBB_NAME ( sampleB )"
cat << EOF_USAGE
This script is to do WHATEVER ...
EOF_USAGE
    exit 1
fi
```

My .bashrc/.profile favorite
```bash
# 99+
export PS1="\[\e[31m\][\[\e[m\]\[\e[38;5;172m\]\u\[\e[m\]@\[\e[38;5;153m\]\h\[\e[m\] \[\e[38;5;214m\]\w\[\e[m\]\[\e[31m\]]\[\e[m\]\\$ "
# w - for current working directory, absolute FULL path from / (root)
alias rm='rm -fv' ll='ls -al ' gg='grep --color ' hh='history 33' nn='nano -w '

export LS_COLORS=${LS_COLORS}:'zz=04;31'
export EDITOR=nano
#eval "$(direnv hook bash)"
# 99+.
```

Rename all files in current directory
```bash
N=10;for i in $(ls);do N=$(( N += 1 ));echo $i $N;done	# dry-run
N=10;for i in $(ls);do N=$(( N += 1 ));mv $i $N;done
```

Write image to USB drive, sample of using dd
```bash
dd if=<image> of=/dev/sdx bs=4M iflag=direct,fullblock oflag=direct status=progress
```
