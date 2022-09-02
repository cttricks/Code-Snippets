<div align="center">
<img src="https://raw.githubusercontent.com/cttricks/Code-Snippets/main/AutoReferrerDetection/banner-1.jpg">

<h1>Auto Referrer Detection</h1>
<p>✨ A very simple method to auto detect the referrer in your app. ✨</p>

![Build Status](https://badgen.net/apm/license/linter)
![Node version](https://badgen.net/packagist/php/monolog/monolog)
[![Twitter](https://img.shields.io/twitter/url.svg?url=https%3A%2F%2Ftwitter.com%2Fct_tricks&style=social&label=Follow%20%40ct_tricks)](https://twitter.com/ct_tricks)

</div>

<p align="center">
  <a href="http://cttricks.com/"><b>Website</b></a> • <a href="https://community.niotron.com/"><b>Community</b></a> • <a href="https://twitter.com/ct_tricks"><b>Twitter</b></a>
</p>
<hr>

### How it works?
Here is step by step flow on how it works once it is hosted on your server.
- STEP 1 : A client visit the given referrerUrl `https://yourdomain.com/referrer/CTTRICKS123` 
- STEP 2 : Server detects the IP address of this client. ( Say 151.01.01.001 is the ip of this client )
- STEP 3 : It stores this vaue in a json file `given_directory/ip_todaysDate.json` using IP ( formatted | Replaced all `.` or `:` with `_`) as key and referrer code as value. Please note that, in this example `CTTRICKS123` is the referrerCode used as value.
- STEP 4 : Now this info is stored in the json file & Redirects user to pre defined redirect URL.
```JSON
{"ip_151_01_01_001" : "CTTRICKS123"}
```
- STEP 5 : To get the referrer code simply call the same referrerUrl without referrer code `https://yourdomain.com/referrer/` from your app.  

### Production Setup
Simply download the `index.php` file or copythe code and create choose any exisiting directory or create a new one with name `referrer` ( you are free to keep any name/title you want ) and upload or create a new index.php file and paste the codes. 

Please note that, in case you don't want to use `.htaccess` or unable to use it. You can modify your url by adding `index.php?code=`. So the complete url will be `https://yourdomain.com/referrer/index.php?code=CTTRICKS123`

### :pushpin: Important Links
- [Download Demo AIA](https://cttricks.com/export/autoRef.aia) for appinventor and distributions.
- Tutorial Video On YouTube
