**rsync from remote to local with non-standard ssh port**
```bash
rsync -avz -e "ssh -p $portNumber" user@remote.host:/path/to/copy /local/path
```

**My BASH template for any script with argument(s)**
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

**My .bashrc/.profile favorite**
```bash
# 99+
export PS1="\[\e[31m\][\[\e[m\]\[\e[38;5;172m\]\u\[\e[m\]@\[\e[38;5;153m\]\h\[\e[m\] \[\e[38;5;214m\]\w\[\e[m\]\[\e[31m\]]\[\e[m\]\\$ "
# w - for current working directory, absolute FULL path from / (root)
alias rm='rm -fv' ll='ls -al ' gg='grep --color ' hh='history 33' nn='nano -w '

export LS_COLORS=${LS_COLORS}:'*zz=04;31'
export EDITOR=nano
#eval "$(direnv hook bash)"
# 99+.
```

**Rename all files in current directory**
```bash
N=10;for i in $(ls);do N=$(( N += 1 ));echo $i $N;done	# dry-run
N=10;for i in $(ls);do N=$(( N += 1 ));mv $i $N;done
```

**Write image to USB drive, sample of using dd**
```bash
dd if=<image> of=/dev/sdx bs=4M iflag=direct,fullblock oflag=direct status=progress
```
