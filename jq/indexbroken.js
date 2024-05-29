function jq() {
    Promise.all([fortune(), fonts()]).then(async ([fortune]) => {
    const term = $('body').terminal(async function(command) {
        const {name, args, rest} = $.terminal.parse_command(command);
        const options = $.terminal.parse_options(args);
    function delay(time) {
        return new Promise(r => setTimeout(r, time));
    },


    
        


// ---------------------------------------------------------------------------------


         start: async function () {
            async function ld() {
              await open("/../defcon.html");
            setTimeout(ld, 5000);
            return $(`<img src="/../img/SO.gif">`);
            }
          },
          about: function () {
            return fetch('https://terminal.jcubic.pl')
              .then(r => r.text())
              .then(html => html.match(/<title>([^>]+)<\/title>/)[1]);
          },
          rabbit: async function () {
            await term.echo("Wake up, Neo...", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("The Matrix has you...", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("Follow the white rabbit.", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("Knock, knock, Neo.", { typing: true, delay: 200 });
            term.remove_line(-1)
            await open("/../m.html");
            /* return $(`<iframe src="m.html" width="100%" height="800">`); */
            //return open("m.html");
          },
          timex: function () {
            const now = new Date();
            const currentDateTime = now.toLocaleString();
            //console.log(currentDateTime);
            //setInterval(currentDateTime, 1000);
            return (currentDateTime);
          },
          micro: function () {
            return $(`<iframe src="/../micro" width="100%" height="800">`);
            //await open("micro");
          },
          microext: async function () {
            //return $(`<iframe src="micro" width="100%" height="800">`);
            await open("/../micro");
          },
          stream: function () {
            return $(`<iframe src="/../stream.html" width="100%" height="800">`);
          },
          streamext: async function () {
            await open("/../stream.html");
          },
          neo: async function () {
            await term.echo("Wake up, Neo...", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("The Matrix has you...", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("Follow the white rabbit.", { typing: true, delay: 200 });
            term.remove_line(-1)
            await term.echo("Knock, knock, Neo.", { typing: true, delay: 200 });
            term.remove_line(-1)
            await open("/../m.html");
          },
          foo: async function () {
            await term.echo("Damn, foo...", { typing: true, delay: 200 });
            term.remove_line(-1);
            await term.echo("*cholo whistle*", { typing: true, delay: 100 });
            term.remove_line(-1);
            await term.echo("Thats a sick ride, eh.", { typing: true, delay: 200 });
            term.remove_line(-1);
            await term.echo("Youre invited to the carne asada, carnal.", { typing: true, delay: 200 });
            term.remove_line(-1);
            await term.echo("Sana sana colita de rana", { typing: true, delay: 200 });
            term.remove_line(-1);
            await term.echo("*cholo whistle*", { typing: true, delay: 100 });
          },
          ls: async function () {
            await term.echo("List of Commands:", { typing: true, delay: 50 });
            await term.echo("start", { typing: true, delay: 50 });
            await term.echo("about", { typing: true, delay: 50 });
            await term.echo("rabbit", { typing: true, delay: 50 });
            await term.echo("figletext", { typing: true, delay: 50 });
            await term.echo("timex", { typing: true, delay: 50 });
            await term.echo("micro", { typing: true, delay: 50 });
            await term.echo("microext", { typing: true, delay: 50 });
            await term.echo("stream", { typing: true, delay: 50 });
            await term.echo("streamext", { typing: true, delay: 50 });
            await term.echo("neo", { typing: true, delay: 50 });
            await term.echo("foo", { typing: true, delay: 50 });
            await term.echo("ls", { typing: true, delay: 50 });
            await term.echo("clock", { typing: true, delay: 50 });
            await term.echo("dir", { typing: true, delay: 50 });
            await term.echo("exit", { typing: true, delay: 50 });
          },
          clock: async function () {
            setInterval(async function () {
              await term.update(1, new Date);
            }, 1000);
          },
          dir: async function () {
            return fetch("/../sitemap.xml").then(r => r.text());
            //await term.echo(fetch("/").then(r => r.text()), { typing: true, delay: 50 });
    
            /*var xml = $.parseXML("sitemap.xml"),
            $xml = $( xml ),
            $pxml = $xml.find('pxml');
            await term.echo($pxml.text(), { typing: true, delay: 50 });*/
    
    
    
          },
    
          figletext: async function () {
            await open('/../figlet');
          },
          exit: async function () {
            await close();
            await window.home();
        },
    },


    {
        checkArity: false,
        greetings: 'h4x0r$ - "ls" for list of commands\n'
    },  
        

        if (['think', 'say'].includes(name)) {
            var cow = cowsay[name]({
                text: await this.read(),
                eyes: 'oO'
            }).replace(/\\$/m, '\\ ');
            if (options.format || options.f) {
                return '[[b;white;]' + cow + ']';
            }
            return cow;
        } else if (name === 'fractal') {
            return mandelbrot();
        } else if (name === '__exec') {
            const [id] = args;
            if (!pending[id]) {
                this.error('__exec: Wrong ID');
            }
            pending[id](await this.read(''));
        } else if (name === 'time') {
            return time(new Date());
        } else if (name === 'timer') {
            let args = [];
            if (options.figlet) {
                args.push(renderFiglet);
            }
            if (options.lolcat) {
                args.push(rainbow);
            }
            return new Timer(args);
            term.echo(timer, {onClear: () => timer.stop()});
        } else if (name === 'figlet') {
            let input;
            if (options._.length) {
                input = options._.join(' ');
            } else {
                input = await this.read('');
            }
            this.echo(renderFiglet(input, options.f, options.w));
        } else if (name === 'lolcat') {
            let input = await this.read('');
            this.echo(rainbow(input, options.bug));
        } else if (name === 'echo') {
            this.echo(args.join(' '));
        } else if (name === 'credits') {
            this.echo([
                '',
                '<a href="https://github.com/patorjk/figlet.js">Figlet</a> by @patorjk',
                '<a href="https://github.com/piuccio/cowsay">Cowsay</a> by Fabio Crisci',
                '<a href="https://www.npmjs.com/package/isomorphic-lolcat">Isomorphic-lolcat</a> based on Robert Boloc <a href="https://github.com/robertmarsal/lolcatjs">lolcatjs</a>',
                '<a href="https://github.com/reggi/fortune-cookie">Fortune</a> by Thomas Reggi',
                '<a href="http://warp.povusers.org/MandScripts/javascript.html">Fractal</a> by @warp',
                ''
            ].join('\n'));
        } else if (name === 'fortune') {
            fortune = shuffle(fortune);
            this.echo(fortune[0]);
        } else if (name === 'help') {
            this.echo([
                '',
                'You can use Pipe to render fortune in cowsay `fortune | say` or `fortune | say | lolcat`',
                'Or use figlet with lolcat `echo jQuery Terminal | figlet -f Colossal | lolcat`',
                'Figlet can also be executed without echo `figlet -f Colossal jQuery Terminal | lolcat`',
                "`say` and `think` have option -f or --format that that display in white color",
                '`timer` create clock it have two options --figlet and --lolcat',
                ''
            ].join('\n'));
        } else {
            this.error('invalid command `' + command + '`');
        }
    },
        completion: ['echo', 'say', 'think', 'lolcat', 'fortune', 'fractal', 'figlet', 'credits', 'time', 'timer', 'help'],
        pipe: true,
        greetings: false,
        renderHandler(obj, options) {
            if (obj instanceof Timer) {
                obj.start(this);
                return false;
            }
            if ($.isPlainObject(obj)) {
                return JSON.stringify(obj);
            }
            
        },
        onInit: function() {
            this.echo(async function() {
                return rainbow(await renderFiglet('jQTerm Pipe Demo'));
            });
            const white = 'rgba(255,255,255,0.99)';
            term.echo([
                '',
                `Available commands, [[;${white};]credits], [[;${white};]fortune], [[;${white};]figlet], [[;${white};]time], [[;${white};]timer],`,
                `[[;${white};]lolcat], [[;${white};]echo], [[;${white};]fractal], [[;${white};]think] and [[;${white};]say]. Type [[;${white};]help] for more info.`,
                ''
            ].join('\n'));
        },
    


    

    //await term.exec('figlet jQTerm Pipe Demo | lolcat', true);
    /* this don't work in < ver 1.18
    term.echo(async function() {
        return await rainbow(await renderFiglet('jQTerm Pipe Demo'));
    });
    */
    
    var styles = [];
    false && console.log(lolcat.rainbow(function(char, color) {
        styles.push(`color: ${hex(color)}; background: black`);
        return  `%c${char}`;
    }, renderFiglet('jQuery Terminal', 'Colossal')).join('\n'), ...styles);


// ---------------------------------------------------------------------------------
// Fisher-Yates (aka Knuth) Shuffle
// ref: https://stackoverflow.com/a/2450976/387194
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
},

// -----------------------------------------------------------------------------
function fonts() {
    return new Promise(resolve => {
        figlet.defaults({fontPath: 'https://unpkg.com/figlet@1.4.0/fonts/'});
        var fonts = ['Standard', 'Slant', 'Small', 'Colossal', "Roman", "Univers"];
        figlet.preloadFonts(fonts, resolve);
    });
},

// -----------------------------------------------------------------------------
function fortune() {
    var url = 'https://unpkg.com/fortune-cookie/fortune-cookie.json';
    return fetch(url).then(res => res.json());
},

// -----------------------------------------------------------------------------
function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
        
    }
)

}
)

}
// -----------------------------------------------------------------------------
var pending = {};
var index = 0;
// function that return text that was echo when executing a command
// the argument command can be multiple commands speparated by pipe
function exec(command) {
    var id = ++index;
    return new Promise(resolve => {
        pending[id] = function(...args) {
            resolve(...args);
            delete pending[id];
        };
        term.exec(`${command} | __exec "${id}"`, true);
    });
}

// -----------------------------------------------------------------------------
class Timer {
    constructor(fns = []) {
        this._fns = fns;
    }
    stop() {
        clearInterval(this._timer);
    }
    start(term) {
        term.echo(this.render(), {
            onClear: () => {
                this.stop();
            }
        });
        this._index = term.last_index();
        this._timer = setInterval(() => {
            term.update(this._index, this.render());
        }, 500);
    }
    render() {
        return this._fns.reduce((acc, fn) => fn(acc), time(new Date()));
    }
}

// -----------------------------------------------------------------------------
/*  function time(date) {
    return date.toLocaleTimeString();
    return [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].join(':');
}  */

/* function time() {
    setInterval(function () {
        document.getElementById('time').innerText = document.title = new Date();
    }, 1000);
} */

 function time() {
    setInterval(async function () {
        return term.update(1, new Date());
    }, 1000);
  }
 

// -----------------------------------------------------------------------------
function renderFiglet(text, font, width) {
    try {
        return figlet.textSync(text, {
            font: font || 'Standard',
            width: width || (!term ? 80 : term.cols()),
            whitespaceBreak: true
        });
    } catch (e) {
        return 'Error: ' + e.message;
    }
}
// -----------------------------------------------------------------------------
function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

// -----------------------------------------------------------------------------
function rainbow(string, bug) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        if (!bug) {
            char = char.replace(/\\/g, '&#92;');
        }
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}

// ref: http://warp.povusers.org/MandScripts/javascript.html
async function mandelbrot() {
    var chars = " .,:;=|iI+hHOE## ";
    var result = [];
    for(var Im = -1.2; Im <= 1.2; Im += .05) {
        var line = [];
        for(var Re = -2; Re <= 1; Re += .03) {
            var Zr = Re;
            var Zi = Im;
            for(var n = 0; n < 16; n++) {
                var Zr2 = Zr * Zr;
                var Zi2 = Zi * Zi;
                if (Zr2 + Zi2 > 4) {
                    break;
                }
                Zi = 2 * Zr * Zi + Im;
                Zr = Zr2 - Zi2 + Re;
            }
            line.push(chars.charAt(n));
        }
        result.push(line.join(''));
    }
    await result.join('\n');
}
