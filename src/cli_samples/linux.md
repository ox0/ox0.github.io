**Add user, one line command**
```bash
USER=USER_ID;   useradd --create-home $USER;cd /home;rsync -razxcv /etc/skel/ $USER/;chown -R $USER:users $USER/ && passwd $USER
```
