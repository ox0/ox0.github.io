Disable/remove cloud-init.service at Ubuntu 22.04.2 LTS
```bash
touch /etc/cloud/cloud-init.disabled
dpkg-reconfigure cloud-init   # uncheck everything except "None"
apt-get purge cloud-init
rm -rf /etc/cloud/ && sudo rm -rf /var/lib/cloud/
reboot
```
