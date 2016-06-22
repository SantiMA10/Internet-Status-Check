# Internet-Status-Check

[![Release](http://github-release-version.herokuapp.com/github/SantiMA10/Internet-Status-Check/release.png)](https://github.com/SantiMA10/Internet-Status-Check/releases)
[![GitHub issues](https://img.shields.io/github/issues/SantiMA10/Internet-Status-Check.svg)](https://github.com/SantiMA10/Internet-Status-Check/issues)
[![GitHub forks](https://img.shields.io/github/forks/SantiMA10/Internet-Status-Check.svg)](https://github.com/SantiMA10/Internet-Status-Check/network)
[![GitHub stars](https://img.shields.io/github/stars/SantiMA10/Internet-Status-Check.svg)](https://github.com/SantiMA10/Internet-Status-Check/stargazers)

![web view](https://cloud.githubusercontent.com/assets/7255298/16101514/cb80c6a2-3366-11e6-8f43-574d7c9a6f76.png)

### Motivation

I made this for working in background in my Raspberry Pi to check the status of my internet connection automatically.

### How it works

When you start the app, it program a crontab for launch a Internet Speed Test and store the result on a [embeded db based on MongoDB](https://github.com/louischatriot/nedb).

Also starts a web server with ExpressJS who loads the data from the db and shows to you in a web page.

### How Install and use

**You need Node.js ([for Windows, Mac or Linux](https://nodejs.org/en/), for [Raspberry Pi](http://weworkweplay.com/play/raspberry-pi-nodejs/)) for running this.**

Download the [last release](https://github.com/SantiMA10/Internet-Status-Check/releases), unzip it, download all the dependencies with **npm install** and lunch it in foreground with **node app.js** or lunch it in background with **node app.js &**.

##### Start on startup on the Raspberry Pi

In your Raspberry Pi, edit the **rc.local** with **sudo nano /etc/rc.local** or your favourite editor:
```
# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

node /home/pi/Internet-Status-Check/app.js > /dev/null & //Add this line with the correct route to the app

exit 0
```

### Configuration

Edit the file **config.json**...

```
{
  "crontab" : "0 0 */3 * * *", // A crontab pattern, for example: this execute the test every 3 hours
  "port" : 8080               // Port for the web page
}
```

...or visit the **configuration page**:
![configuration](https://cloud.githubusercontent.com/assets/7255298/16264808/e1a89dc8-387b-11e6-8bae-677958ea4672.png)

[Crontab parttern examples](http://alvinalexander.com/linux/unix-linux-crontab-every-minute-hour-day-syntax)

### Issues and contributing

Please report any [issues](https://github.com/SantiMA10/Internet-Status-Check/issues). New features and ideas that you'd like to see implemented will be welcome, also feel free to send any pull requests

## Licencia/License

The MIT License (MIT)

Copyright (c) 2016 Santiago Martín - [http://SantiMA.xyz](http://santima.xyz) - [@SantiMA10](http://twitter.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
