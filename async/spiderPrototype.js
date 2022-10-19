import fs from "fs";
import superagent from "superagent";

export function spider(url, cb) {
  const filename = urlToFilename(url);

  fs.access(filename, (err) => {
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);

      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          mkdrip(path.dirname(filename), (err) => {
            if (err) {
              cb(err);
            } else {
              fs.writeFile(filename, res.text, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
