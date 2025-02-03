Make current directory HTML web page with php (ONLY can view text files, sub-directory accessiable when L set 2 or more)
```bash
tree -H '.' -L 1 > index.html && php -S 192.168.56.11:8000 && rm -fv index.html
```
