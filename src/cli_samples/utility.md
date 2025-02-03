Install direnv # convenient tools to set environment when you enter a directory
```bash
curl -sfL https://direnv.net/install.sh | bash

The direnv binary is now available in:

    /usr/local/bin/direnv

The last step is to configure your shell to use it. For example for bash, add
the following lines at the end of your ~/.bashrc:

    eval "$(direnv hook bash)"

Then restart the shell.

For other shells, see https://direnv.net/docs/hook.html
```
