## Auto Referrer Detection
A very simple method to auto detect the referrer in your app, Here is how it works after it is hosted on your server.
- STEP 1 : A client visit the given referrerUrl `https://yourdomain.com/referrer/CTTRICKS123` 
- STEP 2 : Server detects the IP address of this client. ( Say 151.01.01.001 is the ip of this client )
- STEP 3 : It stores this vaue in a json file `given_directory/ip_todaysDate.json` using IP ( formatted | Replaced all `.` or `:` with `_`) as key and referrer code as value. Please note that, in this example `CTTRICKS123` is the referrerCode used as value.
- STEP 4 : Now this info is stored in the json file & Redirects user to pre defined redirect URL.

```JSON
{"ip_151_01_01_001" : "CTTRICKS123"}
```
