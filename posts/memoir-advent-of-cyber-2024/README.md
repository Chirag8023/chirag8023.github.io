#### Just few notes from all the 24 challenges

## 1. OPSEC ( Purple Teaming )
- Downloaded file from YouTube-to-MP3 .
- Run `file` command and uncover a Windows shortcut.
- Look at it's metadata with `Exiftool`.
- In it we found a PowerShell command downloading a remote script.
- A unique code signature in the script help us to track the person on GitHub and revealed the attacker's identity. 
```
Commands & Tools Used : Find, Exiftool, Github.
```  
## 2. Log Analysis ( Blue Teaming )
- Start looking into security logs of different timestamps in Elastic SIEM.
- Found some encoded PowerShell commands running.
- There found an encoded PowerShell command executed on compromised systems.
- Decode it with CyberChef, it was just a update command.
```
Commands & Tools Used : Elastic SIEM, CyberChef.
```
## 3. Log Analysis ( Purple Teaming )
- In Kibana we look at some logs of `frostypines`. After adjusting few filter we found some trace (path and unusual ip) of web shell.
- Then because of weak/default credentials we able to logged in as admin on that website.
- Then we find that same file upload vulnearability in the image upload where we uploaded a php file that execute commands on server.
```
Commands & Tools Used :  ELK (Elasticsearch, Logstash, and Kibana), ls, cat.
```
## 4. Atomic Red Team ( Purple Teaming )
- Recreated MITRE ATT&CK technique `T1566.001 Spearphishing` using the Atomic Red Team library. 
- Looked into Sysmon logs for emulated attack, found a PowerShell command creating a file.
- Found technique for `a command and scripting interpreter on Windows command shell`.
- Now for technique `T1059.003 Command and Scripting Interpreter: Windows Command Shell` we iterate through each test until a file is created and we found our flag.
```
Commands & Tools Used : Atomic Red Team Library, Sysmon.
```
## 5. XXE ( Red Teaming )
- On a wishlist website first we found a page `/wishes/wish_1.txt` that possibly admins use to see different wishes submited by users.
- Then we used the `BurpSuite` to found that wish is submitted as XML to `/wishlist.php`.
- XXE(XML external entity) might be present here so we put `<!DOCTYPE foo [<!ENTITY payload SYSTEM "/var/www/html/wishes/wish_1.txt"> ]>` as external entity and `&payload;` in XML request & get access to admin only data.
```
Commands & Tools Used : Burp Suite.
```
## 6. Sandboxes ( Blue Teaming )
- In a VM we run YARA rules to detect malware.
- After detection, we use a obfuscated version which used encoded PowerShell commands, but it remained identifiable through FLOSS and Sysmon logs.
```
Commands & Tools Used : YARA, Sysmon, CyberChef, FLOSS.
```
## 7. AWS Log Analysis ( Blue Teaming )
- Analyzed Amazon CloudTrail and RDS logs using `jq` and `grep` with different filters to identify the individual responsible for modifying the QR code on the donation website.
```
Commands & Tools Used : JQ, grep.
```
## 8. Shellcodes ( Purple Teaming )
- Used msfvenom, we generate a shellcode.
- We put the shellcode into memory using a powershell script to establish a reverse shell.
```
Commands & Tools Used : msfvenom, nc.
```
## 9. GRC ( Blue Teaming )
- Performed Risk Assessments based on the questions answerd by different vendors to choose the one with lowest risk.

## 10. Phishing ( Red Teaming )
- Used `Metasploit Framework` to create a malicious macro.
- Sent it through familiar looking email.
- We were using `Metasploit Framework` to listen to incoming connection.
- When the macro file opend we got reverse shell to the target system.
```
Commands & Tools Used : Metasploit Framework.
```
## 11. Wi-Fi attacks ( Red Teaming )
- With `iw` set our wifi into monitor mode.
- Used `airodump-ng` to scan for nearby networks.
- Sent deauth packets to specific BSSID then capture the 4 way handshake into a file.
- Run dictionary attack on the captured handshake file using `aircrack-ng` to get the password.
```
Commands & Tools Used : iw, airodump-ng, aircrack-ng, aireplay-ng.
```
## 12. Web timing attacks ( Red Teaming )
- A website with possibility of `Time-of-Check to Time-of-Use (TOCTOU)` flaw, we intercepted money transfer request in Burp Suite. 
- Duplicate it in Repeater and sending multiple simultaneous requests using last-byte sync to exploit the race condition & successfully transfer more money than account's total balance.
```
Commands & Tools Used : Burp Suite.
```
## 13. Websockets ( Red Teaming )
- Intercept the WebSocket traffic of a car tracking website with `BurpSuite`.
- Manipulate the `userId` of WebSocket messages to track other's car.
- Changed same parameter for chat traffic to send message in live chat as different user.
```
Commands & Tools Used : Burp Suite.
```
## 14. Certificate mismanagement ( Red Teaming )
- First we did `local dns resolution` using `/etc/hosts` file to avoid trace in dns logs.
- Used burpsuite as intermidiate proxy to listen to http traffic and get user credentials of a website using self-signed certificates.
```
Commands & Tools Used : Burp Suite.
```
## 15. Active Directory ( Blue Teaming )
- With a suspected breach of Active Directory, analyzed user logins and activities, reviewed PowerShell history, and identified maliciously installed GPOs `(Group Policy Objects)`.
```
Commands & Tools Used : Windows Event Viewer.
```
## 16. Azure ( Red Teaming )
- Used Azure CLI to identify suspicious users, track their activities.
- Examined group memberships, check for suspicious groups.
- Check for assigned roles and access permissions.
```
Commands & Tools Used : Azure CLI.
```
## 17. Log analysis ( Blue Teaming )
- Used Splunk to view CCTV logs and web logs.
- Extracted custom fields, parsed the logs with regular expressions.
- Correlated the session IDs and IP addresses to identify the attacker.
```
Commands & Tools Used : Splunk.
```
## 18. Prompt injection ( Red Teaming )
- In AI-powered chatbot we check how it communicate with system using it's APIs and then performed prompt injection.
- Here through blind remote code execution (RCE) we achieved a reverse shell of target system.
```
Commands & Tools Used : tcpdump, netcat.
```
## 19. Game Hacking ( Red Teaming )
- Used Frida to intercept function calls. 
- Accessed the in-game OTP.
- Altered in-game values to purchasing items for free.
- Passed the biometric check by altering the returning value from library function.
```
Commands & Tools Used : Frida, Vscode.
```
## 20. Traffic analysis ( Blue Teaming )
- Analyzed a PCAP file using Wireshark.
- Found a C2 server communication between multiple threat actors and their activities.
- Decrypted the secret messages using CyberChef.
```
Commands & Tools Used : Wireshark, CyberChef.
```
## 21. Reverse engineering ( Blue Teaming )
- Reverse engineering a suspicious .NET binary, `WarevilleApp.exe`, using PEStudio for static analysis and ILSpy for decompiling to reveal its malicious functionality.
- Figured the behaviour of malware which involved downloading and executing files, creating a zip file of victim data, and interacting with a C2 server.
```
Commands & Tools Used : PEStudio, ILSpy.
```
## 22. Kubernetes DFIR ( Blue Teaming )
- Looked at some `Kubernetes` pod logs of compromised web application.
- Identified a suspisious file `shelly.php` access from an unexpected IP. The webshell was present even after reboot so it was part of the docker image itself.
- So we check the docker registry logs, we found same unexpected IP and other IP, and trace of PATCH the docker images in registry which have that `shelly.php` which is a web shell.
- In the Kubernetes roles we found an unexpected role with a permission to do this kind of thing, with this we figure the attack path or activities of the user.
```
Commands & Tools Used : minikube, kubectl, docker.
```
## 23. Hash cracking ( Red Teaming )
- With `hash-id.py` identified a hash type of a password hash.
- Cracked it with John the Ripper using the `rockyou.txt` wordlist.
- We got a pdf with password so converted the file to a hash format with `pdf2john.pl`.
- Created a custom wordlist with possible password and run John the  Ripper with `--rules=single` option, cracked the PDF password.
```
Commands & Tools Used : John The Ripepr, hash-id.py, pdf2john.pl.
```
## 24. Communication protocols ( Blue Teaming )
- Analyzed `MQTT (Message Queuing Telemetry Transport)` traffic using Wireshark, examined captured packets in  file `challenge.pcapng` to get the correct message which would turn on the lights.
- Used the `mosquitto_pub` to publish the correct message to the devices which turn the lights on.
```
Commands & Tools Used : Wireshark, mosquitto_pub.
```
---

### Advent Of Cyber'24 Certificate
##### (Don't mind it, it's just a decorative. Real value is above 👆🏻 👴🏻)
  
  ![Certificate](/posts/memoir-advent-of-cyber-2024/thmaoc24_certificate.png)
