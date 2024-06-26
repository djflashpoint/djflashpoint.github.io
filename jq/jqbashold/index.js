const term = $('body').terminal({
    start: async function () {
      async function load() {
        await open("defcon.html");
      }
      setTimeout(load, 5000);
      return $(`<img src="/img/SO.gif">`)
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
      await open("m.html");
       return $(`<iframe src="m.html" width="100%" height="800">`);
      //return open("m.html");
    },
    time: function () {
      const now = new Date();
      const currentDateTime = now.toLocaleString();
      //console.log(currentDateTime);
      //setInterval(currentDateTime, 1000);
      return (currentDateTime);
    },
    micro: function () {
      return $(`<iframe src="micro" width="100%" height="800">`);
      //await open("micro");
     },
    microext: async function () {
      //return $(`<iframe src="micro" width="100%" height="800">`);
       await open("micro");
    },
    stream: function () {
      return $(`<iframe src="stream.html" width="100%" height="800">`);
    },
    streamext: async function () {
      await open("stream.html");
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
      await open("m.html");
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
      await term.echo("figlet", { typing: true, delay: 50 });
      await term.echo("time", { typing: true, delay: 50 });
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
      return fetch("sitemap.xml").then(r => r.text());
      //await term.echo(fetch("/").then(r => r.text()), { typing: true, delay: 50 });

      //var xml = $.parseXML("sitemap.xml"),
      //$xml = $( xml ),
      //$pxml = $xml.find('pxml');
      //await term.echo($pxml.text(), { typing: true, delay: 50 });



    },

    figlet: async function () {
      await open('figlet');
    },
    exit: async function () {
      await close();
      await window.home();
    },
  }, 
    {
      checkArity: false,
      greetings: 'h4x0r$ - "ls" for list of commands\n'
      });