#!/usr/bin/env node

const QRCode = require('qrcode');
const fs = require('fs-extra')
const { readFileSync, existsSync } = require('fs')
const path = require('path')



const csvFile = (process.argv[2]);
const csvFilePath = path.join(process.cwd(), csvFile);

if (!csvFile) {
    console.error('what\'s file name?')
    return
}

if (existsSync(csvFilePath) === false) {
    console.error(csvFile + ' file dose not exists')
    return
}

if (csvFile.split('.')[1] !== 'csv') {

    console.error(csvFile.split('.')[1] + ' file not supported')
    return
}


fs.mkdirpSync('./takhfif')
fs.mkdirpSync('./vcard')

readFileSync(csvFilePath)
    .toString()
    .split(/\r?\n|,/)
    .filter(Boolean)
    .forEach(i => {
        const code = i.replace(/\s+/g, '')

        if (isNaN(+code)) {
            console.log(code + ' is not a valid code and will be ignored')
            return
        }


        QRCode.toFile(`./takhfif/${code}2.jpg`, `https://nikan-alumni.com/coupons/${code}?ref=card`, {
            color: {
                dark: '#000',  // Blue dots
                light: '#FFF' // Transparent background
            }
        }, function (err) {
            if (err) throw err;
            console.log('takhfif for ' + code + ' generated!');
        });

        QRCode.toFile(`./vcard/${code}1.jpg`, `https://nikan-alumni.com/vcard/${code}?ref=card`, {
            color: {
                dark: '#000',  // Blue dots
                light: '#FFF' // Transparent background
            }
        }, function (err) {
            if (err) throw err;
            console.log('vcard for ' + code + ' generated!');
        });


    })


