**Add user, one line command**
```bash
USER=USER_ID; \
useradd --create-home $USER; \
rsync -razxcv /etc/skel/ $USER/; \
chown -R $USER:users $USER/ && passwd $USER
```

**Count the disk usage and sort at the current directory**
```bash
du -h|grep [[:digit:]]G|sort -k1 -n
```

**Check hard disk performance**
```bash
hdparm -Tt /dev/sda
```

**How do I know where are SSL certificates located? for Apach2 as an example**
```bash
grep -Rn SSL /etc/apache2/*|grep -v \#|grep "/ssl/"
```
