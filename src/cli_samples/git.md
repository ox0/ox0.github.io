This also need to be set in the directory
```bash
cat .envrc
#!/bin/bash

git config user.email "alex.pan@shaw.ca"
git config user.name "ox0"
```

Set GitHub auto choose user when cd to the directory
```bash
Instead to use the normal ssh clone command:
git clone git@github.com:ox0/ox0.github.io.git

Use this one to specify the user:
git clone git@github-ox0:ox0/ox0.github.io.git

This way to specify the use, so if the use has setup in .ssh/config file, it will be chosen

```

Remove zz.txt from repo
add zz.txt into .gitignore file
```bash
git rm --cached zz.txt
git add -A && git commit -a -m 'update' && git push
```

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

