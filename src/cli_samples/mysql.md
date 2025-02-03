**Backup MySQL DB, oneliner**
```bash
DB="my-db-name"; mysqldump -u root -p $DB > ${DB}_$(date +%Y-%m-%d_%H-%M).sql
```

**Restore MySQL DB, oneliner**
```bash
DB="my-db-name"; mysql -u root -p $DB < ${DB}_yyyy-mm-dd_hh-mm.sql
```
