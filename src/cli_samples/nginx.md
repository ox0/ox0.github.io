Count and output Nginx zipped access log
```bash
zcat /var/log/nginx/access.log-*|awk '{print $1}'|awk '{a[$0]++}END{for(i in a){print a[i],i}}'|sort -k1 -r
```

Count how many hits from outside to Nginx server
```bash
grep -v '192.168.0.' /var/log/nginx/access.log|awk '{print $1}'|awk '{a[$0]++}END{for(i in a){print a[i],i}}'|sort -rn
```
