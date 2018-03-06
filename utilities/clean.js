const fs = require('fs');
const path = require('path');

let clean = function (dir) {
    let work = [dir];
    while (work.length > 0) {
        let item = work.pop();
        if (fs.existsSync(item) && fs.statSync(item).isDirectory()) {
            let files = fs.readdirSync(item);
            files.forEach(f => {
                if (f.startsWith('.')) {
                    return;
                }
                let fullPath = path.join(item, f);
                work.push(fullPath);
            });
        } else if (item.endsWith('.ts')) {
            // remove all generated files if they exist
            let name = path.basename(item, '.ts');
            let directory = path.dirname(item);

            let js = path.join(directory, name + '.js');
            let dts = path.join(directory, name + '.d.ts');
            let map = path.join(directory, name + '.js.map');

            if (fs.existsSync(js)){
                fs.unlinkSync(js)
            }

            if (fs.existsSync(dts)){
                fs.unlinkSync(dts)
            }

            if (fs.existsSync(map)){
                fs.unlinkSync(map)
            }
        }
    }
}

module.exports = clean;