function $(elid) {
    return document.getElementById(elid);
}
var cursor;
window.onload = init;
function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}
function nl2br(txt) {
  return txt.replace(/\n/g, '');
}
function typeIt(from, e) {
  e = e || window.event;
  var w = $("typer");
  var tw = from.value;
  if (!pw){
    w.innerHTML = nl2br(tw);
  }
}
function moveIt(count, e) {
  e = e || window.event;
  var keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}
function alert(txt) {
  console.log(txt);
}
function terminaltext(){
  // function([string1, string2],target id,[color1,color2])    
  consoleText(['Hello!', 'This is Vishvesh C.'], 'text',['black','black']);
  function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  const con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {
      if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
      }, 1000)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
      }, 1000)
      } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
      }
  }, 120)
  window.setInterval(function() {
      if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;
      } else {
      con.className = 'console-underscore'
      visible = true;
      }
  }, 400)
  }
}
var youtube = "https://www.youtube.com/channel/UCSsyUSWfEHtg0TyWMR4EloA";
var twitter = "https://www.twitter.com/";
var password = "sussybaka";
var linkedin = "https://www.linkedin.com/in/";
var instagram = "https://www.instagram.com/fs.msi/";
var github = "https://github.com/VishveshC/";
var email = 'mailto:vishveshchaudhari13@gmail.com';
whois = [
  "<br>",
  "Hey, I'm Vishvesh!👋",
  "Currently working on this... ;-;",
  "<br>"
];
whoami = [
  "<br>",
  "The paradox of “Who am I?” is: we never know, but, we constantly find out.",
  "<br>"
];
social = [
  "<br>",
  'youtube        <a href="' + youtube + '" target="_blank">youtube/Vishvesh' + "</a>",
  'twitter        <a href="' + twitter + '" target="_blank">twitter/;-;' + '</a>',
  'linkedin       <a href="' + linkedin + '" target="_blank">linkedin/;-;' + "</a>",
  'instagram      <a href="' + instagram + '" target="_blank">instagram/fs.msi' + '</a>',
  'github         <a href="' + github + '" target="_blank">github/VishveshC' + "</a>",
  "<br>"
];
secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re admin',
  "<br>"
];
projects = [
  "<br>",
  "Still curating... most projects are offline, on GitHub, or confidential.",
  "<br>"
];
help = [
  "<br>",
  '<span class="command">whois</span>          Who is Vishvesh?',
  '<span class="command">whoami</span>         Who are you?',
  '<span class="command">video</span>          View YouTube videos',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">secret</span>         Find the password',
  '<span class="command">projects</span>       View coding projects',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           You obviously already know what this does',
  '<span class="command">email</span>          Do not email me',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">banner</span>         Display the header',
  "<br>",
];
banner = [
  '<span class="index">VishveshChaudhari (VC) Not A Corporation. All knights reserved.</span>',
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
];
var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");
var git = 0;
var pw = false;
let pwd = false;
var commands = [];
setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);
window.addEventListener("keyup", enterKey);
console.log(
  "%cYou hacked my password!😠",
  "color: #04ff00; font-weight: bold; font-size: 15px;"
);
console.log("%cPassword: '" + password + "' - I wonder what it does?🤔", "color: grey");
//init
textarea.value = "";
command.innerHTML = textarea.value;
function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("visitor@localhost:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}
function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;
    case "social":
      loopLines(social, "color2 margin", 80);
      break;
    case "secret":
      liner.classList.add("password");
      pw = true;
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "password":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:vishveshchaudhari13@gmail.com">vishveshchaudhari13@gmail.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "youtube":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "twitter":
      addLine("Opening Twitter...", "color2", 0);
      newTab(twitter);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}
function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}
function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}