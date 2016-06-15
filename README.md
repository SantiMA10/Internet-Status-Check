# Internet-Status-Checker

### How it works

When you start the app, it program a crontab for launch a Internet Speed Test and store the result on a [embeded db based on MongoDB](https://github.com/louischatriot/nedb).

Also starts a web server with ExpressJS who loads the data from the db and shows to you in a web page.

### How Install and use

**You need [Node.js](https://nodejs.org/en/) for running this.**

Download the [last release](https://github.com/SantiMA10/Internet-Status-Check/releases), unzip it, download all the dependencies with **npm install** and lunch it with **node app.js**.

### Configuration

Edit the file **config.json**

```
{
  "crontab" : "* * */6 * * *", // A crontab pattern 
  "port" : 8080               // Port for the web page
}
```
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
