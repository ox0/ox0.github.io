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
