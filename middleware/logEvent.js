const { format } = require("date-fns");
const fs = require("fs");
const express = require("express");

const path = require("path");
const { v4: uuid } = require("uuid");
const fspromise = require("fs").promises;

const logEvent = async (message, logName) => {
  const date = await format(new Date(), "yyyy MMM ddd\tHHH:mm:ss ");
  const ui = `${uuid()}`;
  const Allthe = `${ui}\t ${date}\t${message}\n`;
  fspromise.appendFile(path.join(__dirname, logName), Allthe);
};
//'/tmp'
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  logEvent(
    `${req.method}\t ${req.headers.origin}\t ${req.url}`,
    "newfile.txt"
  );
  next();
};

module.exports = { logger, logEvent };
