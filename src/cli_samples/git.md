Initial a repository / update an existing repository:
```bash
git clone XXX.git / git pull
```

One line command to do commit and push together after any changes made at local repository
```bash
git add FILE_NAME/. && git commit -a -m 'ANY_COMMENT' && git push
```

Check remote rpository on this local one
```bash
git remote -v
```

Set git remote http or ssh way
```bash
git remote set-url origin https://ox0@github.com/ox0/ox0.github.io.git
git remote set-url origin git@github.com:ox0/ox0.github.io.git
```

